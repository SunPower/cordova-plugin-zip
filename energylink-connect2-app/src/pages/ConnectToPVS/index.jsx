import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { length, compose, not } from 'ramda'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'
import { useI18n } from 'shared/i18n'
import { decodeQRData, scanBarcodes } from 'shared/scanning'
import { isAndroid10 } from 'shared/utils'
import {
  PVS_CONNECTION_INIT,
  STOP_NETWORK_POLLING
} from 'state/actions/network'
import { saveSerialNumber } from 'state/actions/pvs'
import { Loader } from 'components/Loader'
import paths from 'routes/paths'
import './ConnectToPVS.scss'

const onSuccess = (generatePassword, dispatch, t) => data => {
  try {
    let wifiData

    try {
      wifiData = decodeQRData(data)
    } catch (err) {
      wifiData = ''
    }

    if (wifiData.length > 0) {
      const qrData = wifiData.split('|')
      const [serialNumber, ssid] = qrData
      const password = generatePassword(serialNumber)
      dispatch(saveSerialNumber(serialNumber))
      dispatch(PVS_CONNECTION_INIT({ ssid, password }))
    } else {
      alert(t('INVALID_QRCODE'))
    }
  } catch (error) {
    console.warn(error)
  }
}

function ConnectToPVS() {
  const t = useI18n()
  const dispatch = useDispatch()
  const history = useHistory()
  const connectionState = useSelector(state => state.network)
  const [manualEntry, showManualEntry] = useState(false)
  const [manualInstructions, showManualInstructions] = useState(false)
  const [serialNumber, setSerialNumber] = useState('')

  const onFail = err => {
    alert(err)
  }

  useEffect(() => {
    if (!connectionState.connecting && connectionState.connected) {
      history.push(paths.PROTECTED.PVS_CONNECTION_SUCCESS.path)
    }
  }, [connectionState.connected, connectionState.connecting, dispatch, history])

  const checkAndroidVersion = () => {
    if (isAndroid10()) {
      showManualInstructions(true)
    }
  }

  const manualConnect = () => {
    showManualEntry(false)
    const ssid = generateSSID(serialNumber)
    const password = generatePassword(serialNumber)
    dispatch(saveSerialNumber(serialNumber))
    dispatch(PVS_CONNECTION_INIT({ ssid, password }))
    checkAndroidVersion()
  }

  const generateSSID = serialNumber => {
    const lastIndex = serialNumber.length
    const ssidPt1 = serialNumber.substring(4, 6)
    const ssidPt2 = serialNumber.substring(lastIndex - 3, lastIndex)

    return `SunPower${ssidPt1}${ssidPt2}`
  }

  const generatePassword = serialNumber => {
    let lastIndex = serialNumber.length
    let password =
      serialNumber.substring(2, 6) +
      serialNumber.substring(lastIndex - 4, lastIndex)
    return password
  }

  const copyPasswordToClipboard = () => {
    window.cordova.plugins.clipboard.copy(connectionState.password)
    window.cordova.plugins.diagnostic.switchToWifiSettings()
  }

  const abortConnection = () => {
    dispatch(STOP_NETWORK_POLLING())
    showManualInstructions(false)
  }

  return (
    <div className="qr-layout has-text-centered">
      <span className="is-uppercase has-text-weight-bold mt-30">
        {t('LOOK_FOR_QR')}
      </span>
      {connectionState.connecting ? (
        <Loader />
      ) : (
        <div className="qr-icon mt-20 mb-20">
          <i className="sp-qr has-text-white" />
        </div>
      )}
      <div className="mt-20 mb-20 pr-20 pl-20">
        <span className="is-size-6 has-text-centered">
          {connectionState.connecting ? t('CONNECTING_PVS') : t('QRCODE_HINT')}
        </span>
        <div className="mt-20">
          <button
            disabled={connectionState.connecting}
            className="button is-primary"
            onClick={() =>
              scanBarcodes(onSuccess(generatePassword, dispatch, t), onFail)
            }
          >
            {t('START_SCAN')}
          </button>
        </div>
      </div>

      <div className="mt-30">
        <span>{t('MANUAL_ENTRY_HINT')}</span>
        <div>
          <button
            disabled={connectionState.connecting}
            className="mt-20 button is-primary is-outlined"
            onClick={() => showManualEntry(true)}
          >
            {t('MANUAL_ENTRY')}
          </button>
        </div>
      </div>

      <SwipeableBottomSheet
        shadowTip={false}
        open={manualInstructions}
        onChange={compose(showManualInstructions, not)}
      >
        <div className="manual-instructions is-flex">
          <span className="has-text-weight-bold has-text-white mb-10">
            {t('MANUAL_CONNECT_INSTRUCTIONS_1')}
          </span>
          <span className="mb-10">{t('MANUAL_CONNECT_INSTRUCTIONS_2')}</span>
          <div className="mb-15 is-flex network-details">
            <span className="has-text-white">
              <b>{t('SSID')}</b>
              {connectionState.SSID}
            </span>
            <span className="has-text-white">
              <b>{t('PASSWORD')}</b>
              {connectionState.password}
            </span>
          </div>
          <div className="mt-10 mb-20">
            <button
              className="button is-primary is-fullwidth mb-20"
              onClick={copyPasswordToClipboard}
            >
              {t('COPY_PWD_TO_CLIPBOARD')}
            </button>
            <button
              className="button is-primary is-outlined is-fullwidth"
              onClick={abortConnection}
            >
              {t('ABORT_CONNECTION')}
            </button>
          </div>
        </div>
      </SwipeableBottomSheet>

      <SwipeableBottomSheet
        shadowTip={false}
        open={manualEntry}
        onChange={() => showManualEntry(!manualEntry)}
      >
        <div className="manual-entry">
          <span className="has-text-weight-bold">{t('PVS_SN')}</span>
          <div className="mt-20 mb-20">
            <input
              type="text"
              placeholder="ZT00000000000000000"
              onChange={event => setSerialNumber(event.target.value)}
            />
          </div>
          <span className="mt-10 mb-10">{t('SERIAL_NUMBER_HINT')}</span>
          <div className="mt-10 mb-20">
            <button
              disabled={length(serialNumber) !== 19}
              className="button is-primary"
              onClick={manualConnect}
            >
              {t('CONNECT')}
            </button>
          </div>
        </div>
      </SwipeableBottomSheet>
    </div>
  )
}

export default ConnectToPVS
