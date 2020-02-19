import { ofType } from 'redux-observable'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { path } from 'ramda'
import { from, of } from 'rxjs'
import { getApiPVS } from 'shared/api'
import {
  PUSH_CANDIDATES_INIT,
  PUSH_CANDIDATES_SUCCESS,
  PUSH_CANDIDATES_ERROR
} from 'state/actions/devices'

const pushCandidatesEpic = action$ => {
  return action$.pipe(
    ofType(PUSH_CANDIDATES_INIT.getType()),
    mergeMap(({ payload }) => {
      const promise = getApiPVS()
        .then(path(['apis', 'devices']))
        .then(api => api.candidates(payload))

      return from(promise).pipe(
        map(response =>
          response.status === 200
            ? PUSH_CANDIDATES_SUCCESS(response)
            : PUSH_CANDIDATES_ERROR('ERROR_EXECUTING_COMMAND')
        ),
        catchError(err => of(PUSH_CANDIDATES_ERROR(err)))
      )
    })
  )
}

export default pushCandidatesEpic