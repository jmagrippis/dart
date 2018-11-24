import React from 'react'
import ReactDOM from 'react-dom'
import 'reset-css'

import './resetButton.css'
import './index.css'
import { App } from './App'
import { apolloClient } from './apolloClient'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <App apolloClient={apolloClient} />,
  document.getElementById('root')
)

serviceWorker.unregister()
