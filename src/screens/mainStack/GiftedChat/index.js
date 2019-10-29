import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { compose, withApollo } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import { ChatBot } from 'aws-amplify-react-native';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

const lexRunTime = new AWS.LexRuntime();

class Chat extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  // showRequest = inputText => {
  //   // Add text input to messages in state
  //   this.setState(prevState => ({
  //     messages: GiftedChat.append(prevState.messages, messages),
  //   }));
  //   this.sendToLex(inputText);
  // };

  // handleTextSubmit = message => {
  //   const inputText = message.trim();
  //   if (inputText !== '') this.showRequest(inputText);
  // };

  // sendToLex = message => {
  //   const params = {
  //     botAlias: '$LATEST',
  //     botName: 'Your-Bot-Name',
  //     inputText: message,
  //     userId: lexUserId,
  //   };
  //   lexRunTime.postText(params, (err, data) => {
  //     if (err) {
  //       // TODO SHOW ERROR ON MESSAGES
  //     }
  //     if (data) {
  //       this.showResponse(data);
  //     }
  //   });
  // };

  // showResponse = lexResponse => {
  //   const lexMessage = lexResponse.message;
  //   this.setState(prevState => ({
  //     messages: GiftedChat.append(prevState.messages, lexMessage),
  //   }));
  // };

  onSend = (messages = []) => {
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
  };

  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed');
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }

  render() {
    const { messages } = this.state;

    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Chat" {...this.props} />
        {/* <GiftedChat
          messages={messages}
          onSend={messages => this.onSend(messages)}
          renderActions={this.renderActions}
          alwaysShowSend
          user={{
            _id: 1,
          }}
        /> */}
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
