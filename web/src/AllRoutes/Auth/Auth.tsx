import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { WebAuth } from 'auth0-js'
import store from 'store2'

import { AuthContext } from '../../AuthContext'
import { Loading } from '../../Loading/Loading'
import { LOCAL_STORAGE_TOKEN_KEY } from '../../constants'

interface Props extends RouteComponentProps {
  auth: WebAuth
}

interface State {
  err?: string
}
export class Auth extends PureComponent<Props, State> {
  static contextType = AuthContext

  // @ts-ignore
  context: WebAuth

  state: State = {}

  componentDidMount() {
    const auth = this.context

    auth.parseHash((err, authResult) => {
      if (err) {
        this.setState({ err: err.errorDescription })
        return
      }

      if (!authResult || !authResult.accessToken) {
        this.setState({ err: 'Bad auth result or access token.' })
        return
      }

      store(LOCAL_STORAGE_TOKEN_KEY, authResult.accessToken)
      const { history } = this.props
      history.push('/me')
    })
  }

  render() {
    const { err } = this.state
    if (err) return <div>Error during authentication: {err}</div>

    return <Loading />
  }
}

export default Auth
