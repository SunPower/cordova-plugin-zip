import clsx from 'clsx'
import { omit, length, not, map, compose } from 'ramda'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import paths, { setParams } from 'routes/paths'
import { getError } from 'shared/errorCodes'
import { useI18n } from 'shared/i18n'
import {
  either,
  strSatisfiesAWarning,
  warningsLength,
  withoutInfoCodes
} from 'shared/utils'
import { PVS_CONNECTION_CLOSE } from 'state/actions/network'
import { eqsSteps } from 'state/reducers/storage'
import './ErrorListGeneric.scss'

const ErrorComponent = ({ title, code = '', errorInfo, t }) => {
  const toParams = {
    pathname: setParams([code, errorInfo], paths.PROTECTED.ERROR_DETAIL.path),
    state: { ...errorInfo }
  }

  return (
    <div className="error-component mb-10">
      <div className="error-text">
        <span className="error-title has-text-white has-text-weight-bold">
          {title}
        </span>
        <span className="error-code"> {t('ERROR_CODE', code)}</span>
        {either(
          not(strSatisfiesAWarning(code)),
          <span className="has-text-primary has-text-weight-bold">
            {t('FIX_ERROR_TO_PROCEED')}
          </span>
        )}
      </div>
      <div>
        <Link className="has-text-primary details is-flex" to={toParams}>
          <span className="sp sp-chevron-right auto is-size-2" />
        </Link>
      </div>
    </div>
  )
}

const getErrorInfo = omit([
  'error_message',
  'error_code',
  'error_description',
  'event_code'
])

const renderError = t => error => (
  <ErrorComponent
    title={error.error_description || error.error_message}
    code={error.event_code || error.error_code}
    key={error.event_code || error.error_code}
    errorInfo={getErrorInfo(error)}
    t={t}
  />
)

const storageRoutesMap = {
  [eqsSteps.PREDISCOVERY]: paths.PROTECTED.STORAGE_PREDISCOVERY.path,
  [eqsSteps.FW_UPLOAD]: paths.PROTECTED.EQS_UPDATE.path,
  [eqsSteps.FW_ERROR]: paths.PROTECTED.EQS_UPDATE.path,
  [eqsSteps.FW_COMPLETED]: paths.PROTECTED.EQS_UPDATE.path,
  [eqsSteps.FW_POLL]: paths.PROTECTED.EQS_UPDATE.path,
  [eqsSteps.FW_UPDATE]: paths.PROTECTED.EQS_UPDATE.path,
  [eqsSteps.COMPONENT_MAPPING]: paths.PROTECTED.ESS_DEVICE_MAPPING.path,
  [eqsSteps.HEALTH_CHECK]: paths.PROTECTED.ESS_HEALTH_CHECK.path
}
/**
 *
 * @param errors array of errors {error_description,code,event_code}
 * @returns React.Component
 * @constructor
 */
const ErrorListScreen = ({ errors = [] }) => {
  const t = useI18n()
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentStep } = useSelector(state => state.storage)

  const noInfo = withoutInfoCodes(errors)
  const warningsCount = warningsLength(noInfo)
  const errorsDetected = length(noInfo) - warningsCount

  const onlyWarnings = errorsDetected === 0

  const cancelCommissioning = () => {
    dispatch(PVS_CONNECTION_CLOSE())
    history.push(paths.PROTECTED.ROOT.path)
  }

  return (
    <div
      className={clsx('error-list', 'pr-10', 'pl-10', {
        'warning-list': onlyWarnings
      })}
    >
      <div className="error-list-header has-text-centered">
        <span
          className="has-text-primary sp-chevron-left is-size-4"
          onClick={() => history.push(storageRoutesMap[currentStep])}
        />
        <span className="has-text-weight-bold">{t('ERROR_LIST')}</span>
        <span />
      </div>
      <div className="error-list-container">
        {map(compose(renderError(t), getError), errors)}
      </div>
      {either(
        !onlyWarnings,
        <div>
          <div className="has-text-centered error-list-hint">
            <span>{t('PLEASE_FIX_ERRORS')}</span>
            <span>{t('GO_BACK_AND_FIX')}</span>
          </div>
          <div className="has-text-centered mt-10">
            <span
              onClick={cancelCommissioning}
              role="button"
              className="has-text-primary has-text-weight-bold"
            >
              {t('CANCEL_COMMISSION')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ErrorListScreen
