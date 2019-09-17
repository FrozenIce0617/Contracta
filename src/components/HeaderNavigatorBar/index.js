import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

class HeaderNavigationBar extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 15 }}
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        >
          <Feather name="menu" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HeaderNavigationBar;
