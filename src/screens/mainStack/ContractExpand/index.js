import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import _ from 'lodash';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { colors } from '../../../styles';

class ContractExpand extends React.Component {
  onPressBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const info = navigation.getParam('item', {});
    const intentOptions = navigation.getParam('intentOptions', []);
    const priorityOptions = navigation.getParam('priorityOptions', []);

    return (
      <SafeAreaView>
        <View style={[styles.header, styles.row]}>
          <TouchableOpacity onPress={this.onPressBack}>
            <FontAwesome name="angle-left" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.contractName}>
            <Text style={styles.contractText}>{info.title}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <View style={styles.row}>
                {/*
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
                </View>*/}
              </View>
            </View>
            <View>
              <Text>{info.rawtext}</Text>
            </View>
          </View>
          <View>
            <View style={styles.borderTop}>
              <Text>Comments:</Text>
              {info.comments &&
                info.comments.items &&
                info.comments.items.map(comment => (
                  <View style={styles.row}>
                    <FontAwesome
                      name="angle-right"
                      size={20}
                      color={colors.navy}
                    />
                    <View style={[styles.center, styles.notification]}>
                      <Text>{comment.content}</Text>
                    </View>
                  </View>
                ))}
            </View>
            <View style={styles.borderTop}>
              <Text>Alerts:</Text>
              {info.alert &&
                info.alert.items.map(al => (
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
            <View style={styles.borderBoth}>
              <Text>Actions:</Text>
              {info.action &&
                info.action.items.map(action => (
                  <View style={styles.row}>
                    <FontAwesome
                      name="angle-right"
                      size={20}
                      color={colors.navy}
                    />
                    <View style={[styles.center, styles.notification]}>
                      <Text>{action.content}</Text>
                    </View>
                  </View>
                ))}
            </View>
            {/* <View style={styles.entities}>
                  <Text>Entities:</Text>
                  <View style={styles.row}>
                    <FontAwesome
                      name="angle-right"
                      size={20}
                      color={colors.navy}
                    />
                    <View style={[styles.center, styles.notification]}>
                      <Text>Max Mustermann and Joe Relaxmann</Text>
                    </View>
                  </View>
                </View> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default withNavigation(ContractExpand);
export default ContractExpand;
