import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class Profile extends React.Component {
  onEditProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('EditProfile');
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Profile" {...this.props} />
        <View style={styles.container}>
          <View>
            <ImageBackground
              source={require('../../../assets/images/background.png')}
              style={styles.avatarContainer}
            >
              <View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.btnEdit}
                    onPress={this.onEditProfile}
                  >
                    <FontAwesome name="pencil" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.avatar}>
                <Avatar
                  rounded
                  size={120}
                  source={{
                    uri:
                      'https://media.licdn.com/dms/image/C5603AQFyP0hSigsLNw/profile-displayphoto-shrink_200_200/0?e=1568851200&v=beta&t=0Y5zFoawOp7zEa5yAL1DhqwBAeLuxQFQJvi8hyurnnc',
                  }}
                  containerStyle={styles.avatarStyle}
                />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeading}>First Name</Text>
            <Text style={styles.infoContent}>Sandeep</Text>
            <Text style={styles.infoHeading}>Last Name</Text>
            <Text style={styles.infoContent}>Mehta</Text>
            <Text style={styles.infoHeading}>Email</Text>
            <Text style={styles.infoContent}>Sandeep Mehta</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Profile;
