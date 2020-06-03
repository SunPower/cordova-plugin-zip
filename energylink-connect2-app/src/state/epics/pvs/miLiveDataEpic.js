import {
  compose,
  map as mapRamda,
  path,
  pathOr,
  multiply,
  filter,
  propEq
} from 'ramda'
import { ofType } from 'redux-observable'
import { from, of, timer } from 'rxjs'
import { catchError, exhaustMap, takeUntil, map } from 'rxjs/operators'
import { getApiPVS } from 'shared/api'

import {
  MI_DATA_STOP_POLLING,
  MI_DATA_START_POLLING,
  MI_DATA_SUCCESS,
  MI_DATA_ERROR
} from 'state/actions/pvs'

const transformDevice = device => ({
  sn: device.SERIAL,
  power: multiply(1000, device.p_3phsum_kw || 0)
})

const getData = compose(
  mapRamda(transformDevice),
  filter(propEq('DEVICE_TYPE', 'Inverter')),
  pathOr([], ['body', 'devices'])
)

export const miLiveDataEpic = action$ => {
  const stopPolling$ = action$.pipe(ofType(MI_DATA_STOP_POLLING))

  return action$.pipe(
    ofType(MI_DATA_START_POLLING.getType()),
    exhaustMap(() =>
      timer(0, 15000).pipe(
        takeUntil(stopPolling$),
        exhaustMap(() => {
          const promise = getApiPVS()
            .then(path(['apis', 'devices']))
            .then(api => api.getDevices())

          return from(promise).pipe(
            map(getData),
            map(MI_DATA_SUCCESS),
            catchError(error => of(MI_DATA_ERROR(error)))
          )
        })
      )
    )
  )
}