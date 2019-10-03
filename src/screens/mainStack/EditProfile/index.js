import React from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';

import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class EditProfile extends React.Component {
  render() {
    const { navigation } = this.props;
    const userInfo = navigation.getParam('userInfo', {});

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
                      'https://www.digitalelement.com/wp-content/uploads/2016/07/Shake-On-It-32049935-DE-Blog-440x293.jpg',
                  }}
                  containerStyle={styles.avatarStyle}
                  showEditButton
                />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <Input placeholder="First Name" defaultValue={userInfo.firstname} />
            <Input placeholder="Last Name" defaultValue={userInfo.lastname} />
            <Input placeholder="Email" defaultValue={userInfo.contractaemail} />
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
