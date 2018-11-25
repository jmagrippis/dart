import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'
import { WebAuth } from 'auth0-js'
import { ApolloClient } from 'apollo-boost'
import 'reset-css'

import './resetButton.css'
import './App.css'
import { AuthProvider } from './AuthContext'
import AllRoutes from './AllRoutes/AllRoutes'

interface Props {
  apolloClient: ApolloClient<{}>
  auth: WebAuth
}

export const App = ({ apolloClient, auth }: Props) => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider value={auth}>
      <BrowserRouter>
        <Route path="/" component={AllRoutes} />
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
)
