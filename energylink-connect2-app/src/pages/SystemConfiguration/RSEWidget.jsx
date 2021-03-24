import React, { useEffect } from 'react'
import { curry, compose, equals, path, prop, isNil, propEq, find } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import {
  GET_RSE_INIT,
  SET_RSE_INIT,
  SET_SELECTED_POWER_PRODUCTION
} from 'state/actions/systemConfiguration'

import { useI18n } from 'shared/i18n'
import { either } from 'shared/utils'

import Collapsible from 'components/Collapsible'
import SelectField from 'components/SelectField'
import { Loader } from 'components/Loader'

const RSE = <span className="sp-power file level mr-15 is-size-4" />

const getPowerProductionDropDownValue = curry((RSES, pp) =>
  find(propEq('value', pp), RSES)
)

function RSEWidget() {
  const t = useI18n()
  const dispatch = useDispatch()

  const {
    isSetting,
    isPolling,
    error,
    data: { powerProduction, progress },
    selectedPowerProduction,
    updated
  } = useSelector(path(['systemConfiguration', 'rse']))

  const dropDownValues = [
    { label: t('ON'), value: 'On' },
    { label: t('OFF'), value: 'Off' }
  ]

  const applyPowerProductionValue = compose(dispatch, SET_RSE_INIT)
  const onApplyPowerProductionValue = compose(
    applyPowerProductionValue,
    prop('value')
  )

  const changePowerProductionValue = compose(
    dispatch,
    SET_SELECTED_POWER_PRODUCTION
  )

  const onChangePowerProductionValue = compose(
    changePowerProductionValue,
    prop('value')
  )

  const disableApplyBtn =
    equals(powerProduction, selectedPowerProduction) ||
    isNil(selectedPowerProduction)

  useEffect(() => {
    dispatch(GET_RSE_INIT())
  }, [dispatch])

  const isWorking = isSetting || isPolling

  return (
    <div className="pb-15">
      <Collapsible title={t('REMOTE_SYSTEM_ENERGIZE')} icon={RSE}>
        {selectedPowerProduction ? (
          <React.Fragment>
            <div className="field is-horizontal mb-15">
              <div className="field-label">
                <label htmlFor="siteName" className="label has-text-white">
                  {t('RSE')}
                </label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <SelectField
                      disabled={isWorking}
                      isSearchable={false}
                      options={dropDownValues}
                      value={getPowerProductionDropDownValue(
                        dropDownValues,
                        selectedPowerProduction
                      )}
                      onSelect={onChangePowerProductionValue}
                    />
                  </div>
                </div>
              </div>
            </div>

            {renderRSEDescription(
              getPowerProductionDropDownValue(
                dropDownValues,
                selectedPowerProduction
              ).value,
              t
            )}

            {either(
              error,
              <div className="block">
                <div className="message error">
                  {t(error)}
                  <button
                    className="button has-text-primary is-uppercase is-text pl-0"
                    onClick={() => dispatch(GET_RSE_INIT())}
                  >
                    {t('RETRY_CLICK')}
                  </button>
                </div>
              </div>
            )}

            <div className="is-flex mt-15">
              <button
                className={clsx('button is-primary is-uppercase auto', {
                  'sp-check': updated
                })}
                disabled={isSetting || disableApplyBtn}
                onClick={() =>
                  onApplyPowerProductionValue(
                    getPowerProductionDropDownValue(
                      dropDownValues,
                      selectedPowerProduction
                    )
                  )
                }
              >
                {either(
                  isWorking,
                  t(
                    'APPLYING',
                    progress && progress < 100 ? `${progress}%` : '0%'
                  ),
                  updated ? t('APPLIED') : t('APPLY')
                )}
              </button>
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </Collapsible>
    </div>
  )
}

const renderRSEDescription = (powerProduction, t) =>
  either(
    equals(powerProduction, 'Off'),
    <article>
      <p className="text-center">{t('RSE_OFF_SYSTEM')}</p>
      <ul>
        <li>{t('RSE_OFF_1')}</li>
        <li>{t('RSE_OFF_2')}</li>
      </ul>

      <p className="text-center mt-10">{t('RSE_OFF_MICROINVERTERS')}</p>
      <ul>
        <li>{t('RSE_OFF_3')}</li>
        <li>{t('RSE_OFF_4')}</li>
      </ul>
    </article>,
    <p className="text-center">{t('RSE_ON')}</p>
  )

export default RSEWidget
