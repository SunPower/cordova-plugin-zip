import { createAction } from 'redux-act'

export const ADD_PVS_SN = createAction('ADD_PVS_SN')
export const SAVE_PVS_SN = createAction('SAVE_PVS_SN')
export const GET_SN_INIT = createAction('GET_SN_INIT')
export const GET_SN_SUCCESS = createAction('GET_SN_SUCCESS')
export const GET_SN_ERROR = createAction('GET_SN_ERROR')
export const REMOVE_SN = createAction('REMOVE_SN')
export const START_COMMISSIONING_INIT = createAction('START_COMMISSIONING_INIT')
export const START_COMMISSIONING_SUCCESS = createAction(
  'START_COMMISSIONING_SUCCESS'
)
export const START_COMMISSIONING_ERROR = createAction(
  'START_COMMISSIONING_ERROR'
)
export const START_DISCOVERY_INIT = createAction('START_DISCOVERY_INIT')
export const START_DISCOVERY_SUCCESS = createAction('START_DISCOVERY_SUCCESS')
export const START_DISCOVERY_ERROR = createAction('START_DISCOVERY_ERROR')

export const SET_METADATA_INIT = createAction('SET_METADATA_INIT')
export const SET_METADATA_SUCCESS = createAction('SET_METADATA_SUCCESS')
export const SET_METADATA_ERROR = createAction('SET_METADATA_ERROR')

export const RESET_PVS_INFO_STATE = createAction('RESET_PVS_INFO_STATE')

export const MI_DATA_START_POLLING = createAction('MI_DATA_START_POLLING')
export const MI_DATA_STOP_POLLING = createAction('MI_DATA_STOP_POLLING')
export const MI_DATA_SUCCESS = createAction('MI_DATA_SUCCESS')
export const MI_DATA_ERROR = createAction('MI_DATA_ERROR')

export const removeSN = serialNumber => {
  return dispatch => {
    dispatch(REMOVE_SN(serialNumber))
  }
}

export const saveSerialNumber = serialNumber => {
  return dispatch => {
    dispatch(SAVE_PVS_SN(serialNumber))
  }
}
