import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { compose, graphql } from 'react-apollo';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { GetUser } from '../../../generated/graphql';
import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class Profile extends React.Component {
  onEditProfile = () => {
    const { navigation, userInfo } = this.props;
    navigation.navigate('EditProfile', {
      userInfo,
    });
  };

  render() {
    const { userInfo } = this.props;
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
                      'https://media.licdn.com/dms/image/C5603AQFyP0hSigsLNw/profile-displayphoto-shrink_200_200/0?e=1574899200&v=beta&t=AlM0djBDMmhtsVs5qdUliUmEbQJq-ZwGN_3eMFHwk_o',
                  }}
                  containerStyle={styles.avatarStyle}
                />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeading}>First Name</Text>
            <Text style={styles.infoContent}>{userInfo.firstname}</Text>
            <Text style={styles.infoHeading}>Last Name</Text>
            <Text style={styles.infoContent}>{userInfo.lastname}</Text>
            <Text style={styles.infoHeading}>Email</Text>
            <Text style={styles.infoContent}>{userInfo.contractaemail}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default compose(
  graphql(GetUser, {
    options: props => {
      const { navigation } = props;
      const userId = navigation.getParam('username', '');
      return {
        variables: {
          id: userId,
        },
      };
    },
    props: props => ({
      userInfo: props.data.getUser ? props.data.getUser : {},
      loading: props.data.loading,
    }),
  }),
)(Profile);
