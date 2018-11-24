import React, { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'
import 'reset-css'

import './resetButton.css'
import './App.css'
import { LazyHome, LazyProfile, LazyUser } from './routes'
import { ApolloClient } from 'apollo-boost'

interface Props {
  apolloClient: ApolloClient<{}>
}

export const App = ({ apolloClient }: Props) => (
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
