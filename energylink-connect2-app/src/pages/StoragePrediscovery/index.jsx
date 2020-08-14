import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pathOr, propOr, isEmpty, length } from 'ramda'
import moment from 'moment'
import { useI18n } from 'shared/i18n'
import { either, warningsLength } from 'shared/utils'
import { Loader } from 'components/Loader'
import {
  GET_PREDISCOVERY,
  GET_PREDISCOVERY_RESET,
  GET_DELAYED_PREDISCOVERY
} from 'state/actions/storage'
import ContinueFooter from 'components/ESSContinueFooter'
import ErrorDetected from 'components/ESSErrorDetected'
import StorageDevices from 'components/PrediscoveryDevices/StorageDevices'
import paths from 'routes/paths'
import './StoragePrediscovery.scss'

function StoragePrediscovery() {
  const t = useI18n()
  const dispatch = useDispatch()

  const { prediscovery, loadingPrediscovery } = useSelector(
    state => state.storage
  )
  const { error } = useSelector(state => state.storage)
  const storageDeviceList = pathOr(
    [],
    ['pre_discovery_report', 'devices'],
    prediscovery
  )
  const prediscoveryErrors = propOr([], 'errors', prediscovery)
  const lastTimestamp = propOr(
    moment().toISOString(),
    'last_updated',
    prediscovery
  )

  useEffect(() => {
    dispatch(GET_PREDISCOVERY())
  }, [dispatch])

  const retryPrediscovery = () => {
    dispatch(GET_PREDISCOVERY_RESET())
    dispatch(GET_DELAYED_PREDISCOVERY(lastTimestamp))
  }

  return (
    <div className="storage-prediscovery">
      <div className="prediscovery-title has-text-centered mt-10 mb-20">
        <span className="is-uppercase has-text-weight-bold">
          {t('STORAGE_DEVICES')}
        </span>
      </div>
      {either(
        loadingPrediscovery,
        <div className="prediscovery-waiting has-text-centered">
          <Loader />
          <span>{t('PREDISCOVERY_WAIT')}</span>
        </div>,
        <>
          {either(
            isEmpty(error),
            <div className="prediscovery-content has-text-centered is-flex mt-20 mb-20 pl-15 pr-15">
              {either(
                isEmpty(storageDeviceList),
                <>
                  <span className="is-size-1 sp-hey has-text-white mb-15" />
                  <span>{t('NO_PREDISCOVERY')}</span>
                </>,
                <StorageDevices devices={storageDeviceList} />
              )}
            </div>
          )}

          <div className="prediscovery-footer">
            {either(
              !isEmpty(error),

              <div className="prediscovery-retry has-text-centered is-flex mt-15 mb-15 pl-15 pr-15">
                <span className="mb-15">{t('PREDISCOVERY_ERROR')}</span>
                <button
                  className="button is-primary"
                  onClick={retryPrediscovery}
                >
                  {t('RETRY')}
                </button>
              </div>,

              either(
                isEmpty(prediscoveryErrors),
                <ContinueFooter
                  url={paths.PROTECTED.EQS_UPDATE.path}
                  text={'PREDISCOVERY_SUCCESS'}
                />,
                <ErrorDetected
                  number={
                    length(prediscoveryErrors) -
                    warningsLength(prediscoveryErrors)
                  }
                  warnings={warningsLength(prediscoveryErrors)}
                  onRetry={retryPrediscovery}
                  url={paths.PROTECTED.EQS_PREDISCOVERY_ERRORS.path}
                  next={paths.PROTECTED.EQS_UPDATE.path}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default StoragePrediscovery
