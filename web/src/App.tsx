import React, { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'
import { WebAuth } from 'auth0-js'
import 'reset-css'

import './resetButton.css'
import './App.css'
import { LazyHome, LazyMe, LazyUser, LazyAuth } from './routes'
import { ApolloClient } from 'apollo-boost'
import { AuthProvider } from './AuthContext'

interface Props {
  apolloClient: ApolloClient<{}>
  auth: WebAuth
}

export const App = ({ apolloClient, auth }: Props) => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider value={auth}>
      <BrowserRouter>
        <Fragment>
          <Route path="/" exact component={LazyHome} />
          <Route path="/me" exact component={LazyMe} />
          <Route path="/u/:username" component={LazyUser} />
          <Route path="/auth" component={LazyAuth} />
        </Fragment>
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
)
