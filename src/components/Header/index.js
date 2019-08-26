import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import UserAvatar from 'react-native-user-avatar';

import styles from './styles';

class Header extends React.Component {
  render() {
    const { name, contract } = this.props;

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <UserAvatar size="40" name="Jane Doe" color="#000" />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>
              Hi {name}, viewing "{contract}" contract
            </Text>
            <Text style={styles.text}>Next due: $500, LTV: $500</Text>
            <Text style={styles.text}>
              Negotiated Last Date: 25/5/18, version: 2
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Header;
