import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import { colors } from '../../styles';
import { Button } from 'react-native-elements';

class Notification extends React.Component {
  state = {
    sortOrder: 1,
  };

  render() {
    const {
      onPressBell,
      onPressFlash,
      onPressComment,
      onPressFact,
      onChangeFilter,
      onChangeOrder,
      onChangeSortType,
    } = this.props;
    const { sortOrder } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.section}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={onPressBell}>
                <FontAwesome name="bell-o" size={30} color="#000" />
                {/*<MaterialIcons name="expand-more" size={30} color="#000" />*/}
              </TouchableOpacity>
            </View>
            {/*<Text style={styles.count}>2</Text>*/}
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              <Fontisto name="email" size={30} color="#000" />
            </View>
             {/*<Text style={styles.count}>2</Text>*/}
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={onPressFlash}>
                <Ionicons name="ios-flash" size={30} color="#000" />
              </TouchableOpacity>
            </View>
             {/*<Text style={styles.count}>2</Text>*/}
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={onPressFact}>
            <View style={styles.section}>
              <View style={styles.icon}>
                <SimpleLineIcons name="info" size={30} color="#000" />
              </View>
              <Text style={styles.count}>Facts</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.section}>
            <View style={styles.icon}>
              <Feather name="share" size={30} color="#000" />
            </View>
            <Text style={styles.count}>Export</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={onPressComment}>
                <FontAwesome name="comment-o" size={30} color="#000" />
              </TouchableOpacity>
            </View>
             {/*<Text style={styles.count}>2</Text>*/}
          </View>
        </View>
        <View style={[styles.row, styles.filterContainer]}>
          <View style={styles.category}>
            <View style={styles.filterType}>
              <Dropdown
                data={[{ value: 'Priority' }, { value: 'Sequence' }]}
                baseColor={colors.navy}
                value="Priority"
                onChangeText={sortType => onChangeSortType(sortType)}
              />
            </View>
            <View style={styles.sortOrder}>
              <Button
                icon={
                  <AntIcon
                    name={sortOrder === 1 ? 'arrowup' : 'arrowdown'}
                    size={15}
                    color="white"
                  />
                }
                onPress={() => {
                  onChangeOrder(-1 * sortOrder);
                  this.setState({ sortOrder: -1 * sortOrder });
                }}
              />
            </View>
          </View>
          <View style={styles.filterDir}>
            <Dropdown
              data={[
                { value: 'ALL' },
                { value: 'HIGH' },
                { value: 'MED' },
                { value: 'LOW' },
              ]}
              baseColor={colors.navy}
              value="ALL"
              onChangeText={text => onChangeFilter(text)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Notification;
