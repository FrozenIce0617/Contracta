import React from 'react';
import { SafeAreaView } from 'react-native';
import { compose, withApollo } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ChatBot } from 'aws-amplify-react-native';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class Chat extends React.Component {
  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed');
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Chat" {...this.props} />
        <ChatBot
          title="My Bot"
          botName="ScheduleAppointment_devv"
          welcomeMessage="Hi"
          onComplete={this.handleComplete}
          clearOnComplete={false}
        />
      </SafeAreaView>
    );
  }
}

export default compose(
  withApollo,
  withNavigation,
)(Chat);
