import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';

import Header from '../../../components/Header';
import Notification from '../../../components/Notification';
import ContractCard from '../../../components/ContractCard';

import styles from './styles';

const intentOptions = [{ label: 'Agreement Details' }];
const priorityOptions = [
  {
    label: 'HIGH',
  },
  {
    label: 'MED',
  },
  {
    label: 'LOW',
  },
];
const contractText =
  "THIS AGREEMENT made this 1st Day of August, 2019, by and between Mr. Max Mustermann, herein called 'Landlord', and Mr. Joe Relaxmann, herein called 'Tenant'. Landlord hereby agress to rent to Tenant the dwelling located at 12 Eastcote Road, HAS 15D Pinner, England under the following terms and conditions.";

class ContractDetail extends React.Component {
  onPressStretch = (intentOptions, priorityOptions, contractText) => {
    const { navigation } = this.props;
    navigation.navigate('ContractExpand', {
      intentOptions,
      priorityOptions,
      contractText,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header name="Ian" contract="12Eastcote" />
        <Notification />
        <ScrollView>
          {[...Array(10)].map((item, index) => (
            <ContractCard
              key={index}
              intentOptions={intentOptions}
              priorityOptions={priorityOptions}
              contractText={contractText}
              onPressStretch={() =>
                this.onPressStretch(
                  intentOptions,
                  priorityOptions,
                  contractText,
                )
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ContractDetail;
