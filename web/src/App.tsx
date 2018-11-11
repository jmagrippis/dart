import React, { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'

import { apolloClient } from './apolloClient'
import { Home } from './Home/Home'
import { Profile } from './Profile/Profile'

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/me" exact component={Profile} />
      </Fragment>
    </BrowserRouter>
  </ApolloProvider>
)
