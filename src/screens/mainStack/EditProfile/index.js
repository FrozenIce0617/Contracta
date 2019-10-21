import React from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { Mutation } from 'react-apollo';

import { UpdateUser } from '../../../generated/graphql';
import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class EditProfile extends React.Component {
  state = {
    firstname: '',
    lastname: '',
  };

  onPressBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const { firstname, lastname } = this.state;
    const userInfo = navigation.getParam('userInfo', {});
    const userName = navigation.getParam('userName', {});

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
            <Input
              placeholder="First Name"
              defaultValue={userInfo.firstname}
              onChangeText={text => this.setState({ firstname: text })}
            />
            <Input
              placeholder="Last Name"
              defaultValue={userInfo.lastname}
              onChangeText={text => this.setState({ lastname: text })}
            />
            <Input
              placeholder="Email"
              defaultValue={userInfo.contractaemail}
              disabled
            />
          </View>
          <View style={styles.btnRow}>
            <Button
              buttonStyle={styles.cancel}
              title="Cancel"
              onPress={this.onPressBack}
            />
            <Mutation
              mutation={UpdateUser}
              variables={{
                input: {
                  id: userName,
                  firstname,
                  lastname,
                },
              }}
            >
              {updateUserMutation => (
                <Button
                  buttonStyle={styles.update}
                  title="Update"
                  onPress={() => updateUserMutation}
                />
              )}
            </Mutation>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default EditProfile;
