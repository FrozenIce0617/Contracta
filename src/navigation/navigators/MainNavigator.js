import { createStackNavigator } from 'react-navigation';

import DrawerNavigator from './DrawerNavigator';
import LoadingScreen from '../../screens/mainStack/Loading';
import PrivacyScreen from '../../screens/mainStack/Privacy';
import MetaContractListScreen from '../../screens/mainStack/MetaContract';
import ContractDetailScreen from '../../screens/mainStack/ContractDetail';
import ContractExpandScreen from '../../screens/mainStack/ContractExpand';
import ContractAlertScreen from '../../screens/mainStack/ContractAlert';
import ContractActionScreen from '../../screens/mainStack/ContractAction';
import ContractCommentScreen from '../../screens/mainStack/ContractComment';
import ProfileScreen from '../../screens/mainStack/Profile';
import EditProfileScreen from '../../screens/mainStack/EditProfile';
import FeedbackScreen from '../../screens/mainStack/Feedback';
import FactSetScreen from '../../screens/mainStack/FactSet';

const MainNavigator = createStackNavigator(
  {
    Drawer: { screen: DrawerNavigator },
    Loading: { screen: LoadingScreen },
    Privacy: { screen: PrivacyScreen },
    MetaContract: { screen: MetaContractListScreen },
    ContractDetail: { screen: ContractDetailScreen },
    ContractExpand: { screen: ContractExpandScreen },
    ContractAlert: { screen: ContractAlertScreen },
    ContractAction: { screen: ContractActionScreen },
    ContractComment: { screen: ContractCommentScreen },
    Profile: { screen: ProfileScreen },
    EditProfile: { screen: EditProfileScreen },
    Feedback: { screen: FeedbackScreen },
    FactSet: { screen: FactSetScreen },
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
  },
);

export default MainNavigator;
