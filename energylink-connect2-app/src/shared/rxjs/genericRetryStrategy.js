import { mergeMap } from 'rxjs/operators'
import { throwError, timer } from 'rxjs'

/**
 * It is a retry strategy that will re-run the code X ammout of times
 * @param {number} scalingDuration
 * @param {number}maxRetryAttempts
 * @param {number[]}excludedStatusCodes
 * @returns {function(*): *}
 */
const genericRetryStrategy = ({
  excludedStatusCodes = [],
  maxRetryAttempts = 3,
  scalingDuration = 1000
}) => attempts =>
  attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error)
      }
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration)
    })
  )
export default genericRetryStrategy