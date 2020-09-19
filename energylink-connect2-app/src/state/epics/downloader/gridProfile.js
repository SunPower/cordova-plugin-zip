import { forkJoin, from, of } from 'rxjs'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import * as Sentry from '@sentry/browser'

import {
  GRID_PROFILE_DOWNLOAD_ERROR,
  GRID_PROFILE_DOWNLOAD_INIT,
  GRID_PROFILE_DOWNLOAD_PROGRESS,
  GRID_PROFILE_DOWNLOAD_SUCCESS,
  GRID_PROFILE_REPORT_SUCCESS
} from 'state/actions/gridProfileDownloader'
import {
  ERROR_CODES,
  getFileInfo,
  getGridProfileFileName
} from 'shared/fileSystem'
import fileTransferObservable from 'state/epics/observables/downloader'
import { getExpectedMD5, hasInternetConnection } from 'shared/utils'
import { modalNoInternet } from 'state/epics/downloader/firmware'
import { getMd5FromFile } from 'shared/cordovaMapping'
import { EMPTY_ACTION } from 'state/actions/share'

export const epicInitDownloadGridProfile = action$ =>
  action$.pipe(
    ofType(GRID_PROFILE_DOWNLOAD_INIT.getType()),
    exhaustMap(({ payload = false }) =>
      fileTransferObservable(
        `firmware/${getGridProfileFileName()}`,
        process.env.REACT_APP_GRID_PROFILE_URL,
        payload
      ).pipe(
        map(({ entry, progress }) =>
          progress
            ? GRID_PROFILE_DOWNLOAD_PROGRESS(progress)
            : GRID_PROFILE_REPORT_SUCCESS(`firmware/${entry.name}`)
        ),
        catchError(err => {
          Sentry.addBreadcrumb({ message: 'Downloading grid profile' })
          Sentry.captureException(err)
          return of(GRID_PROFILE_DOWNLOAD_ERROR({ error: err, retry: true }))
        })
      )
    )
  )

export const epicGridProfileReportSuccess = action$ =>
  action$.pipe(
    ofType(GRID_PROFILE_REPORT_SUCCESS.getType()),
    exhaustMap(({ payload }) =>
      forkJoin([
        from(getFileInfo(payload)),
        from(getMd5FromFile(payload)),
        from(getExpectedMD5(process.env.REACT_APP_GRID_PROFILE_URL))
      ]).pipe(
        map(([{ size, lastModified }, fileMd5, expectedMd5]) =>
          fileMd5 === expectedMd5
            ? GRID_PROFILE_DOWNLOAD_SUCCESS({ size, lastModified })
            : GRID_PROFILE_DOWNLOAD_ERROR({
                error: ERROR_CODES.MD5_NOT_MATCHING,
                retry: false
              })
        ),
        catchError(err => {
          Sentry.addBreadcrumb({ message: 'epic grid profile report success' })
          Sentry.captureException(err)
          return of(GRID_PROFILE_DOWNLOAD_ERROR({ error: err, retry: true }))
        })
      )
    )
  )

export const epicGridProfileManageErrors = action$ =>
  action$.pipe(
    ofType(GRID_PROFILE_DOWNLOAD_ERROR.getType()),
    exhaustMap(({ payload: { retry, error } }) =>
      from(hasInternetConnection()).pipe(
        map(() => (retry ? GRID_PROFILE_DOWNLOAD_INIT(true) : EMPTY_ACTION())),
        catchError(() => of(modalNoInternet()))
      )
    )
  )

export default [
  epicInitDownloadGridProfile,
  epicGridProfileReportSuccess,
  epicGridProfileManageErrors
]
