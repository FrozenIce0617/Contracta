import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { compose, withApollo } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ChatBot } from 'aws-amplify-react-native';
import Amplify, { Interactions } from 'aws-amplify';

import awsConfig from './../../../../aws-exports';
import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

Amplify.configure({
  ...awsConfig,
  Analytics: {
    disabled: false,
    AWSPinpoint: {
      appId: awsConfig.aws_mobile_analytics_app_id,
      region: awsConfig.aws_mobile_analytics_app_region,
    },
  },
});

class Chat extends React.Component {
  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed');
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Appointment Schedules';
  }

  render() {
    let userInput = 'I want to Schedule an appointment';
    const response = Interactions.send('ScheduleAppointment_devv', userInput);
    console.log('ScheduleAppointment_devv: ', response.message);

    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Chat" {...this.props} />
        <ChatBot
          title="My Bot"
          botName="ScheduleAppointment_devv"
          welcomeMessage="Hi"
          onComplete={this.handleComplete}
          clearOnComplete={false}
          styles={StyleSheet.create({
            itemMe: styles.itemMe,
            itemBot: styles.itemBot,
            inputContainer: styles.inputContainer,
            button: styles.button,
          })}
        />
      </SafeAreaView>
    );
  }
}

export default compose(
  withApollo,
  withNavigation,
)(Chat);
