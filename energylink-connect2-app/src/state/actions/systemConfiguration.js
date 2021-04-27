import { createAction } from 'redux-act'

export const FETCH_GRID_BEHAVIOR = createAction('FETCH_GRID_BEHAVIOR')
export const FETCH_GRID_BEHAVIOR_ERR = createAction('FETCH_GRID_BEHAVIOR_ERR')
export const FETCH_GRID_BEHAVIOR_SUCCESS = createAction(
  'FETCH_GRID_BEHAVIOR_SUCCESS'
)
export const SET_GRID_PROFILE = createAction('SET_GRID_PROFILE')
export const SET_EXPORT_LIMIT = createAction('SET_EXPORT_LIMIT')
export const SET_GRID_VOLTAGE = createAction('SET_GRID_VOLTAGE')

export const GET_NETWORK_APS_INIT = createAction('GET_NETWORK_APS_INIT')
export const GET_NETWORK_APS_SUCCESS = createAction('GET_NETWORK_APS_SUCCESS')
export const GET_NETWORK_APS_ERROR = createAction('GET_NETWORK_APS_ERROR')

export const CONNECT_NETWORK_AP_INIT = createAction('CONNECT_NETWORK_AP_INIT')
export const CONNECT_NETWORK_AP_ERROR = createAction('CONNECT_NETWORK_AP_ERROR')

export const SET_CONSUMPTION_CT = createAction('SET_CONSUMPTION_CT')
export const SET_RATED_CURRENT = createAction('SET_RATED_CURRENT')
export const SET_PRODUCTION_CT = createAction('SET_PRODUCTION_CT')

export const SUBMIT_CLEAR = createAction('SUBMIT_CLEAR')
export const REPLACE_RMA_PVS = createAction('REPLACE_RMA_PVS')
export const SUBMIT_CONFIG = createAction('SUBMIT_CONFIG')
export const SUBMIT_CONFIG_SUCCESS = createAction('SUBMIT_CONFIG_SUCCESS')
export const SUBMIT_CONFIG_ERROR = createAction('SUBMIT_CONFIG_ERROR')
export const SAVE_CT_RATED_CURRENT_INIT = createAction(
  'SAVE_CT_RATED_CURRENT_INIT'
)
export const SAVE_CT_RATED_CURRENT_ERROR = createAction(
  'SAVE_CT_RATED_CURRENT_ERROR'
)
export const SUBMIT_GRIDPROFILE = createAction('SUBMIT_GRIDPROFILE')
export const SUBMIT_EXPORTLIMIT = createAction('SUBMIT_EXPORTLIMIT')
export const SUBMIT_GRIDVOLTAGE = createAction('SUBMIT_GRIDVOLTAGE')
export const SUBMIT_METERCONFIG = createAction('SUBMIT_METERCONFIG')

export const GET_STORAGE_INIT = createAction('GET_BATTERIES_INIT')
export const GET_STORAGE_ERROR = createAction('GET_BATTERIES_ERROR')
export const GET_STORAGE_SUCCESS = createAction('GET_BATTERIES_SUCCESS')

export const GET_INTERFACES_INIT = createAction('GET_INTERFACES_INIT')
export const GET_INTERFACES_ERROR = createAction('GET_INTERFACES_ERROR')
export const GET_INTERFACES_SUCCESS = createAction('GET_INTERFACES_SUCCESS')

export const GET_RSE_INIT = createAction('GET_RSE_INIT')
export const GET_RSE_ERROR = createAction('GET_RSE_ERROR')
export const GET_RSE_SUCCESS = createAction('GET_RSE_SUCCESS')

export const SET_RSE_INIT = createAction('SET_RSE_INIT')
export const SET_RSE_ERROR = createAction('SET_RSE_ERROR')
export const SET_RSE_STATUS = createAction('SET_RSE_STATUS')
export const SET_RSE_SUCCESS = createAction('SET_RSE_SUCCESS')
export const SET_SELECTED_POWER_PRODUCTION = createAction(
  'SET_SELECTED_POWER_PRODUCTION'
)

export const SET_WPS_CONNECTION_STATUS = createAction(
  'SET_WPS_CONNECTION_STATUS'
)

export const SET_SELECTED_AP = createAction('SET_SELECTED_AP')

export const SUBMIT_COMMISSION_SUCCESS = createAction(
  'SUBMIT_COMMISSION_SUCCESS'
)
export const SUBMIT_COMMISSION_ERROR = createAction('SUBMIT_COMMISSION_ERROR')
export const COMMISSION_ERROR_REPORTED = createAction(
  'COMMISSION_ERROR_REPORTED'
)

export const RESET_SYSTEM_CONFIGURATION = createAction(
  'RESET_SYSTEM_CONFIGURATION'
)

export const ALLOW_COMMISSIONING = createAction('ALLOW_COMMISSIONING')

export const SUBMIT_PRECONFIG_GRIDPROFILE = createAction(
  'SUBMIT_PRECONFIG_GRIDPROFILE'
)
export const SUBMIT_PRECONFIG_METER = createAction('SUBMIT_PRECONFIG_METER')
export const SUBMIT_PRECONFIG_ERROR = createAction('SUBMIT_PRECONFIG_ERROR')
export const SUBMIT_PRECONFIG_SUCCESS = createAction('SUBMIT_PRECONFIG_SUCCESS')
