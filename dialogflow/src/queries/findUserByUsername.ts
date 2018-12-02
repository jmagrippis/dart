import gql from 'graphql-tag'

import { apolloClient } from '../apolloClient'
import { FindUserByUsername } from '../types'

const FIND_USER_BY_Username = gql`
  query FindUserByUsername($username: String!) {
    findUserByUsername(username: $username) {
      id
      displayName
    }
  }
`
export const findUserByUsername = async (username: string) => {
  const result = await apolloClient.query<
    FindUserByUsername.Query,
    FindUserByUsername.Variables
  >({
    query: FIND_USER_BY_Username,
    variables: { username }
  })

  return result.data.findUserByUsername
}
