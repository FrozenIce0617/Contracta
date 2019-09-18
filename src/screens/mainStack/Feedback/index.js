import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Input, Button } from 'react-native-elements';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class Feedback extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Feedback" {...this.props} />
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Input placeholder="What did you like?" />
            <Input placeholder="What did you not like?" />
            <Input placeholder="What would you like to add?" />
          </View>
          <View style={styles.btnRow}>
            <Button buttonStyle={styles.update} title="Send" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(Feedback);
