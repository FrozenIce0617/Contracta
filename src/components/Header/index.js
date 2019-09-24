import React from 'react';
import { View, Text } from 'react-native';
import UserAvatar from 'react-native-user-avatar';

import styles from './styles';

class Header extends React.Component {
  render() {
    const { name, contract } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.avatar}>
          <UserAvatar size="40" name="Jane Doe" color="#fff" textColor="#000" />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            Hi {name}, viewing "{contract}" contract
          </Text>
        </View>
      </View>
    );
  }
}

export default Header;
