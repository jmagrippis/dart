import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export class Home extends PureComponent<RouteComponentProps> {
  onClick = () => {
    const { history } = this.props
    history.push('/me')
  }

  render() {
    return (
      <div>
        <button data-test="login" onClick={this.onClick}>
          login
        </button>
      </div>
    )
  }
}
