import React from 'react'
import { useI18n } from 'shared/i18n'
import { useHistory } from 'react-router-dom'
import { Loader } from 'components/Loader'
import paths from 'routes/paths'
import './SavingConfiguration.scss'
import { useSelector } from 'react-redux'

const SavingConfiguration = () => {
  const t = useI18n()
  const history = useHistory()
  const { submitting, submitted, err } = useSelector(
    state => state.systemConfiguration.submit
  )

  const goToChangeAddress = () => {
    history.push(paths.PROTECTED.ROOT.path)
  }

  const goToConfig = () => {
    history.push(paths.PROTECTED.SYSTEM_CONFIGURATION.path)
  }

  const configContent =
    submitted && !err
      ? {
          title: t('CONFIG_DONE'),
          indicator: (
            <div className="pt-20 pb-20">
              <i className="sp-check has-text-white is-size-1" />
            </div>
          ),
          controls: (
            <div className="status-message">
              <span className="has-text-white has-text-weight-bold">
                {t('SAVED_CONFIGURATION')}
              </span>
              <span className="has-text-weight-bold">{t('ONE_LAST_STEP')}</span>
              <span>{t('UPDATE_LAYOUT_ELA')}</span>
              <button
                onClick={goToChangeAddress}
                className="button is-secondary"
              >
                {t('CONFIG_NEW_SITE')}
              </button>
              <button onClick={goToConfig} className="button is-primary">
                {t('DONE')}
              </button>
            </div>
          )
        }
      : {
          title: t('CONFIG_ERROR'),
          indicator: (
            <div className="pt-20 pb-20">
              <i className="sp-close has-text-white is-size-1" />
            </div>
          ),
          controls: (
            <div className="status-message">
              <span>{t('CONFIG_ERROR_2')}</span>
              <button onClick={goToConfig} className="button is-primary">
                {t('RETRY')}
              </button>
            </div>
          )
        }

  return (
    <div className="saving-configuration has-text-centered pt-20 pr-20 pl-20">
      <span className="is-uppercase has-text-weight-bold">
        {submitting ? t('HOLD_ON') : configContent.title}
      </span>
      {submitting ? <Loader /> : configContent.indicator}

      {submitting ? (
        <div className="status-message">
          <span> {t('SAVING_CONFIGURATION')} </span>
          <span className="has-text-weight-bold">{t('DONT_CLOSE_APP')}</span>
        </div>
      ) : (
        configContent.controls
      )}
    </div>
  )
}

export default SavingConfiguration