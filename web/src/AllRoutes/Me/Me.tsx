import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { Loading } from '../../Loading/Loading'
import { Me } from '../../types'
import { Login } from '../../Login/Login'
import { Logout } from '../../Logout/Logout'
import { Info } from './Info/Info'

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

      return (
        <DocumentTitle title={`DART - ${me.displayName}`}>
          <div>
            <Info {...me} />
            <Logout />
          </div>
        </DocumentTitle>
      )
    }}
  </MeQuery>
)

export default MePage
