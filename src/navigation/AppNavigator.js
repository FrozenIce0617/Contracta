import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './navigators/AuthNavigator';
import MainNavigator from './navigators/MainNavigator';

const AppNavigator = createSwitchNavigator(
  {
    auth: AuthNavigator,
    main: MainNavigator,
  },
  {
    initialRouteName: 'main',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
