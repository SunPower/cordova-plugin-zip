import * as siteActions from '../../actions/site'

import { siteReducer } from './index'

describe('Site Reducer', () => {
  const reducerTest = reducerTester(siteReducer)

  it('returns the initial state', () => {
    reducerTest({}, {}, {})
  })

  it('populates the reducer state after GET_SITES_INIT action is fired', () => {
    reducerTest({ fetchSites: false }, siteActions.GET_SITES_INIT(), {
      fetchSites: true
    })
  })
})