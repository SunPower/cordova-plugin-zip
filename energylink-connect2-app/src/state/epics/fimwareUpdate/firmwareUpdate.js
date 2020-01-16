import { ofType } from 'redux-observable'
import { concat, from, of } from 'rxjs'
import { catchError, endWith, flatMap, map } from 'rxjs/operators'
import { getApiPVS } from 'shared/api'
import {
  getFirmwareVersionNumber,
  getPFile
} from 'state/actions/fileDownloader'
import {
  FIRMWARE_UPDATE_COMPLETE,
  FIRMWARE_UPDATE_ERROR,
  FIRMWARE_UPDATE_INIT
} from 'state/actions/firmwareUpdate'
import {
  PVS_CONNECTION_INIT,
  STOP_NETWORK_POLLING
} from 'state/actions/network'

const postData = async () => {
  const { version } = await getFirmwareVersionNumber()
  const file = await getPFile(`${version}-fs.tgz`)
  const swagger = await getApiPVS()
  await swagger.apis.firmware.startUpgrade(file)
  return swagger
}

const firmwareUpdate = (action$, state$) =>
  action$.pipe(
    ofType(FIRMWARE_UPDATE_INIT.getType()),
    flatMap(() =>
      concat(
        of(STOP_NETWORK_POLLING()),
        from(postData()).pipe(
          map(response => FIRMWARE_UPDATE_COMPLETE(response)),
          endWith(
            PVS_CONNECTION_INIT({
              ssid: state$.value.network.SSID,
              password: state$.value.network.password
            })
          ),
          catchError(error => of(FIRMWARE_UPDATE_ERROR.asError(error.message)))
        )
      )
    )
  )

export default firmwareUpdate