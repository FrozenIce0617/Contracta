import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import Header from '../../../components/Header';
import Notification from '../../../components/Notification';

class ContractDetail extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Header name="Ian" contract="12Eastcote" />
          <Notification />
          <Text>ContractDetails</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default ContractDetail;
