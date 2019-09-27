/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';

import NavigatorContainer from './src/navigation/NavigatorContainer';
import awsConfig from './aws-exports';

Amplify.configure({
  ...awsConfig,
  Analytics: {
    disabled: true,
  },
});

type Props = {};
class App extends Component<Props> {
  render() {
    const { authData, onStateChange } = this.props;
    console.log(authData.signInUserSession.idToken.jwtToken);
    const client = new AWSAppSyncClient({
      url: awsConfig.aws_appsync_graphqlEndpoint,
      region: awsConfig.aws_appsync_region,
      auth: {
        type: awsConfig.aws_appsync_authenticationType,
        jwtToken: authData.signInUserSession.idToken.jwtToken,
      },
    });

    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <NavigatorContainer onStateChange={onStateChange} />
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: false });
// export default App;
