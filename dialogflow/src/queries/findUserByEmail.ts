import gql from 'graphql-tag'

import { apolloClient } from '../apolloClient'
import { FindUserByEmail } from '../types'

const FIND_USER_BY_EMAIL = gql`
  query FindUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      id
      displayName
    }
  }
`
export const findUserByEmail = async (email: string) => {
  const result = await apolloClient.query<
    FindUserByEmail.Query,
    FindUserByEmail.Variables
  >({
    query: FIND_USER_BY_EMAIL,
    variables: { email }
  })

  return result.data.findUserByEmail
}
