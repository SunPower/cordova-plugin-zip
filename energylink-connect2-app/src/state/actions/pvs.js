import { createAction } from 'redux-act'

export const SAVE_PVS_SN = createAction('SAVE_PVS_SN')
export const GET_SN_INIT = createAction('GET_SN_INIT')
export const GET_SN_SUCCESS = createAction('GET_SN_SUCCESS')
export const GET_SN_ERROR = createAction('GET_SN_ERROR')
export const REMOVE_SN = createAction('REMOVE_SN')

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
