import ApolloClient from 'apollo-boost'
import store from 'store2'

import { LOCAL_STORAGE_TOKEN_KEY } from './constants'

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  request: async (operation) => {
    const token = store(LOCAL_STORAGE_TOKEN_KEY)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : undefined
      }
    })
  }
})
