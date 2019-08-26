import { createStackNavigator } from 'react-navigation';

import ContractDetailScreen from '../../screens/mainStack/ContractDetail';

const AuthNavigator = createStackNavigator(
  {
    ContractDetail: { screen: ContractDetailScreen },
  },
  {
    initialRouteName: 'ContractDetail',
    headerMode: 'none',
  },
);

export default AuthNavigator;
