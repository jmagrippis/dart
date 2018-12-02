import { findUserByEmail } from './findUserByEmail'
import { findUserByName } from './findUserByName'
import { findUserByUsername } from './findUserByUsername'
import { me } from './me'
import { findTopicsByUserId } from './findTopicsByUserId'
import { findResponses } from './findResponses'
import { response } from './response'
import { conversation } from './conversation'

import { addMessage } from './addMessage'

export const resolvers = {
  Query: {
    findUserByEmail,
    findUserByName,
    findUserByUsername,
    me,

    findTopicsByUserId,

    findResponses,
    response,

    conversation
  },
  Mutation: {
    addMessage
  },
  User: {
    __resolveType({ email }) {
      return email ? 'AuthenticatedUser' : 'AnonymousUser'
    }
  },
  Response: {
    __resolveType({ responses }) {
      return responses ? 'ParentResponse' : 'LeafResponse'
    }
  }
}
