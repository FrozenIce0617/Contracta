import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { compose, withApollo } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ChatBot } from 'aws-amplify-react-native';
import Amplify, { Interactions } from 'aws-amplify';

import awsConfig from './../../../../aws-exports';
import HeaderBar from '../../../components/HeaderBar';
import { colors, scalingUtils } from '../../../styles';
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
            itemMe: {
              backgroundColor: colors.navy,
              color: colors.white,
              borderRadius: scalingUtils.scale(10),
              fontSize: scalingUtils.scale(16),
            },
            itemBot: {
              backgroundColor: colors.lightgray,
              color: colors.black,
              borderRadius: scalingUtils.scale(10),
              fontSize: scalingUtils.scale(16),
            },
            inputContainer: {
              marginTop: scalingUtils.verticalScale(5),
              borderTopColor: colors.lightgray,
              borderBottomColor: colors.lightgray,
              borderTopWidth: scalingUtils.verticalScale(0.5),
              borderBottomWidth: scalingUtils.verticalScale(0.5),
              padding: scalingUtils.scale(5),
            },
            button: {
              backgroundColor: colors.navy,
            },
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
