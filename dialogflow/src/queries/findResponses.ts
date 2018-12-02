import gql from 'graphql-tag'

import { apolloClient } from '../apolloClient'
import { FindResponses } from '../types'

const FIND_RESPONSES = gql`
  query FindResponses(
    $userId: String!
    $topicId: String!
    $parentResponseId: String
  ) {
    findResponses(
      userId: $userId
      topicId: $topicId
      parentResponseId: $parentResponseId
    ) {
      id
      name
      topic {
        id
      }
      ... on LeafResponse {
        content
      }
    }
  }
`
export const findResponses = async (variables: FindResponses.Variables) => {
  const result = await apolloClient.query<
    FindResponses.Query,
    FindResponses.Variables
  >({
    variables,
    query: FIND_RESPONSES
  })

  return result.data.findResponses
}
