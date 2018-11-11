const findUserByUsername = (_, { username }) => ({
  username,
  id: username,
  email: `${username}@example.com`,
  displayName: `${username.charAt(0).toUpperCase()}${username.slice(1)}`
})

export const resolvers = {
  Query: {
    findUserByUsername
  }
}
