import { of, throwError } from 'rxjs'
import { SET_SITE } from 'state/actions/site'
import {
  WAKELOCK_ACQUIRE_ERROR,
  WAKELOCK_ACQUIRED,
  WAKELOCK_RELEASED
} from 'state/actions/wakelock'

import * as utils from './utilities'
import { COMMISSION_SUCCESS } from 'state/actions/analytics'

describe('The wakeLock epics', function() {
  const inputMarble = 'a'
  const outputMarble = 'a'
  const releasePromisePayload = 'OK'

  it('should return WAKELOCK_ACQUIRED when the wakelock is acquired', function() {
    jest
      .spyOn(utils, 'acquireWakeLock')
      .mockImplementation(() => of(releasePromisePayload))
    const epicTest = epicTester(require('./acquire').acquire)
    const inputValue = {
      a: SET_SITE()
    }
    const expectedValue = {
      a: WAKELOCK_ACQUIRED(releasePromisePayload)
    }
    epicTest(inputMarble, outputMarble, inputValue, expectedValue)
  })
  it('should return WAKELOCK_RELEASED when the wakelock is released', function() {
    jest
      .spyOn(utils, 'releaseWakeLock')
      .mockImplementation(() => of(releasePromisePayload))
    const epicTest = epicTester(require('./release').release)

    const inputValue = {
      a: COMMISSION_SUCCESS()
    }
    const expectedValue = {
      a: WAKELOCK_RELEASED(releasePromisePayload)
    }
    epicTest(inputMarble, outputMarble, inputValue, expectedValue)
  })
})