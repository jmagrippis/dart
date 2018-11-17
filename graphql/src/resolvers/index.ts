import { findUserByUsername } from './findUserByUsername'

const conversation = (_, { username, interviewerId }) => ({
  id: `conversation-for-${interviewerId}`,
  messages: [
    {
      id: 'abc',
      type: 'text',
      content:
        'Hi! I am the Digital Automated Response Tool for Johnny. How may I help you?',
      sender: {
        username,
        id: username
      }
    }
  ]
})

const addMessage = (_, { content, interviewerId }) => ({
  content,
  id: `message-by-${interviewerId}`,
  type: 'text',
  sender: {
    id: interviewerId
  }
})

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
