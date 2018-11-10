import ApolloClient from 'apollo-boost'

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  request: async operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})
