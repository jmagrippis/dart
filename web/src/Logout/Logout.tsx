import React, { PureComponent } from 'react'
import { WebAuth } from 'auth0-js'

import { AuthContext } from '../AuthContext'

export class Logout extends PureComponent {
  static contextType = AuthContext

  // @ts-ignore
  context: WebAuth

  onClick = () => {
    const auth = this.context
    auth.logout({})
  }

  render() {
    return (
      <button data-test="logout" onClick={this.onClick}>
        logout
      </button>
    )
  }
}
