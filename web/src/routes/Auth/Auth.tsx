import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { WebAuth } from 'auth0-js'
import store from 'store2'

import { AuthContext } from '../../AuthContext'
import { Loading } from '../../Loading/Loading'

interface Props extends RouteComponentProps {
  auth: WebAuth
}

interface State {
  err?: string
}
export class Auth extends PureComponent<Props, State> {
  static contextType = AuthContext

  state: State = {}

  // @ts-ignore
  context: WebAuth

  componentDidMount() {
    const auth = this.context

    auth.parseHash((err, authResult) => {
      if (err) {
        this.setState({ err: err.errorDescription })
        return
      }

      if (!authResult || !authResult.idToken) {
        this.setState({ err: 'Bad auth result or token.' })
        return
      }

      store('token', authResult.idToken)
      const { history } = this.props
      history.replace('/me')
    })
  }

  render() {
    const { err } = this.state
    if (err) return <div>Error during authentication: {err}</div>

    return <Loading />
  }
}

export default Auth
