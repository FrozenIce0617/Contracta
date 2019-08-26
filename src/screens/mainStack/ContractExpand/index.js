import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { colors } from '../../../styles';

class ContractExpand extends React.Component {
  onPressBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const intentOptions = navigation.getParam('intentOptions', {});
    const priorityOptions = navigation.getParam('priorityOptions', {});
    const contractText = navigation.getParam('contractText', '');

    return (
      <SafeAreaView>
        <View style={[styles.header, styles.row]}>
          <TouchableOpacity onPress={this.onPressBack}>
            <FontAwesome name="angle-left" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.contractName}>
            <Text style={styles.contractText}>12Eastcote</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <View style={styles.row}>
                <View style={styles.category}>
                  <Text>INTENT: </Text>
                </View>
                <View style={styles.intent}>
                  <Dropdown data={intentOptions} />
                </View>
                <View style={styles.prio}>
                  <Dropdown
                    data={priorityOptions}
                    baseColor={colors.navy}
                    textColor={colors.navy}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.textCategory}>Content:</Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text>{contractText}</Text>
            </View>
          </View>
          <View>
            <View style={styles.borderTop}>
              <Text>Alerts:</Text>
              <View style={styles.row}>
                <FontAwesome name="angle-right" size={20} color={colors.navy} />
                <View style={[styles.center, styles.notification]}>
                  <Text>Signed to contract</Text>
                </View>
              </View>
              <View style={styles.row}>
                <FontAwesome name="angle-right" size={20} color={colors.navy} />
                <View style={[styles.center, styles.notification]}>
                  <Text>Signed data: 1st day of August</Text>
                </View>
              </View>
            </View>
            <View style={styles.borderTop}>
              <Text>Actions:</Text>
              <View style={styles.row}>
                <FontAwesome name="angle-right" size={20} color={colors.navy} />
                <View style={[styles.center, styles.notification]}>
                  <Text>Signed to contract</Text>
                </View>
              </View>
              <View style={styles.row}>
                <FontAwesome name="angle-right" size={20} color={colors.navy} />
                <View style={[styles.center, styles.notification]}>
                  <Text>Signed data: 1st day of August</Text>
                </View>
              </View>
            </View>
            <View style={styles.borderTop}>
              <Text>Comments:</Text>
              <View style={styles.row}>
                <FontAwesome name="angle-right" size={20} color={colors.navy} />
                <View style={[styles.center, styles.notification]}>
                  <Text>Signed to contract</Text>
                </View>
              </View>
              <View style={styles.row}>
                <FontAwesome name="angle-right" size={20} color={colors.navy} />
                <View style={[styles.center, styles.notification]}>
                  <Text>Signed data: 1st day of August</Text>
                </View>
              </View>
            </View>
            <View style={styles.entities}>
              <Text>Entities:</Text>
              <View style={styles.row}>
                <FontAwesome name="angle-right" size={20} color={colors.navy} />
                <View style={[styles.center, styles.notification]}>
                  <Text>Max Mustermann and Joe Relaxmann</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ContractExpand;
