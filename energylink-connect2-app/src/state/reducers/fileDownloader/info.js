import {
  DOWNLOAD_PROGRESS,
  GET_FILE,
  GET_FILE_ERROR
} from '../../actions/fileDownloader'
import { createReducer } from 'redux-act'

const initialState = {
  name: 'Waiting...',
  size: (Math.random() * 50).toFixed(2),
  error: ''
}

export default createReducer(
  {
    [GET_FILE]: (state, payload) => ({
      ...state,
      size: (payload.size / 1000000).toFixed(2),
      error: ''
    }),
    [DOWNLOAD_PROGRESS]: (state, payload) => ({
      ...state,
      name: payload.fileName,
      error: ''
    }),
    [GET_FILE_ERROR]: (state, { error }) => ({ ...state, error })
  },
  initialState
)
