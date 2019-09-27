import React from 'react';

import AppContainer from './AppNavigator';

const NavigatorContainer = props => {
  return (
    <AppContainer
      ref={nav => {
        this.navigator = nav;
      }}
      screenProps={{ onStateChange: props.onStateChange }}
    />
  );
};

export default NavigatorContainer;
