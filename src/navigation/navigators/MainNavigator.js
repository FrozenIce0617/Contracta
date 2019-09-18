import { createStackNavigator } from 'react-navigation';

import DrawerNavigator from './DrawerNavigator';
import LoadingScreen from '../../screens/mainStack/Loading';
import PrivacyScreen from '../../screens/mainStack/Privacy';
import ContractDetailScreen from '../../screens/mainStack/ContractDetail';
import ContractExpandScreen from '../../screens/mainStack/ContractExpand';
import ProfileScreen from '../../screens/mainStack/Profile';
import EditProfileScreen from '../../screens/mainStack/EditProfile';
import FeedbackScreen from '../../screens/mainStack/Feedback';

const MainNavigator = createStackNavigator(
  {
    Drawer: { screen: DrawerNavigator },
    Loading: { screen: LoadingScreen },
    Privacy: { screen: PrivacyScreen },
    ContractDetail: { screen: ContractDetailScreen },
    ContractExpand: { screen: ContractExpandScreen },
    Profile: { screen: ProfileScreen },
    EditProfile: { screen: EditProfileScreen },
    Feedback: { screen: FeedbackScreen },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  },
);

export default MainNavigator;
