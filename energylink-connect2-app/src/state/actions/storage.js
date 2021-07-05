import { createAction } from 'redux-act'

// Health Check
export const GET_ESS_STATUS_INIT = createAction('GET_ESS_STATUS_INIT')
export const GET_ESS_STATUS_SUCCESS = createAction('GET_ESS_STATUS_SUCCESS')
export const GET_ESS_STATUS_ERROR = createAction('GET_ESS_STATUS_ERROR')
export const GET_ESS_STATUS_UPDATE = createAction('GET_ESS_STATUS_UPDATE')
export const GET_ESS_STATUS_COMPLETE = createAction('GET_ESS_STATUS_COMPLETE')
export const CLEAR_HEALTH_CHECK = createAction('CLEAR_HEALTH_CHECK')

export const GET_ESS_STATUS = createAction('GET_ESS_STATUS')
export const SET_ESS_STATUS = createAction('SET_ESS_STATUS')
export const SET_ESS_STATUS_ERROR = createAction('SET_ESS_STATUS_ERROR')

export const RUN_EQS_SYSTEMCHECK = createAction('RUN_EQS_SYSTEMCHECK')
export const RUN_EQS_SYSTEMCHECK_SUCCESS = createAction(
  'RUN_EQS_SYSTEMCHECK_SUCCESS'
)

// Prediscovery
export const GET_PREDISCOVERY = createAction('GET_PREDISCOVERY')
export const GET_DELAYED_PREDISCOVERY = createAction('GET_DELAYED_PREDISCOVERY')
export const GET_PREDISCOVERY_SUCCESS = createAction('GET_PREDISCOVERY_SUCCESS')
export const GET_PREDISCOVERY_ERROR = createAction('GET_PREDISCOVERY_ERROR')
export const GET_PREDISCOVERY_RESET = createAction('GET_PREDISCOVERY_RESET')

// Device/Component Mapping
export const POST_COMPONENT_MAPPING = createAction('POST_COMPONENT_MAPPING')
export const POST_COMPONENT_MAPPING_SUCCESS = createAction(
  'POST_COMPONENT_MAPPING_SUCCESS'
)
export const POST_COMPONENT_MAPPING_ERROR = createAction(
  'POST_COMPONENT_MAPPING_ERROR'
)

export const GET_COMPONENT_MAPPING_PROGRESS = createAction(
  'GET_COMPONENT_MAPPING_PROGRESS'
)
export const GET_COMPONENT_MAPPING_COMPLETED = createAction(
  'GET_COMPONENT_MAPPING_COMPLETED'
)
export const GET_COMPONENT_MAPPING_ERROR = createAction(
  'GET_COMPONENT_MAPPING_ERROR'
)
export const RESET_COMPONENT_MAPPING = createAction('RESET_COMPONENT_MAPPING')

// Connected Device Update
export const CHECK_EQS_FIRMWARE = createAction('CHECK_EQS_FIRMWARE')
export const GETFILE_EQS_FIRMWARE = createAction('GETFILE_EQS_FIRMWARE')
export const UPLOAD_EQS_FIRMWARE = createAction('UPLOAD_EQS_FIRMWARE')
export const UPLOAD_EQS_FIRMWARE_PROGRESS = createAction(
  'UPLOAD_EQS_FIRMWARE_PROGRESS'
)
export const TRIGGER_EQS_FIRMWARE_UPDATE_INIT = createAction(
  'TRIGGER_EQS_FIRMWARE_UPDATE_INIT'
)
export const UPLOAD_EQS_FIRMWARE_ERROR = createAction(
  'UPLOAD_EQS_FIRMWARE_ERROR'
)

export const TRIGGER_EQS_FIRMWARE_SUCCESS = createAction(
  'TRIGGER_EQS_FIRMWARE_SUCCESS'
)
export const TRIGGER_EQS_FIRMWARE_ERROR = createAction(
  'TRIGGER_EQS_FIRMWARE_ERROR'
)

export const UPDATE_EQS_FIRMWARE_ERROR = createAction(
  'UPDATE_EQS_FIRMWARE_ERROR'
)

export const UPDATE_EQS_FIRMWARE_PROGRESS = createAction(
  'UPDATE_EQS_FIRMWARE_PROGRESS'
)
export const UPDATE_EQS_FIRMWARE_COMPLETED = createAction(
  'UPDATE_EQS_FIRMWARE_COMPLETED'
)
