import React from 'react';
import { SafeAreaView } from 'react-native';
import { compose, withApollo } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

const lexRunTime = new AWS.LexRuntime();
const lexUserId = 'mediumBot' + Date.now();

class Feedback extends React.Component {
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

  showRequest = inputText => {
    // Add text input to messages in state
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
    this.sendToLex(inputText);
  };

  handleTextSubmit = message => {
    const inputText = message.trim();
    if (inputText !== '') this.showRequest(inputText);
  };

  sendToLex = message => {
    const params = {
      botAlias: '$LATEST',
      botName: 'Your-Bot-Name',
      inputText: message,
      userId: lexUserId,
    };
    lexRunTime.postText(params, (err, data) => {
      if (err) {
        // TODO SHOW ERROR ON MESSAGES
      }
      if (data) {
        this.showResponse(data);
      }
    });
  };

  showResponse = lexResponse => {
    const lexMessage = lexResponse.message;
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, lexMessage),
    }));
  };

  onSend = (messages = []) => {
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
  };

  render() {
    const { messages } = this.state;

    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Chat" {...this.props} />
        <GiftedChat
          messages={messages}
          onSend={messages => this.onSend(messages)}
          renderActions={this.renderActions}
          alwaysShowSend
          user={{
            _id: 1,
          }}
        />
      </SafeAreaView>
    );
  }
}

export default compose(
  withApollo,
  withNavigation,
)(Feedback);
