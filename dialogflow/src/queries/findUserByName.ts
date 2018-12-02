import gql from 'graphql-tag'

import { apolloClient } from '../apolloClient'
import { FindUserByName } from '../types'

const FIND_USER_BY_Name = gql`
  query FindUserByName($givenName: String!, $lastName: String!) {
    findUserByName(givenName: $givenName, lastName: $lastName) {
      id
      displayName
    }
  }
`
export const findUserByName = async ({
  givenName,
  lastName
}: {
  givenName: string
  lastName: string
}) => {
  const result = await apolloClient.query<
    FindUserByName.Query,
    FindUserByName.Variables
  >({
    query: FIND_USER_BY_Name,
    variables: { givenName, lastName }
  })

  return result.data.findUserByName
}
