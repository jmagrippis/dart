import { ApolloServer } from 'apollo-server'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { context } from './context'
;(async () => {
  const engine = process.env.ENGINE_API_KEY
    ? {
        apiKey: process.env.ENGINE_API_KEY
      }
    : undefined

  const apolloOptions = {
    typeDefs,
    resolvers,
    engine,
    context,
    introspection: true
  }

  const server = new ApolloServer(apolloOptions)

  const { url } = await server.listen({ port: process.env.PORT })

  console.log(`🚀 Server ready at ${url}`)
})()
