import React from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class EditProfile extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Edit Profile" {...this.props} />
        <View style={styles.container}>
          <View>
            <ImageBackground
              source={require('../../../assets/images/background.png')}
              style={styles.avatarContainer}
            >
              <View style={styles.avatar}>
                <Avatar
                  rounded
                  size={120}
                  source={{
                    uri:
                      'https://media.licdn.com/dms/image/C5603AQFyP0hSigsLNw/profile-displayphoto-shrink_200_200/0?e=1568851200&v=beta&t=0Y5zFoawOp7zEa5yAL1DhqwBAeLuxQFQJvi8hyurnnc',
                  }}
                  containerStyle={styles.avatarStyle}
                  showEditButton
                />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Email" />
          </View>
          <View style={styles.btnRow}>
            <Button buttonStyle={styles.cancel} title="Cancel" />
            <Button buttonStyle={styles.update} title="Update" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default EditProfile;
