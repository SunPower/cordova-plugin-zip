import ErrorDetailScreen from 'pages/ErrorDetailScreen/ErrorDetail'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withTracker } from 'shared/ga'
import { routeAuthorization, setLayout } from 'hocs'
import useUpgrade from 'hooks/useUpgrade'
import useAppUpdate from 'hooks/useAppUpdate'
import useCanceledPVSConnection from 'hooks/useCanceledPVSConnection'

import BillOfMaterials from 'pages/BillOfMaterials'
import ConnectionLost from 'pages/ConnectionLost'
import ConnectToPVS from 'pages/ConnectToPVS'
import CreateSite from 'pages/CreateSite'
import Data from 'pages/Data'
import Devices from 'pages/Devices'
import Home from 'pages/Home'
import InstallSuccessful from 'pages/InstallSuccess'
import InventoryCount from 'pages/InventoryCount'
import LegacyDiscovery from 'pages/LegacyDiscovery'
import Login from 'pages/Login'
import ModelEdit from 'pages/ModelEdit'
import NotFound from 'pages/NotFound'
import PanelLayoutTool from 'pages/PanelLayoutTool/AddingPanels'
import PanelLayoutToolGroupPanels from 'pages/PanelLayoutTool/GroupPanels'
import PvsConnectionSuccessful from 'pages/PvsConnectionSuccessful'
import PVSProvideInternet from 'pages/PVSProvideInternet'
import SavingConfiguration from 'pages/SavingConfiguration'
import ScanLabels from 'pages/ScanLabels'
import SNList from 'pages/SNList'
import SystemConfiguration from 'pages/SystemConfiguration'
import UpdateScreen from 'pages/UpdateScreen'
import ESSDeviceMapping from 'pages/ESSDeviceMapping'
import ESSDeviceMappingError from 'pages/ESSDeviceMappingError'
import ESSDeviceMappingErrorList from 'pages/ESSDeviceMappingErrorList'
import ESSDeviceMappingSuccess from 'pages/ESSDeviceMappingSuccess'
import EQSUpdate from 'pages/EQSUpdate'
import EQSUpdateErrors from 'pages/EQSUpdateErrors'
import EQSPrediscoveryErrors from 'pages/EQSPrediscoveryErrors'
import ESSHealthCheck from 'pages/ESSHealthCheck'
import ESSHealthCheckErrors from 'pages/ESSHealthCheckErrors'
import StoragePrediscovery from 'pages/StoragePrediscovery'
import DebugPage from 'pages/DebugPage'
import PvsSelection from 'pages/PvsSelection'
import ExistingDevices from 'pages/ExistingDevices'
import RMAInventory from 'pages/RMAInventory'
import RMASnList from 'pages/RMASnList'
import RMAMiDiscovery from 'pages/RMAMiDiscovery'
import RMADevices from 'pages/RMADevices'
import GetAssistance from 'pages/GetAssistance'

import { validateSession } from 'state/actions/auth'
import { isDebug, updateBodyHeight } from 'shared/utils'
import { deviceResumeListener } from 'state/actions/mobile'

import paths from './paths'

