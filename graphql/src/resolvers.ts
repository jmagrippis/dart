const findUserByUsername = (_, { username }) => ({
  username,
  id: username,
  email: `${username}@example.com`,
  displayName: `${username.charAt(0).toUpperCase()}${username.slice(1)}`
})

const conversation = (_, { username, interviewerId }) => ({
  messages: [
    {
      id: 'abc',
      type: 'text',
      content:
        'Hi! I am the Digital Automated Response system for Johnny. How may I help you?',
      sender: {
        username,
        email: `${username}@example.com`
      }
    }
  ]
})

export const resolvers = {
  Query: {
    findUserByUsername,
    conversation
  },
  Sender: {
    __resolveType(sender) {
      return sender.email ? 'User' : 'AnonymousUser'
    }
  }
}
