import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './app.global.css';

// Graphql
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import { AUTH_TOKEN, GRAPHQL_URL } from './constants/communication';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false })
});

render(
  <AppContainer>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AppContainer>,
  document.getElementById('root')
);
