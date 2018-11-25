import React, { PureComponent } from 'react'
import { WebAuth } from 'auth0-js'

import { AuthContext } from '../AuthContext'

export class Login extends PureComponent {
  // @ts-ignore
  context: WebAuth

  onClick = () => {
    const auth = this.context
    auth.authorize()
  }

  render() {
    return (
      <button data-test="login" onClick={this.onClick}>
        login
      </button>
    )
  }
}

Login.contextType = AuthContext
