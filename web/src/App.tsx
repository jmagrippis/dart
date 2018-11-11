import React, { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'

import { apolloClient } from './apolloClient'
import { LazyHome, LazyProfile, LazyUser } from './routes'

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Fragment>
        <Route path="/" exact component={LazyHome} />
        <Route path="/me" exact component={LazyProfile} />
        <Route path="/u/:username" component={LazyUser} />
      </Fragment>
    </BrowserRouter>
  </ApolloProvider>
)
