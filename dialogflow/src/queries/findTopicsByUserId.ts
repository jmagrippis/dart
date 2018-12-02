import gql from 'graphql-tag'

import { apolloClient } from '../apolloClient'
import { FindTopicsByUserId } from '../types'

const FIND_TOPICS_BY_USER_ID = gql`
  query FindTopicsByUserId($userId: String!) {
    findTopicsByUserId(userId: $userId) {
      id
      name
    }
  }
`
export const findTopicsByUserId = async (userId: string) => {
  const result = await apolloClient.query<
    FindTopicsByUserId.Query,
    FindTopicsByUserId.Variables
  >({
    query: FIND_TOPICS_BY_USER_ID,
    variables: { userId }
  })

  return result.data.findTopicsByUserId
}
