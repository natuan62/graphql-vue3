import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

const useGraphqlQuery = (query: any, variables: unknown = {}) => {
  return new Promise((resolve, reject) => {
    const httpLink = createHttpLink({
      uri: 'http://localhost:3000/graphql',
    });
    const cache = new InMemoryCache();
    const apolloClient = new ApolloClient({
      link: httpLink,
      cache,
    });
    apolloClient.query({
      query,
      variables,
    }).then(({ data }) => {
      resolve(data);
    }).catch(error => {
      reject(error);
    })
  });
}

const useGraphqlMutation = (mutation: any, variables: unknown = {}) => {
  return new Promise((resolve, reject) => {
    const httpLink = createHttpLink({
      uri: 'http://localhost:3000/graphql',
    });
    const cache = new InMemoryCache();
    const apolloClient = new ApolloClient({
      link: httpLink,
      cache,
    });
    apolloClient.mutate({
      mutation,
      variables,
    }).then(({ data }) => {
      resolve(data);
    }).catch(error => {
      reject(error);
    })
  });
}

export { useGraphqlQuery, useGraphqlMutation };