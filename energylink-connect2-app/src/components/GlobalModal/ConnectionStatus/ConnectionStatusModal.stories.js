import React from 'react'
import { storiesOf } from '@storybook/react'
import { configureStore } from 'state/store'
import { Provider } from 'react-redux'

import { appConnectionStatus } from 'state/reducers/network'

import ConnectionStatusModal from './ConnectionStatusModal'

storiesOf('Connection Status Modal', module)
  .add('Connected', () => {
    const { store } = configureStore({
      network: {
        connectionStatus: appConnectionStatus.CONNECTED
      }
    })

    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <ConnectionStatusModal />
        </Provider>
      </div>
    )
  })
  .add('Routing to Data', () => {
    const { store } = configureStore({
      network: {
        connectionStatus: appConnectionStatus.NOT_USING_WIFI
      }
    })

    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <ConnectionStatusModal />
        </Provider>
      </div>
    )
  })
  .add('Not connected to the PVS', () => {
    const { store } = configureStore({
      network: {
        connectionStatus: appConnectionStatus.NOT_CONNECTED_PVS
      }
    })

    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <ConnectionStatusModal />
        </Provider>
      </div>
    )
  })
  .add('Not connected at all', () => {
    const { store } = configureStore({
      network: {
        connectionStatus: appConnectionStatus.NOT_CONNECTED
      }
    })

    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <ConnectionStatusModal />
        </Provider>
      </div>
    )
  })
  .add('Connecting', () => {
    const { store } = configureStore({
      network: {
        connectionStatus: appConnectionStatus.NOT_CONNECTED_PVS,
        connecting: true
      }
    })

    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <ConnectionStatusModal />
        </Provider>
      </div>
    )
  })