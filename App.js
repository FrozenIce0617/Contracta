/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import NavigatorContainer from './src/navigation/NavigatorContainer';
import awsConfig from './aws-exports';

const client = new AWSAppSyncClient({
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    apiKey: awsConfig.aws_appsync_apiKey,
    type: awsConfig.aws_appsync_authenticationType,
  },
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <NavigatorContainer />
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
