import React from 'react'
import { ApolloProvider } from 'react-apollo'

import { apolloClient } from './apolloClient'

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <div>Test deploy please ignore</div>
  </ApolloProvider>
)
