import {
  converge,
  equals,
  head,
  identity,
  last,
  merge,
  omit,
  pathOr,
  pipe,
  prop,
  useWith
} from 'ramda'
import moment from 'moment'
import { createAction } from 'redux-act'
import { getApiAuth } from 'shared/api'
import authClient from 'shared/auth/sdk'

export const LOGIN_INIT = createAction('LOGIN_INIT')
export const LOGIN_SUCCESS = createAction('LOGIN_SUCCESS')
export const LOGIN_ERROR = createAction('LOGIN_ERROR')
export const LOGOUT = createAction('LOGOUT')
export const REFRESH_TOKEN_INIT = createAction('REFRESH_TOKEN_INIT')
export const REFRESH_TOKEN_SUCCESS = createAction('REFRESH_TOKEN_SUCCESS')

export const requestLogin = () => {
  return (dispatch, state) => {
    try {
      let state = authClient.generateRandomValue()
      dispatch(LOGIN_INIT({ state }))
      authClient.authorizeOAuth(state)
    } catch (err) {
      dispatch(LOGIN_ERROR({ message: err }))
    }
  }
}

export const handleLoginFromPing = URL => {
  return (dispatch, getState) => {
    const { user } = getState()
    const hashes = authClient.parseURL(URL)

    if (hashes.error && hashes.error_description) {
      const error = `${hashes.error}: ${hashes.error_description}`
      dispatch(LOGIN_ERROR({ message: error }))
      return
    }

    if (hashes.state && !equals(hashes.state, user.auth.state)) {
      dispatch(LOGIN_ERROR({ message: 'STATE_MISMATCH' }))
      return
    }

    if (hashes.code) {
      authClient
        .getAccessTokenOAuth(hashes.code)
        .then(pipe(handleUserProfile, dispatch))
        .catch(error => {
          dispatch(LOGIN_ERROR({ message: 'FETCH_ACCESS_TOKEN' }))
        })
    }
  }
}

const discardUserPropsFromAPIResponse = pipe(
  prop('body'),
  omit(['userId', 'displayName', 'email'])
)

//eslint-disable-next-line react-hooks/rules-of-hooks
const merge_EDP_PING_Response = useWith(merge, [
  discardUserPropsFromAPIResponse,
  identity
])

const buildUser = converge(merge_EDP_PING_Response, [head, last])

export const handleUserProfile = (tokenInfo = {}) => {
  return dispatch => {
    try {
      const { access_token } = tokenInfo

      Promise.all([
        getApiAuth(access_token).then(s => s.apis.default.get_v1_auth_user()),
        authClient.getUserInfoOAuth(access_token)
      ])
        .then(buildUser)
        .then(user => {
          const payload = { data: user, auth: tokenInfo }
          dispatch(LOGIN_SUCCESS(payload))
        })
        .catch(error => {
          console.error(error)
          const details = prop('details', error)

          if (!details) {
            dispatch(LOGIN_ERROR({ message: 'LOGGING_IN_ERROR' }))
            return
          }

          const firstError = head(details)
          const firstErrorCode = prop('code', firstError)

          if (equals(firstErrorCode, 'INVALID_VALUE')) {
            const firstErrorMsg = prop('message', firstError)
            const ERROR = firstErrorMsg.includes('Access token expired')
              ? 'ACCESS_TOKEN_EXPIRED'
              : firstErrorMsg
            dispatch(LOGIN_ERROR({ message: ERROR }))
          } else {
            const description = prop('error_description', error)
            dispatch(LOGIN_ERROR({ message: description }))
          }
        })
    } catch (err) {
      dispatch(LOGIN_ERROR(err))
    }
  }
}

export const verifyToken = (access_token, refresh_token) => {
  return dispatch => {
    try {
      const isValidToken = authClient.verifyTokenOAuth(access_token)
      if (!isValidToken) dispatch(REFRESH_TOKEN_INIT(refresh_token))
    } catch (error) {
      console.error(error)
      dispatch(REFRESH_TOKEN_INIT(refresh_token))
    }
  }
}

export const VALIDATE_SESSION_INIT = createAction('VALIDATE_SESSION_INIT')
export const VALIDATE_SESSION_SUCCESS = createAction('VALIDATE_SESSION_SUCCESS')
export const VALIDATE_SESSION_ERROR = createAction('VALIDATE_SESSION_ERROR')

export const validateSession = () => {
  return (dispatch, getState) => {
    const { user } = getState()
    const expires = pathOr(0, ['data', 'exp'], user) * 1000
    const diff = moment(expires).diff(moment(), 'hours')
    const isValid = diff > 1
    if (expires > 0 && !isValid) {
      dispatch(REFRESH_TOKEN_INIT())
    }
  }
}
