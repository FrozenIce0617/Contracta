import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import _ from 'lodash';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { colors } from '../../../styles';

class ContractAlert extends React.Component {
  onPressBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const info = navigation.getParam('item', {});
    
    return (
      <SafeAreaView>
        <View style={[styles.header, styles.row]}>
          <TouchableOpacity onPress={this.onPressBack}>
            <FontAwesome name="angle-left" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.contractName}>
            <Text style={styles.contractText}>{info.name}</Text>
          </View>
        </View>
        <View style={styles.container}>

          <View>
            <View style={styles.borderTop}>
              <Text>Alerts:</Text>
              {info.alerts &&
                info.alerts.items &&
                info.alerts.items.map(al => (
                  <View style={styles.row}>
                    <FontAwesome
                      name="angle-right"
                      size={20}
                      color={colors.navy}
                    />
                    <View style={[styles.center, styles.notification]}>
                      <Text>{al.content}</Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default withNavigation(ContractExpand);
export default ContractAlert;
