const user = (_, { id }) => ({
  id,
  email: `${id}@example.com`
})

export const resolvers = {
  Query: {
    user
  }
}
