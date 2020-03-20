/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { compose, map } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from 'shared/i18n'
import { scanM } from 'shared/scandit'
import ErrorBoundary from 'components/Error'
import { ADD_PVS_SN } from 'state/actions/pvs'
import { buildSN } from 'shared/utils'
import paths from 'routes/paths'

import './ScanLabels.scss'

function ScanDeviceLabels() {
  const t = useI18n()
  const dispatch = useDispatch()
  const history = useHistory()
  const { serialNumbers } = useSelector(state => state.pvs)

  const [isScanning, setIsScanning] = useState(true)
  const onDone = useRef(null)

  const addSN = compose(dispatch, ADD_PVS_SN, buildSN)
  const addCodes = map(addSN)

  const finishedScanning = () => {
    if (typeof onDone.current === 'function') {
      onDone.current()
      setIsScanning(false)
      history.push(paths.PROTECTED.SN_LIST.path)
      console.warn(serialNumbers, 'ON FINISH')
    }
  }

  const startScanning = () => {
    if (window.Scandit) onDone.current = scanM(addCodes)
  }

  useEffect(() => {
    startScanning()

    return () => {
      if (isScanning && onDone.current) {
        onDone.current()
      }
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className="scan-labels is-vertical has-text-centered pl-10 pr-10">
        <span className="is-uppercase has-text-weight-bold mb-10">
          {t('SCAN_EQUIPMENT')}
        </span>

        <div id="scandit" />

        <div className="hint-text mt-15 pl-15 pr-15">{t('BULK_SCAN_HINT')}</div>

        <div className="has-text-white mt-10">
          {t('FOUND_SN', serialNumbers.length)}
        </div>

        <button
          className="button is-primary trigger-scan mt-15"
          onClick={isScanning ? finishedScanning : startScanning}
        >
          {isScanning ? t('DONE') : t('BULK_SCAN')}
        </button>
      </div>
    </ErrorBoundary>
  )
}

export default ScanDeviceLabels
