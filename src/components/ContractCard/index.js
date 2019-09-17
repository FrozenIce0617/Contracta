import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { colors } from '../../styles';

class ContractCard extends React.Component {
  render() {
    const { intentOptions, priorityOptions, info, onPressStretch } = this.props;
    console.log('DATA: ', info);

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.row}>
            <View style={styles.category}>
              <Text>INTENT: </Text>
            </View>
            <View style={styles.intent}>
              <Dropdown data={intentOptions} />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <View style={styles.category}>
              <Text style={styles.prioText}>PRIO: </Text>
            </View>
            <View style={styles.intent}>
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
        <View style={styles.borderBottom}>
          <Text>{info.rawtext}</Text>
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          <View style={styles.section}>
            <View style={styles.icon}>
              <FontAwesome name="bell-o" size={30} color="#000" />
            </View>
            <Text style={styles.count}>{info.Stats.alerts}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              <Ionicons name="ios-flash" size={30} color="#000" />
            </View>
            <Text style={styles.count}>{info.Stats.actions}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              <FontAwesome name="comment-o" size={30} color="#000" />
            </View>
            <Text style={styles.count}>{info.Stats.version}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={onPressStretch}>
                <MaterialIcons name="expand-more" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ContractCard;