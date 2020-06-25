import React from 'react'
import { useI18n } from 'shared/i18n'
import { head, tail, map } from 'ramda'
import './DeviceMap.scss'

const deviceItem = device => (
  <div className="mt-5 mb-5 is-flex child-device" key={device.serial_number}>
    <span className="has-text-white has-text-weight-bold">
      {device.device_type}
    </span>
    <span className="has-text-weight-bold">{device.serial_number}</span>
  </div>
)

function DeviceMap({
  deviceList = [
    {
      device_type: 'NO_DEVICEMAP',
      serial_number: 'DEVICEMAP_ERROR'
    }
  ]
}) {
  const t = useI18n()
  const headDevice = head(deviceList)
  const restOfDevices = tail(deviceList)

  return (
    <div className="device-map mb-10 mt-10">
      <div className="head-device is-flex">
        <span className="has-text-white has-text-weight-bold is-size-5">
          {t(headDevice.device_type)}
        </span>
        <span className="has-text-weight-bold is-size-5">
          {t(headDevice.serial_number)}
        </span>
      </div>
      <div className="rest-of-devices">{map(deviceItem, restOfDevices)}</div>
    </div>
  )
}

export default DeviceMap
