import React from 'react';
import { SafeAreaView } from 'react-native';
import { compose, withApollo } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

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

  onSend(messages = []) {
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
  }

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
