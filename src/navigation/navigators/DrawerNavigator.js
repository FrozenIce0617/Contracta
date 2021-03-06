import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Auth } from 'aws-amplify';
import { Avatar, Divider, Button } from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MetaContractScreen from '../../screens/mainStack/MetaContract';
import ChatScreen from '../../screens/mainStack/GiftedChat';
import TimeLineModuleScreen from '../../screens/mainStack/Timeline';
import FeedbackScreen from '../../screens/mainStack/Feedback';
import ProfileScreen from '../../screens/mainStack/Profile';
import AboutScreen from '../../screens/mainStack/AboutApp';
import { scalingUtils } from '../../styles';

const drawerTitles = {
  Home: 'Home',
  TimelineModule: 'Timeline',
  Chat: 'Chat',
  Feedback: 'Feedback',
  Settings: 'Settings',
  About: 'About App',
  Signout: 'Sign out',
};

class DrawerComponent extends React.Component {
  state = {
    loginStatus: 'signIn',
  };

  onSignOut = () => {
    const { screenProps } = this.props;
    Auth.signOut()
      .then(() => screenProps.onStateChange('signedOut', null))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ImageBackground
          source={{
            uri:
              'https://backgroundcheckall.com/wp-content/uploads/2018/10/ethics-background-4.jpg',
          }}
          style={styles.backContainer}
        >
          <Avatar
            rounded
            size={120}
            source={{
              uri:
                'https://contractapublicv1.s3-eu-west-1.amazonaws.com/blank-profile-picture.png',
            }}
            containerStyle={styles.avatar}
          />
        </ImageBackground>
        <ScrollView>
          <DrawerItems {...this.props} />
          <Divider />
          <Button
            onPress={this.onSignOut}
            type="clear"
            buttonStyle={{
              margin: 0,
              marginLeft: scalingUtils.scale(14),
              paddingLeft: 0,
              paddingRight: 0,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
            iconContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
            }}
            titleStyle={{
              display: 'flex',
              justifyContent: 'center',
              marginLeft: scalingUtils.scale(34),
              fontSize: scalingUtils.verticalScale(14),
              fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
            icon={
              <SimpleLineIcons
                name="logout"
                size={24}
                color="rgba(0, 0, 0, 0.87)"
              />
            }
            title="Sign Out"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator(
  {
    [drawerTitles.Home]: {
      screen: props => <MetaContractScreen {...props} />,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="home" size={24} style={{ color: tintColor }} />
        ),
      },
    },
    [drawerTitles.TimelineModule]: {
      screen: props => <TimeLineModuleScreen {...props} />,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons
            name="clock"
            size={24}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    [drawerTitles.Chat]: {
      screen: ChatScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons
            name="people"
            size={24}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    [drawerTitles.Feedback]: {
      screen: props => <FeedbackScreen {...props} />,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons
            name="bubble"
            size={24}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    [drawerTitles.Settings]: {
      screen: props => <ProfileScreen {...props} />,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons
            name="settings"
            size={24}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    [drawerTitles.About]: {
      screen: AboutScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="info" size={24} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    contentComponent: DrawerComponent,
  },
);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  backContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default AppDrawerNavigator;
