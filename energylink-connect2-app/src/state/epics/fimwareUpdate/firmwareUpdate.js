import { path, pick } from 'ramda'
import { ofType } from 'redux-observable'
import { concat, from, of, timer, zip } from 'rxjs'
import {
  catchError,
  flatMap,
  map,
  take,
  takeUntil,
  switchMap
} from 'rxjs/operators'
import { getApiPVS } from 'shared/api'
import { waitFor } from 'shared/utils'
import {
  getFileBlob,
  getFirmwareVersionNumber
} from 'state/actions/fileDownloader'
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
  PVS_CONNECTION_INIT,
  PVS_CONNECTION_SUCCESS,
  STOP_NETWORK_POLLING
} from 'state/actions/network'

/**
 * Will upload the FS to the PVS and
 * execute the startUpgrade command
 * by using the redirect call from the PVS
 * @returns {Promise<Response>}
 */
const uploadFirmwarePVS = async () => {
  try {
    const { luaFileName } = await getFirmwareVersionNumber()
    const fileBlob = await getFileBlob(`${luaFileName}.fs`)
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
const getUpgradeStatus = async () => {
  const swagger = await getApiPVS()
  const res = await swagger.apis.firmware.getUpgradeStatus()
  return res.body
}

const firmwareUpgradeInit = action$ =>
  action$.pipe(
    ofType(FIRMWARE_UPDATE_INIT.getType()),
    flatMap(() =>
      from(uploadFirmwarePVS()).pipe(
        switchMap(async () => FIRMWARE_UPDATE_POLL_INIT()),
        catchError(err => of(FIRMWARE_UPDATE_ERROR.asError(err)))
      )
    )
  )

export const firmwarePollStatus = action$ => {
  const stopPolling$ = action$.pipe(ofType(FIRMWARE_UPDATE_POLL_STOP.getType()))
  return action$.pipe(
    ofType(FIRMWARE_UPDATE_POLL_INIT.getType()),
    switchMap(() =>
      timer(0, 1500).pipe(
        takeUntil(stopPolling$),
        switchMap(() => from(getUpgradeStatus())),
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
        from(waitFor(1000 * 60)).pipe(
          map(() =>
            PVS_CONNECTION_INIT({
              ssid: state$.value.network.SSID,
              password: state$.value.network.password
            })
          )
        )
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
          return FIRMWARE_UPDATE_COMPLETE()
        })
      )
    )
  )
//{
//   const waitForNetwork$ = action$.pipe(
//     ofType(FIRMWARE_UPDATE_WAITING_FOR_NETWORK.getType())
//   )
//   const waitForConnection$ = action$.pipe(
//     PVS_CONNECTION_SUCCESS.getType(),
//     take(1)
//   )
//   const combined$ = zip(waitForConnection$, waitForNetwork$)
//   return combined$.pipe()
// }

// switchMap(
//   action$.pipe(
//     ofType(PVS_CONNECTION_SUCCESS.getType()),
//     take(1),
//     map(() => FIRMWARE_UPDATE_COMPLETE())
//   )
// )
// action
// oftype(FIRMWARE_UPDATE_WAITING_FOR_NETWORK)
// ofType(CONNECTION SUCCESS)
//of(PVS_UPGRADE_COMPLETE)

export default [
  firmwareUpgradeInit,
  firmwarePollStatus,
  firmwareWaitForWifi,
  firmwareUpdateSuccessEpic
]
