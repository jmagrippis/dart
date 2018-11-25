import ApolloClient from 'apollo-boost'
import store from 'store2'

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  request: async (operation) => {
    const token = store('token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  }
})
