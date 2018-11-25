import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { apolloClient } from './apolloClient'
import * as serviceWorker from './serviceWorker'
import { auth } from './auth'

ReactDOM.render(
  <App apolloClient={apolloClient} auth={auth} />,
  document.getElementById('root')
)

serviceWorker.unregister()
