import { findUserByUsername } from './findUserByUsername'
import { conversation } from './conversation'
import { addMessage } from './addMessage'

export const resolvers = {
  Query: {
    findUserByUsername,
    conversation
  },
  Mutation: {
    addMessage
  },
  User: {
    __resolveType({ username }) {
      return username ? 'AuthenticatedUser' : 'AnonymousUser'
    }
  }
}
