import { createReducer } from 'redux-act'
import { length, pathOr, propOr } from 'ramda'
import {
  DISCOVER_COMPLETE,
  DISCOVER_INIT,
  DISCOVER_UPDATE,
  DISCOVER_ERROR,
  FETCH_CANDIDATES_INIT,
  FETCH_CANDIDATES_UPDATE,
  FETCH_CANDIDATES_COMPLETE,
  FETCH_CANDIDATES_ERROR,
  CLAIM_DEVICES_INIT,
  CLAIM_DEVICES_ERROR,
  RESET_DISCOVERY,
  CLAIM_DEVICES_UPDATE,
  CLAIM_DEVICES_COMPLETE,
  FETCH_MODELS_SUCCESS
} from 'state/actions/devices'

const initialState = {
  isFetching: false,
  found: {},
  progress: {},
  error: '',
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
    [DISCOVER_UPDATE]: (state, payload) => {
      return {
        ...state,
        found: pathOr(state.found, ['devices', 'devices'], payload),
        progress: propOr(state.progress, 'progress', payload)
      }
    },
    [DISCOVER_COMPLETE]: (state, payload) => {
      return {
        ...state,
        isFetching: false,
        found: pathOr(state.found, ['devices', 'devices'], payload),
        progress: propOr(state.progress, 'progress', payload),
        discoveryComplete: true
      }
    },
    [DISCOVER_ERROR]: (state, payload) => {
      return {
        ...state,
        isFetching: false,
        progress: {},
        error: payload
      }
    },
    [FETCH_CANDIDATES_INIT]: state => {
      return {
        ...state,
        isFetchingCandidates: true
      }
    },
    [FETCH_CANDIDATES_UPDATE]: (state, payload) => {
      return {
        ...state,
        isFetchingCandidates: true,
        candidates: length(payload) !== 0 ? payload : state.candidates
      }
    },
    [FETCH_CANDIDATES_COMPLETE]: state => {
      return {
        ...state,
        isFetchingCandidates: false,
        allCandidatesFound: true
      }
    },
    [FETCH_CANDIDATES_ERROR]: (state, payload) => {
      return {
        ...state,
        isFetchingCandidates: false,
        candidates: [],
        error: payload
      }
    },
    [CLAIM_DEVICES_INIT]: state => {
      return {
        ...state,
        claimingDevices: true
      }
    },
    [CLAIM_DEVICES_UPDATE]: (state, payload) => {
      return {
        ...state,
        claimProgress: payload
      }
    },
    [CLAIM_DEVICES_COMPLETE]: state => {
      return {
        ...state,
        claimProgress: 100,
        claimingDevices: false,
        claimedDevices: true
      }
    },
    [CLAIM_DEVICES_ERROR]: (state, payload) => {
      return {
        ...state,
        claimingDevices: false,
        claimError: payload
      }
    },
    [RESET_DISCOVERY]: () => {
      return {
        ...initialState
      }
    },
    [FETCH_MODELS_SUCCESS]: (state, payload) => {
      return {
        ...state,
        miModels: payload
      }
    }
  },
  initialState
)
