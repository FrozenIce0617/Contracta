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
import TimeLineModuleScreen from '../../screens/mainStack/Timeline';
import FeedbackScreen from '../../screens/mainStack/Feedback';
import ProfileScreen from '../../screens/mainStack/Profile';
import AboutScreen from '../../screens/mainStack/AboutApp';
import { scalingUtils } from '../../styles';

const drawerTitles = {
  Home: 'Home',
  TimelineModule: 'Timeline',
  Feedback: 'Feedback',
  Settings: 'Settings',
  About: 'About App',
  Signout: 'Sign out',
};

class DrawerComponent extends React.Component {
  state = {
    loginStatus: 'signIn',
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
                'https://media.licdn.com/dms/image/C5603AQFyP0hSigsLNw/profile-displayphoto-shrink_200_200/0?e=1574899200&v=beta&t=AlM0djBDMmhtsVs5qdUliUmEbQJq-ZwGN_3eMFHwk_o',
            }}
            containerStyle={styles.avatar}
          />
        </ImageBackground>
        <ScrollView>
          <DrawerItems {...this.props} />
          <Divider />
          <Button
            onPress={() => {
              Auth.signOut()
                .then(res => {
                  this.setState({
                    loginStatus: 'signOut',
                  });
                  this.forceUpdate();
                })
                .catch(err => console.log(err));
            }}
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
      screen: TimeLineModuleScreen,
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
    [drawerTitles.Feedback]: {
      screen: FeedbackScreen,
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
      screen: ProfileScreen,
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
