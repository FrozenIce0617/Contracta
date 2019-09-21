import React from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { Auth } from 'aws-amplify';
import { Query } from 'react-apollo';

import { GetUser } from '../../../generated/graphql';

import styles from './styles';

class Loading extends React.Component {
  state = {
    id: '',
  };

  componentWillMount() {
    Auth.currentUserInfo()
      .then(res => {
        this.setState(id, res.username);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { navigation } = this.props;
    const { id } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Query query={GetUser} variables={{ id }}>
            {({ loading, error, data }) => {
              console.log('HERE: ', data);
              if (loading || error)
                return <ActivityIndicator size="large" color="#808080" />;

              if (!data.getUser.isTermsAndPrivacyAgreed) {
                navigation.navigate('Privacy');
              } else {
                navigation.navigate('ContractDetail');
              }
            }}
          </Query>
        </View>
      </SafeAreaView>
    );
  }
}

export default Loading;
