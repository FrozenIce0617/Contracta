import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Card, Divider, Button } from 'react-native-elements';

import styles from './styles';

class Privacy extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Card
            title="Terms & Conditions"
            containerStyle={styles.cardContainer}
            titleStyle={styles.title}
          >
            <Text style={styles.content}>
              If you would like to contact us to understand more about this
              Agreement or wish to contact us concerning any matter relating to
              it, you may send an email to info@contracta.com.
            </Text>
            <Text style={styles.content}>
              This document was last updated on September 9, 2019.
            </Text>
            <Text style={styles.link}>Privacy Policy</Text>
            <Text style={styles.link}>Terms of Use</Text>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <Button buttonStyle={styles.accept} title="Accept" />
              <Button buttonStyle={styles.decline} title="Decline" />
            </View>
          </Card>
        </View>
      </SafeAreaView>
    );
  }
}

export default Privacy;
