import { createAction } from 'redux-act'

export const SET_RMA_MODE = createAction('SET_RMA_MODE')
export const CLEAR_RMA = createAction('CLEAR_RMA')
export const RMA_SELECT_PVS = createAction('SELECT_PVS_RMA')
export const SET_NEW_EQUIPMENT = createAction('SET_NEW_EQUIPMENT')

export const FETCH_DEVICE_TREE = createAction('FETCH_DEVICE_TREE')
export const FETCH_DEVICE_TREE_SUCCESS = createAction(
  'FETCH_DEVICE_TREE_SUCCESS'
)
export const FETCH_DEVICE_TREE_ERROR = createAction('FETCH_DEVICE_TREE_ERROR')

export const UPDATE_DEVICE_TREE = createAction('UPDATE_DEVICE_TREE')
export const RESET_RMA_PVS = createAction('RESET_RMA_PVS')