const mapComponents = {
  [paths.PROTECTED.RMA_INVENTORY.path]: RMAInventory,
  [paths.PROTECTED.RMA_SN_LIST.path]: RMASnList,
  [paths.PROTECTED.ERROR_DETAIL.path]: ErrorDetailScreen,
  [paths.PROTECTED.DEVICES.path]: Devices,
  [paths.PROTECTED.UPDATE.path]: UpdateScreen,
  [paths.PROTECTED.PVS_SELECTION_SCREEN.path]: PvsSelection,
  [paths.PROTECTED.BILL_OF_MATERIALS.path]: BillOfMaterials,
  [paths.PROTECTED.CREATE_SITE.path]: CreateSite,
  [paths.PROTECTED.DATA.path]: Data,
  [paths.PROTECTED.PANEL_LAYOUT_TOOL.path]: PanelLayoutTool,
  [paths.PROTECTED.PANEL_LAYOUT_TOOL_GROUPS.path]: PanelLayoutToolGroupPanels,
  [paths.PROTECTED.PVS_CONNECTION_SUCCESS.path]: PvsConnectionSuccessful,
  [paths.PROTECTED.PVS_PROVIDE_INTERNET.path]: PVSProvideInternet,
  [paths.PROTECTED.INSTALL_SUCCESS.path]: InstallSuccessful,
  [paths.PROTECTED.ROOT.path]: Home,
  [paths.PROTECTED.INVENTORY_COUNT.path]: InventoryCount,
  [paths.PROTECTED.CONNECT_TO_PVS.path]: ConnectToPVS,
  [paths.PROTECTED.SCAN_LABELS.path]: ScanLabels,
  [paths.PROTECTED.SYSTEM_CONFIGURATION.path]: SystemConfiguration,
  [paths.PROTECTED.SAVING_CONFIGURATION.path]: SavingConfiguration,
  [paths.PROTECTED.SN_LIST.path]: SNList,
  [paths.PROTECTED.MODEL_EDIT.path]: ModelEdit,
  [paths.PROTECTED.LEGACY_DISCOVERY.path]: LegacyDiscovery,
  [paths.PROTECTED.CONNECTION_LOST.path]: ConnectionLost,
  [paths.PROTECTED.ESS_DEVICE_MAPPING.path]: ESSDeviceMapping,
  [paths.PROTECTED.ESS_DEVICE_MAPPING_ERROR.path]: ESSDeviceMappingError,
  [paths.PROTECTED.ESS_DEVICE_MAPPING_ERROR_LIST
    .path]: ESSDeviceMappingErrorList,
  [paths.PROTECTED.ESS_DEVICE_MAPPING_SUCCESS.path]: ESSDeviceMappingSuccess,
  [paths.PROTECTED.EQS_UPDATE.path]: EQSUpdate,
  [paths.PROTECTED.EQS_UPDATE_ERRORS.path]: EQSUpdateErrors,
  [paths.PROTECTED.STORAGE_PREDISCOVERY.path]: StoragePrediscovery,
  [paths.PROTECTED.EQS_PREDISCOVERY_ERRORS.path]: EQSPrediscoveryErrors,
  [paths.PROTECTED.ESS_HEALTH_CHECK.path]: ESSHealthCheck,
  [paths.PROTECTED.ESS_HEALTH_CHECK_ERRORS.path]: ESSHealthCheckErrors,
  [paths.PROTECTED.RMA_EXISTING_DEVICES.path]: ExistingDevices,
  [paths.PROTECTED.RMA_MI_DISCOVERY.path]: RMAMiDiscovery,
  [paths.UNPROTECTED.FORGOT_PASSWORD.path]: NotFound,
  [paths.UNPROTECTED.GET_ASSISTANCE.path]: NotFound,
  [paths.PROTECTED.RMA_DEVICES.path]: RMADevices,
  [paths.UNPROTECTED.LOGIN.path]: Login,
  [paths.UNPROTECTED.GET_ASSISTANCE.path]: GetAssistance
}

if (isDebug) mapComponents[paths.PROTECTED.DEBUG_PAGE.path] = DebugPage

/**
 * The router of this app
 * @returns {*}
 * @constructor
 */
function AppRoutes() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  useAppUpdate()
  useUpgrade()
  useCanceledPVSConnection()

  useEffect(() => {
    dispatch(deviceResumeListener())
    dispatch(validateSession())

    window.addEventListener('keyboardDidHide', updateBodyHeight)

    return () => {
      document.removeEventListener('keyboardDidHide', updateBodyHeight)
    }
  }, [dispatch])

  const isLoggedIn = useSelector(({ user }) => user.auth.access_token)
  return (
    <div>
      <Switch>
        {Object.values(paths.UNPROTECTED).map(
          ({ path, header = false, footer = false }) => (
            <Route
              key={path}
              path={path}
              exact
              component={routeAuthorization(
                false,
                isLoggedIn
              )(setLayout(header, footer)(withTracker(mapComponents[path])))}
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
                isLoggedIn
              )(setLayout(header, footer)(withTracker(mapComponents[path])))}
            />
          )
        )}
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default AppRoutes
