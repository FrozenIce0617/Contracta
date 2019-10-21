import React from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { Auth } from 'aws-amplify';
import { withApollo } from '@apollo/react-hoc';
import { ApolloConsumer } from 'react-apollo';

import styles from './styles';

class Loading extends React.Component {
  componentDidMount() {
    Auth.currentUserInfo()
      .then(res => {
        this.props.navigation.navigate('Drawer', {
          username: res.username,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#808080" />
        </View>
      </SafeAreaView>
    );
  }
}

export default Loading;
