import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { colors } from '../../styles';

class ContractCard extends React.Component {
  render() {
    const { intentOptions, priorityOptions, info, onPressStretch } = this.props;
    const borderColor =
      info.priority === 'HIGH'
<<<<<<< HEAD
        ? '#d03030'
        : info.priority === 'MED'
        ? '#803030'
        : '#303030';
=======
        ? '#ff3d00'
        : info.priority === 'MED'
        ? '#BDBDBD'
        : '#90afa3';
>>>>>>> ee2701ca696af86cc99f1f10c99523316b8ad384

    return (
      <View style={{ ...styles.container, borderColor }}>
        {/* <View style={styles.row}>
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
        </View> */}
        <View style={styles.rawText}>
          <Text>{info.rawtext}</Text>
        </View>

        <View style={[styles.row, styles.flexEnd]}>
          {/*
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
          */}
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
