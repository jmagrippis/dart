import React, { PureComponent, Fragment } from 'react'
import { Route, RouteComponentProps } from 'react-router'
import store from 'store2'
import { WebAuth } from 'auth0-js'

import { LazyHome, LazyMe, LazyUser, LazyAuth } from './routes'
import { AuthContext } from '../AuthContext'

const LOCAL_STORAGE_TOKEN_KEY = 'token'

export class AllRoutes extends PureComponent<RouteComponentProps> {
  static contextType = AuthContext

  // @ts-ignore
  context: WebAuth

  componentDidMount() {
    if (
      this.props.location.pathname === '/auth' ||
      !store.has(LOCAL_STORAGE_TOKEN_KEY)
    ) {
      return
    }

    this.silentAuth()
  }

  silentAuth = () => {
    const auth = this.context

    auth.checkSession({}, (err, authResult) => {
      if (err || !authResult || !authResult.idToken) {
        store.remove(LOCAL_STORAGE_TOKEN_KEY)
        return
      }

      store(LOCAL_STORAGE_TOKEN_KEY, authResult.idToken)
    })
  }

  render() {
    return (
      <Fragment>
        <Route path="/" exact component={LazyHome} />
        <Route path="/me" exact component={LazyMe} />
        <Route path="/u/:username" component={LazyUser} />
        <Route path="/auth" component={LazyAuth} />
      </Fragment>
    )
  }
}

export default AllRoutes
