import SearchField from 'components/SearchField'
import { compose, join, length, path, pick, prop, test, values } from 'ramda'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import paths from 'routes/paths'

import { useI18n } from 'shared/i18n'
import { cleanString, either } from 'shared/utils'
import { RESET_DISCOVERY } from 'state/actions/devices'
import { RESET_INVENTORY } from 'state/actions/inventory'
import { RESET_PVS_CONNECTION } from 'state/actions/network'
import { RESET_PVS_INFO_STATE } from 'state/actions/pvs'

import { GET_SITES_INIT, RESET_SITE, SET_SITE } from 'state/actions/site'

import './Home.scss'
import { RESET_LAST_VISITED_PAGE } from 'state/actions/global'
import { FIRMWARE_GET_FILE } from 'state/actions/fileDownloader'

const getString = compose(
  join(' '),
  values,
  pick(['address1', 'city', 'postalCode'])
)

const buildSelectValue = value => ({
  label: getString(value),
  value: value.siteKey,
  site: value
})

const setSite = (history, dispatch) => site => {
  resetCommissioning(dispatch)
  dispatch(SET_SITE(site))
  history.push(paths.PROTECTED.BILL_OF_MATERIALS.path)
}

const resetCommissioning = dispatch => {
  dispatch(RESET_PVS_INFO_STATE())
  dispatch(RESET_PVS_CONNECTION())
  dispatch(RESET_DISCOVERY())
  dispatch(RESET_INVENTORY())
  dispatch(RESET_SITE())
  dispatch(RESET_LAST_VISITED_PAGE())
}

function Home() {
  const t = useI18n()
  const dispatch = useDispatch()
  const history = useHistory()

  const { isFetching, sites = [], error } = useSelector(state => state.site)

  const found = length(sites) || 0
  const errorMessage = path(['data', 'message'], error)

  useEffect(() => {
    dispatch(GET_SITES_INIT())
    dispatch(FIRMWARE_GET_FILE())
  }, [dispatch])

  const notFoundText = t('NOT_FOUND')

  const filterSites = (inputValue, cb) => {
    const searchStr = cleanString(inputValue)
    const matchValue = compose(test(new RegExp(searchStr, 'ig')), getString)
    const results = sites.filter(matchValue).map(buildSelectValue)
    cb(results)
  }

  return (
    <section className="home is-flex has-text-centered full-height">
      <div className="section">
        <span className="sp sp-map has-text-white" />
        <h6 className="is-uppercase mt-20 mb-20">{t('SELECT_SITE')}</h6>

        <SearchField
          onSearch={filterSites}
          onSelect={compose(setSite(history, dispatch), prop('site'))}
          notFoundText={notFoundText}
        />

        <div className="message mb-10 mt-10">
          <p className="pl-20 pr-20">
            {isFetching ? t('FETCHING_SITES') : t('FOUND_SITES', found)}
          </p>
        </div>

        {either(
          error,
          <div className="message error mb-10 mt-10">
            <p className="pl-20 pr-20"> {t('FETCH_SITE_ERROR')} </p>
            <p className="pl-20 pr-20"> {errorMessage} </p>
          </div>
        )}
      </div>
      <section>
        <p>{t('CS_NOT_FOUND')}</p>
        <Link
          to={paths.PROTECTED.CREATE_SITE.path}
          className="has-text-weight-bold is-uppercase is-size-7"
        >
          <small>{t('CREATE_SITE')}</small>
        </Link>
      </section>
    </section>
  )
}

export default Home
