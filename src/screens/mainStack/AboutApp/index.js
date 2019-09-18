import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class About extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="About App" {...this.props} />
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text>Contracta v0.0.1</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(About);
