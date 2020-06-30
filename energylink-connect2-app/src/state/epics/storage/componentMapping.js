import { ofType } from 'redux-observable'
import { from, of, timer } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  exhaustMap
} from 'rxjs/operators'
import { path, pathOr, cond, equals, always } from 'ramda'
import { getApiPVS, storageSwaggerTag } from 'shared/api'

import {
  POST_COMPONENT_MAPPING,
  POST_COMPONENT_MAPPING_SUCCESS,
  POST_COMPONENT_MAPPING_ERROR,
  GET_COMPONENT_MAPPING_COMPLETED,
  GET_COMPONENT_MAPPING_ERROR,
  GET_COMPONENT_MAPPING_PROGRESS
} from 'state/actions/storage'

export const postComponentMappingEpic = action$ => {
  return action$.pipe(
    ofType(POST_COMPONENT_MAPPING.getType()),
    mergeMap(() => {
      const promise = getApiPVS()
        .then(path(['apis', storageSwaggerTag]))
        .then(api => api.startComponentMapping())

      return from(promise).pipe(
        map(response =>
          response.status === 200
            ? POST_COMPONENT_MAPPING_SUCCESS()
            : POST_COMPONENT_MAPPING_ERROR('COMPONENT_MAPPING_ERROR')
        ),
        catchError(error => of(POST_COMPONENT_MAPPING_ERROR(error)))
      )
    })
  )
}

export const getComponentMappingEpic = action$ => {
  const stopPolling$ = action$.pipe(
    ofType(
      GET_COMPONENT_MAPPING_COMPLETED.getType(),
      GET_COMPONENT_MAPPING_ERROR.getType()
    )
  )
  return action$.pipe(
    ofType(POST_COMPONENT_MAPPING_SUCCESS.getType()),
    switchMap(() =>
      timer(0, 5000).pipe(
        takeUntil(stopPolling$),
        exhaustMap(() => {
          const promise = getApiPVS()
            .then(path(['apis', storageSwaggerTag]))
            .then(api => api.getComponentMapping())

          return from(promise).pipe(
            map(response => {
              const status = pathOr(
                'FAILED',
                ['body', 'component_mapping_status'],
                response
              )
              const statusMatcher = cond([
                [
                  equals('FAILED'),
                  always(GET_COMPONENT_MAPPING_ERROR('COMPONENT_MAPPING_ERROR'))
                ],
                [equals('NOT_RUNNING'), always(POST_COMPONENT_MAPPING())],
                [
                  equals('RUNNING'),
                  always(GET_COMPONENT_MAPPING_PROGRESS(response.body))
                ],
                [
                  equals('COMPLETED'),
                  always(GET_COMPONENT_MAPPING_COMPLETED(response.body))
                ]
              ])

              return statusMatcher(status)
            }),
            catchError(error => of(GET_COMPONENT_MAPPING_ERROR(error)))
          )
        })
      )
    )
  )
}