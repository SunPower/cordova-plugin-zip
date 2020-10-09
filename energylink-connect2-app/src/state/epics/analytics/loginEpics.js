import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { loggedIn, loginFailed } from 'shared/analytics'
import { LOGIN_ERROR, LOGIN_SUCCESS } from 'state/actions/auth'
import { MIXPANEL_EVENT_ERROR } from 'state/actions/analytics'
import { getPartyPromise } from 'state/epics/analytics/epicUtils'

export const loginSuccessEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_SUCCESS.getType()),
    mergeMap(
      ({
        payload: {
          data: user,
          auth: { access_token: accessToken }
        }
      }) => {
        const { partyId } = user

        return from(getPartyPromise(accessToken, partyId)).pipe(
          map(({ status, body: { parentDisplayName: dealerName } }) =>
            status === 200 ? loggedIn({ ...user, dealerName }) : loggedIn(user)
          ),
          catchError(error =>
            of(
              loggedIn(user),
              MIXPANEL_EVENT_ERROR({
                error,
                breadcrumbs: [
                  {
                    type: 'http',
                    message: 'Failed to get dealer name from EDP Party API.',
                    category: 'fetch',
                    data: { method: 'GET', operation: 'Get_Party' }
                  }
                ]
              })
            )
          )
        )
      }
    )
  )

export const loginErrorEpic = action$ =>
  action$.pipe(ofType(LOGIN_ERROR.getType()), map(loginFailed))