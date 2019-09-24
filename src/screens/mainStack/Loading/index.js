import React from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { Auth } from 'aws-amplify';
import { withApollo } from '@apollo/react-hoc';
import { ApolloConsumer } from 'react-apollo';

import { GetUser } from '../../../generated/graphql';

import styles from './styles';

class Loading extends React.Component {
  state = {
    id: '',
  };

  componentDidMount() {
    Auth.currentUserInfo()
      .then(res => {
        console.log('CurrentUserInfo: ', res);
        this.setState({ id: res.username });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { navigation } = this.props;
    const { id } = this.state;

    console.log('CLIENT: ', client);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#808080" />
        </View>
      </SafeAreaView>
    );
  }
}

// export default withApollo(Loading);
export default Loading;
