import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, map, catchError } from 'rxjs/operators'
import * as Sentry from 'sentry-cordova'

import { acquireWakeLock } from './utilities'

import { SET_SITE } from 'state/actions/site'
import {
  WAKELOCK_ACQUIRED,
  WAKELOCK_ACQUIRE_ERROR
} from 'state/actions/wakelock'

export const acquire = action$ =>
  action$.pipe(
    ofType(SET_SITE.getType()),
    exhaustMap(() =>
      from(acquireWakeLock()).pipe(
        map(WAKELOCK_ACQUIRED),
        catchError(() => {
          Sentry.captureException(new Error('Failed to acquire wakelock'))
          return of(WAKELOCK_ACQUIRE_ERROR())
        })
      )
    )
  )
