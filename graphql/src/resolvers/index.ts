import { findUserByUsername } from './findUserByUsername'
import { conversation } from './conversation'
import { addMessage } from './addMessage'
import { me } from './me'

export const resolvers = {
  Query: {
    findUserByUsername,
    conversation,
    me
  },
  Mutation: {
    addMessage
  },
  User: {
    __resolveType({ email }) {
      return email ? 'AuthenticatedUser' : 'AnonymousUser'
    }
  }
}
