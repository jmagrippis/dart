import { ApolloServer } from 'apollo-server'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { migrate } from './db/migrate'

export const app = async () => {
  await migrate()

  const engine = process.env.ENGINE_API_KEY
    ? {
        apiKey: process.env.ENGINE_API_KEY
      }
    : undefined

  const apolloOptions = {
    typeDefs,
    resolvers,
    engine,
    introspection: true
  }

  const server = new ApolloServer(apolloOptions)

  const { url } = await server.listen({ port: process.env.PORT })

  console.log(`🚀 Server ready at ${url}`)
}
