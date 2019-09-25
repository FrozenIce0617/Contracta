import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import styles from './styles';

class Notification extends React.Component {
  render() {
    const { onPressBell, onPressEmail, onPressFlash, onPressShare, onPressExport, onPressComment  } = this.props;
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
            <Text style={styles.count}>2</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              <Fontisto name="email" size={30} color="#000" />
            </View>
            <Text style={styles.count}>2</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.icon}>
              
              <TouchableOpacity onPress={onPressFlash}>
              <Ionicons name="ios-flash" size={30} color="#000" />
                
              </TouchableOpacity>
            </View>
            <Text style={styles.count}>2</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.section}>
            <View style={styles.icon}>
              <Ionicons name="md-share" size={30} color="#000" />
            </View>
            <Text style={styles.count}>Share</Text>
          </View>
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
            <Text style={styles.count}>5</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Notification;
