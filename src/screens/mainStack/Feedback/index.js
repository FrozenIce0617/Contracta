import React from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { compose, withApollo } from 'react-apollo';
import { Analytics } from 'aws-amplify';
import { withNavigation } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import uuidv4 from 'uuid/v4';

import { CreateFeedback } from '../../../generated/graphql';
import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class Feedback extends React.Component {
  state = {
    like: '',
    notlike: '',
    add: '',
  };

  onCreateFeedback = () => {
    const { client, navigation } = this.props;
    const userId = navigation.getParam('username', '');
    const { like, notlike, add } = this.state;
    if (like === '' && notlike === '' && add === '') return;
    client
      .mutate({
        mutation: CreateFeedback,
        variables: {
          input: {
            id: uuidv4(),
            like,
            notlike,
            add,
            feedbackUserownerId: userId,
          },
        },
        fetchPolich: 'no-cache',
      })
      .then(() => {
        Analytics.record({
          name: 'Create Feedback Event',
          attributes: { id: userId },
        })
          .then(res => console.log('Analytics Success: ', res))
          .catch(err => console.log('Analytics Error: ', err));
        Alert.alert('Success', 'Successfully created Feedback', [
          { text: 'OK' },
        ]);
      })
      .catch(() =>
        Alert.alert('Fail', 'Creating Feedback failed', [{ text: 'OK' }]),
      );
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Feedback" {...this.props} />
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Input
              onChangeText={text => this.setState({ like: text })}
              placeholder="What did you like?"
              onch
            />
            <Input
              onChangeText={text => this.setState({ notlike: text })}
              placeholder="What did you not like?"
            />
            <Input
              onChangeText={text => this.setState({ add: text })}
              placeholder="What would you like to add?"
            />
          </View>
          <View style={styles.btnRow}>
            <Button
              title="Send"
              buttonStyle={styles.update}
              onPress={this.onCreateFeedback}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default compose(
  withApollo,
  withNavigation,
)(Feedback);
