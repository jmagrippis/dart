import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Login } from '../../Login/Login'

export class Home extends PureComponent<RouteComponentProps> {
  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

export default Home
