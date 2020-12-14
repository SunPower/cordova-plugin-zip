import * as Sentry from '@sentry/browser'
import { ofType } from 'redux-observable'
import { catchError, map, exhaustMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import {
  CHECK_PERMISSIONS_INIT,
  CHECK_PERMISSIONS_SUCCESS,
  CHECK_PERMISSIONS_ERROR
} from 'state/actions/network'
import { trace } from 'shared/utils'

const checkBLEPermissions = () =>
  new Promise((res, rej) =>
    window.cordova.plugins.diagnostic.getBluetoothState(res, rej)
  )

export const checkBLEPermissionsEpic = action$ => {
  return action$.pipe(
    ofType(CHECK_PERMISSIONS_INIT.getType()),
    exhaustMap(() =>
      from(checkBLEPermissions()).pipe(
        map(trace('CHECPERM')),
        map(bleState =>
          bleState !==
            window.cordova.plugins.diagnostic.bluetoothState.POWERED_ON &&
          bleState !==
            window.cordova.plugins.diagnostic.bluetoothState.POWERED_OFF
            ? CHECK_PERMISSIONS_ERROR(bleState)
            : CHECK_PERMISSIONS_SUCCESS(bleState)
        ),
        catchError(err => {
          Sentry.addBreadcrumb({ message: 'CHECK_BLE_PERMISSIONS' })
          Sentry.captureException(err)
          return of(CHECK_PERMISSIONS_ERROR())
        })
      )
    )
  )
}