import fetch from 'node-fetch'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    // @ts-ignore
    fetch,
    uri: process.env.GRAPHQL
  }),
  cache: new InMemoryCache()
})
