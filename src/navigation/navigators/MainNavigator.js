import { createStackNavigator } from 'react-navigation';

import ContractDetailScreen from '../../screens/mainStack/ContractDetail';
import ContractExpandScreen from '../../screens/mainStack/ContractExpand';

const MainNavigator = createStackNavigator(
  {
    ContractDetail: { screen: ContractDetailScreen },
    ContractExpand: { screen: ContractExpandScreen },
  },
  {
    initialRouteName: 'ContractDetail',
    headerMode: 'none',
  },
);

export default MainNavigator;
