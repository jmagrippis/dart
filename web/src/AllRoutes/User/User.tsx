import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import DocumentTitle from 'react-document-title'
import { RouteComponentProps } from 'react-router'

import { Conversation } from './Conversation/Conversation'
import { Loading } from '../../Loading/Loading'
import { FindUserByUsername } from '../../types'

class FindUserByUserNameQuery extends Query<
  FindUserByUsername.Query,
  FindUserByUsername.Variables
> {}

const FIND_USER_BY_USER_NAME = gql`
  query FindUserByUsername($username: String!) {
    findUserByUsername(username: $username) {
      id
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
  <FindUserByUserNameQuery
    query={FIND_USER_BY_USER_NAME}
    variables={{ username }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />
      if (error || !data) return <div>Error :(</div>

      const { findUserByUsername } = data

      if (!findUserByUsername) {
        return (
          <div>
            Could not find user <strong>{username}</strong>!
          </div>
        )
      }

      const { displayName, id } = findUserByUsername

      return (
        <DocumentTitle title={`DART - ${displayName}`}>
          <Conversation subjectId={id} />
        </DocumentTitle>
      )
    }}
  </FindUserByUserNameQuery>
)

export default User
