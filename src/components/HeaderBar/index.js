import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class HeaderBar extends React.Component {
  onPressBack = () => {
    const { navigation } = this.props;
    console.log('Navigation: ', navigation);
    navigation.goBack();
  };

  render() {
    const { heading } = this.props;

    return (
      <View style={[styles.container, styles.row]}>
        <TouchableOpacity onPress={this.onPressBack}>
          <FontAwesome name="angle-left" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{heading}</Text>
        </View>
      </View>
    );
  }
}

export default HeaderBar;
