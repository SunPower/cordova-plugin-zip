import { createReducer } from 'redux-act'
import { length, pathOr, propOr } from 'ramda'
import {
  DISCOVER_COMPLETE,
  DISCOVER_INIT,
  DISCOVER_UPDATE,
  DISCOVER_ERROR,
  PUSH_CANDIDATES_INIT,
  PUSH_CANDIDATES_ERROR,
  FETCH_CANDIDATES_INIT,
  FETCH_CANDIDATES_UPDATE,
  FETCH_CANDIDATES_COMPLETE,
  FETCH_CANDIDATES_ERROR,
  CLAIM_DEVICES_INIT,
  CLAIM_DEVICES_ERROR,
  CLAIM_DEVICES_RESET,
  RESET_DISCOVERY,
  CLAIM_DEVICES_UPDATE,
  CLAIM_DEVICES_COMPLETE,
  FETCH_MODELS_SUCCESS,
  FETCH_MODELS_LOAD_DEFAULT,
  UPDATE_DEVICES_LIST
} from 'state/actions/devices'

export const discoveryTypes = {
  LEGACY: 'LEGACY',
  ALLNOMI: 'ALLNOMI'
}

const initialState = {
  isFetching: false,
  found: [],
  progress: {},
  error: '',
  pushCandidatesError: false,
  isFetchingCandidates: false,
  candidates: [],
  allCandidatesFound: false,
  discoveryComplete: false,
  claimingDevices: false,
  claimProgress: 0,
  claimedDevices: false,
  claimError: '',
  miModels: []
}

export default createReducer(
  {
    [DISCOVER_INIT]: state => ({ ...state, isFetching: true }),
    [DISCOVER_UPDATE]: (state, payload) => ({
      ...state,
      found: pathOr(state.found, ['devices', 'devices'], payload),
      progress: propOr(state.progress, 'progress', payload)
    }),
    [DISCOVER_COMPLETE]: (state, payload) => ({
      ...state,
      isFetching: false,
      found: pathOr(state.found, ['devices', 'devices'], payload),
      progress: propOr(state.progress, 'progress', payload),
      discoveryComplete: true
    }),
    [DISCOVER_ERROR]: (state, payload) => ({
      ...state,
      isFetching: false,
      progress: {},
      error: payload
    }),
    [PUSH_CANDIDATES_INIT]: state => ({
      ...state,
      pushCandidatesError: initialState.error
    }),
    [PUSH_CANDIDATES_ERROR]: (state, payload) => ({
      ...state,
      error: payload
    }),
    [FETCH_CANDIDATES_INIT]: state => ({
      ...state,
      isFetchingCandidates: true
    }),
    [FETCH_CANDIDATES_UPDATE]: (state, payload) => ({
      ...state,
      isFetchingCandidates: true,
      candidates: length(payload) !== 0 ? payload : state.candidates
    }),
    [FETCH_CANDIDATES_COMPLETE]: state => ({
      ...state,
      isFetchingCandidates: false,
      allCandidatesFound: true
    }),
    [FETCH_CANDIDATES_ERROR]: (state, payload) => ({
      ...state,
      isFetchingCandidates: false,
      candidates: [],
      error: payload
    }),
    [CLAIM_DEVICES_INIT]: state => ({
      ...state,
      claimingDevices: true
    }),
    [CLAIM_DEVICES_UPDATE]: (state, payload) => ({
      ...state,
      claimProgress: payload
    }),
    [CLAIM_DEVICES_COMPLETE]: state => ({
      ...state,
      claimProgress: 100,
      claimingDevices: false,
      claimedDevices: true
    }),
    [CLAIM_DEVICES_ERROR]: (state, payload) => ({
      ...state,
      claimingDevices: false,
      claimError: payload
    }),
    [CLAIM_DEVICES_RESET]: state => ({
      ...state,
      claimProgress: initialState.claimProgress,
      claimingDevices: initialState.claimingDevices,
      claimedDevices: initialState.claimedDevices,
      claimError: initialState.claimError
    }),
    [RESET_DISCOVERY]: () => ({
      ...initialState
    }),
    [FETCH_MODELS_SUCCESS]: (state, payload) => ({
      ...state,
      miModels: [...state.miModels, payload]
    }),
    [FETCH_MODELS_LOAD_DEFAULT]: (state, payload) => ({
      ...state,
      miModels: [...state.miModels, payload]
    }),
    [UPDATE_DEVICES_LIST]: (state, payload) => ({
      ...state,
      found: payload
    })
  },
  initialState
)
