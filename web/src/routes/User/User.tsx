import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import DocumentTitle from 'react-document-title'
import { RouteComponentProps } from 'react-router'

import { Loading } from '../../Loading/Loading'

const FIND_USER_BY_USER_NAME = gql`
  query FindUserByUsername($username: String!) {
    findUserByUsername(username: $username) {
      username
      displayName
    }
  }
`

interface Params {
  username: string
}

interface Props extends RouteComponentProps<Params> {}

export const User = ({
  match: {
    params: { username }
  }
}: Props) => (
  <Query query={FIND_USER_BY_USER_NAME} variables={{ username }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />
      if (error) return <div>Error :(</div>

      const {
        findUserByUsername: { displayName }
      } = data

      return (
        <DocumentTitle title={`DART - ${displayName}`}>
          <div>{displayName}</div>
        </DocumentTitle>
      )
    }}
  </Query>
)

export default User
