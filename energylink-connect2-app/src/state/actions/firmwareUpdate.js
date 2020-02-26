import { createAction } from 'redux-act'

export const FIRMWARE_UPDATE_INIT = createAction('INIT FIRMWARE UPDATE')
export const FIRMWARE_UPDATE_START_CMD = createAction('FIRMWARE UPDATE START COMMAND')
export const FIRMWARE_UPDATE_POLL_INIT = createAction('FIRMWARE UPDATE START POLLING')
export const FIRMWARE_UPDATE_POLLING = createAction('FIRMWARE UPDATE START POLLING')
export const FIRMWARE_UPDATE_POLL_STOP = createAction('FIRMWARE UPDATE STOP POLLING STATUS')
export const FIRMWARE_UPDATE_WAITING_FOR_NETWORK = createAction('FIRMWARE UPDATE WAITING NETWORK')
export const FIRMWARE_UPDATE_NETWORK_UP = createAction('FIRMWARE UPDATE NETWORK UP')
export const FIRMWARE_UPDATE_COMPLETE = createAction('COMPLETE FIRMWARE UPDATE')
export const FIRMWARE_UPDATE_ERROR = createAction('FIRMWARE UPDATE ERROR')
export const FIRMWARE_GET_VERSION_ERROR = createAction(
  'FIRMWARE_GET_VERSION_ERROR'
)
export const FIRMWARE_GET_VERSION_COMPLETE = createAction(
  'PVS  FW VERSION COMPLETE'
)
