import 'unfetch/polyfill' // Fetch polyfill
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import * as Sentry from '@sentry/browser'
import '@sunpower/theme-dark'
// import App from './App'

const GAproperty = process.env.REACT_APP_IS_MOBILE
  ? process.env.NODE_ENV === 'production'
    ? 'UA-150756685-2'
    : 'UA-150756685-1' // eslint-disable-line
  : process.env.NODE_ENV === 'production'
  ? 'UA-150756685-2'
  : 'UA-150756685-1' // eslint-disable-line

ReactGA.initialize(GAproperty)
ReactGA.set({ checkProtocolTask: null })

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN })

const MyApp = () => <h1 className="mt-30"> This App Runs on WkwebEngine </h1>

const startApp = () => {
  ReactDOM.render(<MyApp />, document.getElementById('root'))
  if (window.UXCam) {
    window.UXCam.optIntoSchematicRecordings() /* To enabled session video recording on iOS */
    window.UXCam.startWithKey(process.env.REACT_APP_UXCAM)
  }
}

if (!window.cordova) {
  startApp()
} else {
  document.addEventListener('deviceready', startApp, false)
}
