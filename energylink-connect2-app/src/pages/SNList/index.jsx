import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from 'shared/i18n'
import { REMOVE_SN } from 'state/actions/pvs'
import { PUSH_CANDIDATES_INIT } from 'state/actions/devices'
import { START_DISCOVERY_INIT } from 'state/actions/pvs'
import { UPDATE_MI_COUNT } from 'state/actions/inventory'
import { Loader } from 'components/Loader'
import paths from 'routes/paths'
import { pathOr } from 'ramda'
import useModal from 'hooks/useModal'
import BlockUI from 'react-block-ui'
import './SNList.scss'
import 'react-block-ui/style.css'
import SNManualEntry from './SNManualEntry'
import SNScanButtons from './SNScanButtons'

function SNList({ animationState }) {
  const t = useI18n()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { isManualModeDefault = false } = pathOr({}, ['state'], location)

  const [isManualMode, setManualMode] = useState(isManualModeDefault)
  const { serialNumbers, fetchingSN } = useSelector(state => state.pvs)
  const { bom } = useSelector(state => state.inventory)

  const toggleManualMode = useCallback(() => setManualMode(!isManualMode), [
    isManualMode
  ])

  const modulesOnInventory = bom.filter(item => {
    return item.item === 'MODULES'
  })
  const expectedMICount = modulesOnInventory[0].value
  const scannedMICount = serialNumbers.length

  const onScanMore = () => {
    history.push(paths.PROTECTED.SCAN_LABELS.path)
  }

  const handleRemoveSN = serialNumber => {
    dispatch(REMOVE_SN(serialNumber))
  }

  const createSnItem = serialNumber => {
    return (
      <div key={serialNumber} className="sn-item mt-10 mb-10 pb-5">
        <span className="is-uppercase has-text-weight-bold has-text-white">
          {serialNumber}
        </span>
        <button
          onClick={() => handleRemoveSN(serialNumber)}
          className="has-text-white is-size-6"
        >
          <i className="sp-trash" />
        </button>
      </div>
    )
  }

  const submitSN = () => {
    const snList = serialNumbers.map(device => {
      return { DEVICE_TYPE: 'Inverter', SERIAL: device.serial_number }
    })
    toggleSerialNumbersModal()
    dispatch(UPDATE_MI_COUNT(serialNumbers.length))
    dispatch(PUSH_CANDIDATES_INIT(snList))
    history.push(paths.PROTECTED.DEVICES.path)
  }

  const serialNumbersModalTemplate = text => {
    return (
      <div className="sn-modal">
        <span className="has-text-white mb-10">{text}</span>
        <div className="sn-buttons">
          <button
            className="button half-button-padding is-secondary trigger-scan mr-10"
            onClick={() => toggleSerialNumbersModal()}
          >
            {t('CANCEL')}
          </button>
          <button
            className="button half-button-padding is-primary trigger-scan"
            onClick={submitSN}
          >
            {t('CONTINUE')}
          </button>
        </div>
      </div>
    )
  }

  const COUNT_TYPE =
    scannedMICount > expectedMICount ? 'MI_OVERCOUNT' : 'MI_UNDERCOUNT'

  const serialNumbersModalContent = serialNumbersModalTemplate(
    t(COUNT_TYPE, scannedMICount, expectedMICount)
  )

  const modalsTitle = (
    <span className="has-text-white has-text-weight-bold">
      {t('ATTENTION')}
    </span>
  )

  const startLegacyDiscovery = () => {
    dispatch(START_DISCOVERY_INIT({ Device: 'allplusmime' }))
    history.push(paths.PROTECTED.LEGACY_DISCOVERY.path)
  }

  const legacyDiscoveryModalContent = (
    <div className="sn-modal">
      <span className="has-text-white mb-10">
        {t('LEGACY_DISCOVERY_WARNING')}
      </span>
      <div className="sn-buttons">
        <button
          className="button half-button-padding is-secondary trigger-scan mr-10"
          onClick={() => toggleLegacyDiscoveryModal()}
        >
          {t('CANCEL')}
        </button>
        <button
          className="button half-button-padding is-primary trigger-scan"
          onClick={startLegacyDiscovery}
        >
          {t('CONTINUE')}
        </button>
      </div>
    </div>
  )

  const {
    modal: serialNumbersModal,
    toggleModal: toggleSerialNumbersModal
  } = useModal(animationState, serialNumbersModalContent, modalsTitle, false)

  const {
    modal: legacyDiscoveryModal,
    toggleModal: toggleLegacyDiscoveryModal
  } = useModal(animationState, legacyDiscoveryModalContent, modalsTitle, false)

  const countSN = () => {
    if (parseInt(scannedMICount, 10) === parseInt(expectedMICount, 10)) {
      submitSN()
      history.push(paths.PROTECTED.DEVICES.path)
    } else {
      toggleSerialNumbersModal()
    }
  }

  const serialNumbersList = serialNumbers
    ? serialNumbers
        .sort(function(a, b) {
          return a.serial_number > b.serial_number
        })
        .map(device => createSnItem(device.serial_number))
    : []

  return (
    <BlockUI
      tag="div"
      className="snlist-blockui"
      blocking={false}
      message={t('OPENING_CAMERA')}
    >
      {serialNumbersModal}
      {legacyDiscoveryModal}
      <div className="snlist is-vertical has-text-centered pl-10 pr-10">
        <div className="top-text">
          <span className="is-uppercase has-text-weight-bold">
            {t('SCAN_MI_LABELS')}
          </span>
          <span className="has-text-white">
            {serialNumbers.length > 0
              ? t('FOUND_SN', serialNumbers.length)
              : ''}
          </span>
        </div>
        <div className="sn-container">
          {serialNumbersList.length > 0 ? (
            serialNumbersList
          ) : (
            <span>{t('SCAN_HINT')}</span>
          )}
          {fetchingSN ? <Loader /> : ''}
        </div>

        <div className="sn-buttons">
          {isManualMode ? (
            <>
              <SNManualEntry toggleOpen={toggleManualMode} />
              <button
                onClick={toggleManualMode}
                className="button has-text-centered is-uppercase is-secondary has-no-border mr-40 pl-0 pr-0"
              >
                {t('BACK_TO_SCAN')}
              </button>
              <button
                onClick={toggleLegacyDiscoveryModal}
                className="button has-text-centered is-uppercase is-secondary has-no-border pl-0 pr-0"
              >
                {t('LEGACY_DISCOVERY')}
              </button>
            </>
          ) : (
            <>
              <SNScanButtons
                fetchingSN={fetchingSN}
                onScanMore={onScanMore}
                countSN={countSN}
              />
              <button
                onClick={toggleManualMode}
                className="button has-text-centered is-uppercase is-secondary has-no-border"
              >
                {t('SN_MANUAL_ENTRY')}
              </button>
            </>
          )}
        </div>
      </div>
    </BlockUI>
  )
}

export default SNList
