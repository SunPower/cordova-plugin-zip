import { always, compose, cond, equals, find, path, propEq, T } from 'ramda'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import { useDispatch } from 'react-redux'
import { useRouter } from 'hooks'
import { protectedRoutes, TABS } from 'routes/paths'
import { withTracker } from 'shared/ga'
import { routeAuthorization, setLayout } from 'hocs'
import { deviceResumeListener } from 'state/actions/mobile'

import CreateSite from 'pages/CreateSite'
import Firmwares from 'pages/Firmwares'
import Home from 'pages/Home'
import Data from 'pages/Data'
import Login from 'pages/Login'
import Menu from 'pages/Menu'
import NotFound from 'pages/NotFound'
import ConnectToPVS from 'pages/ConnectToPVS'
import PvsConnectionSuccessful from 'pages/PvsConnectionSuccessful'
import BillOfMaterials from 'pages/BillOfMaterials'
import InventoryCount from 'pages/InventoryCount'
import ScanLabels from 'pages/ScanLabels'
import GiveFeedback from 'pages/GiveFeedback'
import SNList from 'pages/SNList'
import Devices from 'pages/Devices'
import InstallSuccessful from 'pages/InstallSuccess'
import SystemConfiguration from 'pages/SystemConfiguration'
import SavingConfiguration from 'pages/SavingConfiguration'
import Logout from 'pages/Logout'

import paths from './paths'
import { validateSession } from 'state/actions/auth'

const mapComponents = {
  [paths.PROTECTED.DEVICES.path]: Devices,
  [paths.PROTECTED.BILL_OF_MATERIALS.path]: BillOfMaterials,
  [paths.PROTECTED.CREATE_SITE.path]: CreateSite,
  [paths.PROTECTED.GIVE_FEEDBACK.path]: GiveFeedback,
  [paths.PROTECTED.DATA.path]: Data,
  [paths.PROTECTED.LOGOUT.path]: NotFound,
  [paths.PROTECTED.MANAGE_FIRMWARES.path]: Firmwares,
  [paths.PROTECTED.MENU.path]: Menu,
  [paths.PROTECTED.PVS_CONNECTION_SUCCESS.path]: PvsConnectionSuccessful,
  [paths.PROTECTED.INSTALL_SUCCESS.path]: InstallSuccessful,
  [paths.PROTECTED.ROOT.path]: Home,
  [paths.PROTECTED.VERSION_INFORMATION.path]: NotFound,
  [paths.PROTECTED.INVENTORY_COUNT.path]: InventoryCount,
  [paths.PROTECTED.CONNECT_TO_PVS.path]: ConnectToPVS,
  [paths.PROTECTED.SCAN_LABELS.path]: ScanLabels,
  [paths.PROTECTED.SYSTEM_CONFIGURATION.path]: SystemConfiguration,
  [paths.PROTECTED.SAVING_CONFIGURATION.path]: SavingConfiguration,
  [paths.PROTECTED.SN_LIST.path]: SNList,
  [paths.UNPROTECTED.FORGOT_PASSWORD.path]: NotFound,
  [paths.UNPROTECTED.GET_ASSISTANCE.path]: NotFound,
  [paths.UNPROTECTED.LOGIN.path]: Login,
  [paths.UNPROTECTED.LOGOUT.path]: Logout
}

const isTab = tab => compose(equals(tab), path(['tab']))

const getTabNumber = cond([
  [isTab(TABS.DATA), always(4)],
  [isTab(TABS.CONFIGURE), always(3)],
  [isTab(TABS.INSTALL), always(2)],
  [isTab(TABS.HOME), always(1)],
  [T, always(-1)]
])

const getTabNumberFromPathname = actualScreen =>
  getTabNumber(find(propEq('path', actualScreen), protectedRoutes))

/**
 * The router of this app
 * @returns {*}
 * @constructor
 */
function AppRoutes() {
  const dispatch = useDispatch()
  const { location } = useRouter()
  const [lastTab, setLastTab] = useState()

  useEffect(() => {
    setLastTab(getTabNumberFromPathname(location.pathname))
  }, [location])

  const fadeIn = useTransition(location, loc => loc.pathname, {
    unique: true,
    from: () => {
      const actualTab = getTabNumberFromPathname(location.pathname)
      if (!lastTab) return { opacity: 0, transform: 'translate(0%,-100%)' }
      else if (actualTab < lastTab)
        return { opacity: 0, transform: 'translate(-100%,0)' }
      else return { opacity: 0, transform: 'translate(100%,0)' }
    },
    enter: { opacity: 1, transform: 'translate(0%,0%)' },
    leave: () => {
      const actualTab = getTabNumberFromPathname(location.pathname)
      if (actualTab < lastTab)
        return { opacity: 0, transform: 'translate(100%,0)' }
      else return { opacity: 0, transform: 'translate(-100%,0)' }
    }
  })

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    dispatch(deviceResumeListener())
    dispatch(validateSession())
  }, [dispatch])

  const isLoggedIn = useSelector(({ user }) => user.auth.access_token)
  return fadeIn.map(({ item, props, key, state }) => (
    <animated.div key={key} style={props}>
      <Switch location={item}>
        {Object.values(paths.UNPROTECTED).map(
          ({ path, header = false, footer = false }) => (
            <Route
              key={path}
              path={path}
              exact
              component={routeAuthorization(
                false,
                isLoggedIn,
                state
              )(
                setLayout(
                  header,
                  footer,
                  state
                )(withTracker(mapComponents[path]))
              )}
            />
          )
        )}
        {Object.values(paths.PROTECTED).map(
          ({ path, header = false, footer = false }) => (
            <Route
              key={path}
              path={path}
              exact
              component={routeAuthorization(
                true,
                isLoggedIn,
                state
              )(
                setLayout(
                  header,
                  footer,
                  state
                )(withTracker(mapComponents[path]))
              )}
            />
          )
        )}
        <Route component={NotFound} />
      </Switch>
    </animated.div>
  ))
}

export default AppRoutes
