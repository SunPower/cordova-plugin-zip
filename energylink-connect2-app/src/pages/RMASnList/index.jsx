import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { pathOr, length } from 'ramda'
import BlockUI from 'react-block-ui'
import 'react-block-ui/style.css'
import useModal from 'hooks/useModal'
import { useI18n } from 'shared/i18n'
import { PUSH_CANDIDATES_INIT } from 'state/actions/devices'
import { UPDATE_MI_COUNT } from 'state/actions/inventory'
import { REMOVE_SN, START_DISCOVERY_INIT } from 'state/actions/pvs'
import SNManualEntry from 'pages/SNList/SNManualEntry'
import SNScanButtons from 'pages/SNList/SNScanButtons'
import { Loader } from 'components/Loader'
import Collapsible from 'components/Collapsible'
import paths from 'routes/paths'
import './RMASnList.scss'

function RMASnList() {
  const t = useI18n()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { isManualModeDefault = false } = pathOr({}, ['state'], location)

  const [isManualMode, setManualMode] = useState(isManualModeDefault)
  const { serialNumbers: serialNumbersNew, fetchingSN } = useSelector(
    state => state.pvs
  )
  const { found: serialNumbersExisting } = useSelector(state => state.devices)
  const [editingSn, setEditingSn] = useState('')
  const { bom } = useSelector(state => state.inventory)
  const total = length(serialNumbersExisting) + length(serialNumbersNew)

  const toggleManualMode = useCallback(() => {
    setManualMode(!isManualMode)
    setEditingSn('')
  }, [isManualMode])

  const modulesOnInventory = bom.filter(item => {
    return item.item === 'AC_MODULES'
  })
  const expectedMICount = modulesOnInventory[0].value
  const scannedMICount = length(serialNumbersNew)

  const onScanMore = () => {
    history.push(paths.PROTECTED.SCAN_LABELS.path)
  }

  const handleEditSN = serialNumber => {
    setEditingSn(serialNumber)
    setManualMode(true)
  }

  const handleRemoveSN = serialNumber => {
    dispatch(REMOVE_SN(serialNumber))
  }

  const afterEditCallback = () => {
    setEditingSn('')
    setManualMode(false)
    dispatch(REMOVE_SN(editingSn))
  }

  const createSnItem = (serialNumber, withDelete = true, withEdit = true) => {
    return (
      <div key={serialNumber} className="sn-item mt-10 mb-10 pb-5">
        <span
          className="is-uppercase has-text-weight-bold has-text-white"
          onClick={() => (withEdit ? handleEditSN(serialNumber) : null)}
        >
          {serialNumber}
        </span>
        {withDelete && (
          <button
            onClick={() => handleRemoveSN(serialNumber)}
            className="has-text-white is-size-6"
          >
            <i className="sp-close" />
          </button>
        )}
      </div>
    )
  }

  const submitSN = () => {
    const snList = serialNumbersNew.map(device => {
      return { DEVICE_TYPE: 'Inverter', SERIAL: device.serial_number }
    })
    toggleSerialNumbersModal()
    dispatch(UPDATE_MI_COUNT(serialNumbersNew.length))
    dispatch(PUSH_CANDIDATES_INIT(snList))
    history.push(paths.PROTECTED.DEVICES.path)
  }

  const serialNumbersModalTemplate = text => {
    return (
      <div className="sn-modal">
        <span className="has-text-white mb-10">{text}</span>
        <div className="sn-buttons">
          <button
            className="button half-button-padding is-secondary is-uppercase trigger-scan mr-10"
            onClick={() => toggleSerialNumbersModal()}
          >
            {t('CANCEL')}
          </button>
          <button
            className="button half-button-padding is-primary is-uppercase trigger-scan"
            onClick={submitSN}
          >
            {t('CONTINUE')}
          </button>
        </div>
      </div>
    )
  }

  const getCountType = (scannedMICount, expectedMICount) => {
    const numExpected = parseInt(expectedMICount)
    const numScanned = parseInt(scannedMICount)

    if (parseInt(numScanned) === 0 && numExpected === 0) return 'MI_NO_COUNT'
    if (numScanned > numExpected) return 'MI_OVERCOUNT'
    return 'MI_UNDERCOUNT'
  }

  const serialNumbersModalContent = serialNumbersModalTemplate(
    t(
      getCountType(scannedMICount, expectedMICount),
      scannedMICount,
      expectedMICount
    )
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
          className="button half-button-padding is-secondary is-uppercase trigger-scan mr-10"
          onClick={() => toggleLegacyDiscoveryModal()}
        >
          {t('CANCEL')}
        </button>
        <button
          className="button half-button-padding is-primary is-uppercase trigger-scan"
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
  } = useModal(serialNumbersModalContent, modalsTitle, false)

  const {
    modal: legacyDiscoveryModal,
    toggleModal: toggleLegacyDiscoveryModal
  } = useModal(legacyDiscoveryModalContent, modalsTitle, false)

  const countSN = () => {
    const parsedScannedMICount = parseInt(scannedMICount)
    const parsedExpectedMiCount = parseInt(expectedMICount)
    if (
      parsedScannedMICount !== parsedExpectedMiCount ||
      (parsedScannedMICount === 0 && parsedExpectedMiCount === 0)
    ) {
      toggleSerialNumbersModal()
    } else {
      submitSN()
      history.push(paths.PROTECTED.DEVICES.path)
    }
  }

  const serialNumbersNewList = serialNumbersNew
    ? serialNumbersNew
        .sort(function(a, b) {
          return a.serial_number > b.serial_number
        })
        .map(device => createSnItem(device.serial_number))
    : []

  const serialNumbersExistingList = serialNumbersExisting
    ? serialNumbersExisting
        .sort(function(a, b) {
          return a.SERIAL > b.SERIAL
        })
        .map(device => createSnItem(device.SERIAL, false, false))
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
            {total > 0 ? t('FOUND_SN', total) : ''}
          </span>
        </div>
        <div className="flex-inverter-list">
          <Collapsible
            title={t('NEW_INVERTERS')}
            actions={
              <span className="is-secondary has-no-border">
                {length(serialNumbersNewList)}
              </span>
            }
          >
            <div className="sn-container">
              {length(serialNumbersNewList) > 0 ? (
                <>
                  <span className="has-text-weight-bold">
                    {t('TAP_SN_TO_EDIT')}
                  </span>
                  {serialNumbersNewList}
                </>
              ) : (
                <span>{t('SCAN_HINT')}</span>
              )}
              {fetchingSN ? <Loader /> : ''}
            </div>
          </Collapsible>
          <div className="mt-20" />
          <Collapsible
            title={t('EXISTING_INVERTERS')}
            actions={
              <span className="is-secondary has-no-border">
                {length(serialNumbersExistingList)}
              </span>
            }
          >
            <div className="sn-container">
              {length(serialNumbersExistingList) > 0 ? (
                <>{serialNumbersExistingList}</>
              ) : (
                <span>{t('SCAN_HINT')}</span>
              )}
              {fetchingSN ? <Loader /> : ''}
            </div>
          </Collapsible>
        </div>

        <div className="sn-buttons">
          {isManualMode ? (
            <>
              <SNManualEntry
                serialNumber={editingSn}
                callback={afterEditCallback}
              />
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
                className="button has-text-centered is-uppercase is-secondary has-no-border is-paddingless"
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

export default RMASnList