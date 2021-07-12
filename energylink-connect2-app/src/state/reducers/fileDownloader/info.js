import { propOr } from 'ramda'
import { createReducer } from 'redux-act'

import { getVersionFromUrl } from 'shared/download'
import {
  PVS_FIRMWARE_DOWNLOAD_ERROR,
  PVS_FIRMWARE_DOWNLOAD_INIT,
  PVS_FIRMWARE_DOWNLOAD_PROGRESS,
  PVS_FIRMWARE_DOWNLOAD_SUCCESS,
  PVS_FIRMWARE_UPDATE_URL,
  PVS_SET_FILE_INFO
} from 'state/actions/fileDownloader'

const initialState = {
  name: '',
  displayName: '',
  size: 0,
  error: '',
  exists: false,
  updateURL: '',
  version: undefined,
  lastModified: 0,
  step: ''
}

export default createReducer(
  {
    [PVS_FIRMWARE_UPDATE_URL]: (state, { url }) => ({
      ...state,
      updateURL: url,
      version: getVersionFromUrl(url),
      step: 'UPDATING_URL'
    }),
    [PVS_FIRMWARE_DOWNLOAD_ERROR]: state => ({
      ...state,
      error: 'Error downloading PVS'
    }),
    [PVS_FIRMWARE_DOWNLOAD_INIT]: state => ({
      ...state,
      error: '',
      exists: false,
      step: 'INITIALIZING'
    }),
    [PVS_FIRMWARE_DOWNLOAD_SUCCESS]: (state, { lastModified, size }) => ({
      ...state,
      lastModified,
      size,
      exists: true,
      error: ''
    }),
    [PVS_FIRMWARE_DOWNLOAD_PROGRESS]: (state, { size, step }) => ({
      ...state,
      size,
      error: '',
      step
    }),
    [PVS_SET_FILE_INFO]: (state, props) => ({
      ...state,
      name: propOr(state.name, 'name', props),
      displayName: propOr(state.displayName, 'displayName', props),
      exists: propOr(state.exists, 'exists', props),
      size: propOr(state.size, 'size', props)
    })
  },
  initialState
)
