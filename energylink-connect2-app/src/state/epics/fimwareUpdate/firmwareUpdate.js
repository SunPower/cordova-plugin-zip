import { path, pick } from 'ramda'
import { ofType } from 'redux-observable'
import { concat, from, of, timer } from 'rxjs'
import {
  catchError,
  exhaustMap,
  flatMap,
  map,
  switchMap,
  take,
  takeUntil
} from 'rxjs/operators'
import { getApiPVS } from 'shared/api'
import { waitFor } from 'shared/utils'
import { getFileBlob, getPVSFileSystemName } from 'state/actions/fileDownloader'
import {
  FIRMWARE_UPDATE_COMPLETE,
  FIRMWARE_UPDATE_ERROR,
  FIRMWARE_UPDATE_INIT,
  FIRMWARE_UPDATE_POLL_INIT,
  FIRMWARE_UPDATE_POLL_STOP,
  FIRMWARE_UPDATE_POLLING,
  FIRMWARE_UPDATE_WAITING_FOR_NETWORK
} from 'state/actions/firmwareUpdate'
import {
  PVS_CONNECTION_ERROR,
  PVS_CONNECTION_INIT,
  PVS_CONNECTION_SUCCESS,
  STOP_NETWORK_POLLING
} from 'state/actions/network'
import { fetchAdamaPVS } from 'shared/utils'
import {
  getWebserverFirmwareUpgradePackageURL,
  startWebserver,
  stopWebserver
} from 'shared/webserver'

/**
 * Will upload the FS to the PVS and
 * execute the startUpgrade command
 * by using the redirect call from the PVS
 * @returns {Promise<Response>}
 */
const uploadFirmwareToBoomer = async () => {
  try {
    const fileBlob = await getFileBlob(await getPVSFileSystemName())
    const formData = new FormData()
    formData.append('firmware', fileBlob)
    //TODO use the SWAGGER client, for some reason it is not working at the moment (2020-27-02)
    return await fetch('http://sunpowerconsole.com/cgi-bin/upload_firmware', {
      method: 'POST',
      body: formData
    })
  } catch (e) {
    console.error(e)
  }
}

/**
 * Will ask the PVS if the upgrade has finished
 * @returns {Promise<boolean>}
 */
const getUpgradeStatus = async isAdama => {
  if (isAdama) return await fetchAdamaPVS('GetFWUpgradeStatus')

  const swagger = await getApiPVS()
  const res = await swagger.apis.firmware.getUpgradeStatus()
  return res.body
}

async function uploadFirmwareToAdama() {
  console.warn('UPLOADING TO ADAMA')
  await startWebserver()
  const fileUrl = await getWebserverFirmwareUpgradePackageURL()
  console.warn(
    `We're uploading to adama, this is the link we'll use ${fileUrl}`
  )
  return await fetchAdamaPVS(`StartFWUpgrade&url=${fileUrl}`)
}

function uploadFirmwareToPVS(isAdama) {
  return isAdama ? uploadFirmwareToAdama() : uploadFirmwareToBoomer()
}

/**
 * Epic that will upload the FS to the PVS
 * @param action$
 * @returns {*}
 */
const firmwareUpgradeInit = action$ =>
  action$.pipe(
    ofType(FIRMWARE_UPDATE_INIT.getType()),
    flatMap(({ payload: isAdama }) =>
      from(uploadFirmwareToPVS(isAdama)).pipe(
        switchMap(async () => FIRMWARE_UPDATE_POLL_INIT(isAdama)),
        catchError(err => of(FIRMWARE_UPDATE_ERROR.asError(err)))
      )
    )
  )

export const firmwarePollStatus = action$ => {
  const stopPolling$ = action$.pipe(ofType(FIRMWARE_UPDATE_POLL_STOP.getType()))
  return action$.pipe(
    ofType(FIRMWARE_UPDATE_POLL_INIT.getType()),
    switchMap(({ payload: isAdama }) =>
      timer(0, 1500).pipe(
        takeUntil(stopPolling$),
        exhaustMap(() => from(getUpgradeStatus(isAdama))),
        map(status => {
          return path(['STATE'], status) === 'complete'
            ? FIRMWARE_UPDATE_POLL_STOP()
            : FIRMWARE_UPDATE_POLLING(pick(['STATE', 'PERCENT'], status))
        }),
        catchError(() => of({ type: "NOTHING HAPPENED HERE :')" }))
      )
    )
  )
}

const firmwareWaitForWifi = (action$, state$) =>
  action$.pipe(
    ofType(FIRMWARE_UPDATE_POLL_STOP.getType()),
    flatMap(() =>
      concat(
        of(STOP_NETWORK_POLLING()),
        of(FIRMWARE_UPDATE_WAITING_FOR_NETWORK()),
        from(waitFor(1000 * 10)).pipe(
          map(() => {
            console.info('CONNECTING TO PVS')
            return PVS_CONNECTION_INIT({
              ssid: state$.value.network.SSID,
              password: state$.value.network.password
            })
          })
        )
      )
    )
  )

const pvsNotYetAvailable = action$ =>
  action$.pipe(
    ofType(FIRMWARE_UPDATE_WAITING_FOR_NETWORK()),
    exhaustMap(() =>
      action$.pipe(
        ofType(PVS_CONNECTION_ERROR.getType()),
        take(1),
        map(() => {
          console.info('Had an error reconnecting, trying again')
          return FIRMWARE_UPDATE_POLL_STOP()
        })
      )
    )
  )

const firmwareUpdateSuccessEpic = action$ =>
  action$.pipe(
    ofType(FIRMWARE_UPDATE_WAITING_FOR_NETWORK.getType()),
    switchMap(() =>
      action$.pipe(
        ofType(PVS_CONNECTION_SUCCESS.getType()),
        take(1),
        map(() => {
          stopWebserver()
          return FIRMWARE_UPDATE_COMPLETE()
        })
      )
    )
  )

export default [
  firmwareUpgradeInit,
  firmwarePollStatus,
  firmwareWaitForWifi,
  pvsNotYetAvailable,
  firmwareUpdateSuccessEpic
]
