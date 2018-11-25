import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { Loading } from '../../Loading/Loading'
import { Me } from '../../types'
import { Login } from '../../Login/Login'

class MeQuery extends Query<Me.Query, Me.Variables> {}

const ME = gql`
  query Me {
    me {
      id
      email
      username
      displayName
    }
  }
`

export const MePage = () => (
  <MeQuery query={ME}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />
      if (error || !data) return <div>Error :(</div>

      const { me } = data

      if (!me) {
        return (
          <div>
            <div>You need to login to access your profile!</div>
            <Login />
          </div>
        )
      }

      const { username, email, displayName } = me

      return (
        <DocumentTitle title={`DART - ${username}`}>
          <div>
            <div>
              <div>email:</div>
              <div data-test="email">{email}</div>
            </div>
            <div>
              <div>username:</div>
              <div data-test="username">{username}</div>
            </div>
            <div>
              <div>displayName:</div>
              <div data-test="displayName">{displayName}</div>
            </div>
          </div>
        </DocumentTitle>
      )
    }}
  </MeQuery>
)

export default MePage
