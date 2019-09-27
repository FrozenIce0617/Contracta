import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './navigators/AuthNavigator';
import MainNavigator from './navigators/MainNavigator';
import DrawerNavigator from './navigators/DrawerNavigator';

const AppNavigator = createSwitchNavigator(
  {
    auth: AuthNavigator,
    drawer: screenProps => <DrawerNavigator screenProps={screenProps} />,
    main: MainNavigator,
  },
  {
    initialRouteName: 'main',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
