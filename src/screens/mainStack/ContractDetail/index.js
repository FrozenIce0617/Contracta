import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { compose, graphql, withApollo } from 'react-apollo';

import { GetContractDocument } from '../../../generated/graphql';

import HeaderNavigatorBar from '../../../components/HeaderNavigatorBar';
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

class ContractDetail extends React.Component {
  onPressStretch = item => {
    const { navigation } = this.props;
    navigation.navigate('ContractExpand', {
      item,
      intentOptions,
      priorityOptions,
    });
  };

  render() {
    const { contract, loading } = this.props;

    if (loading === true) {
      return (
        <SafeAreaView>
          <View style={styles.center}>
            <Text>Loading...</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <HeaderNavigatorBar {...this.props} />
        <Header name="Ian" contract="12Eastcote" />
        <Notification />
        <ScrollView>
          {Object.keys(contract).length !== 0 ? (
            contract.bodytext.items
              .sort((a, b) => a.seqnr - b.seqnr)
              .map((bt, i) => (
                <ContractCard
                  key={i}
                  info={bt}
                  intentOptions={intentOptions}
                  priorityOptions={priorityOptions}
                  onPressStretch={() => this.onPressStretch(bt)}
                />
              ))
          ) : (
            <SafeAreaView>
              <View style={styles.center}>
                <Text>Loading...</Text>
              </View>
            </SafeAreaView>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const ContractDetailWithData = compose(
  graphql(GetContractDocument, {
    options: () => ({
      variables: {
        id: '3f04dea8-a4f2-45b2-93bd-e036a0ed1648',
      },
    }),
    props: props => {
      console.log('DATA: ', props.data);
      return {
        contract: props.data.getContract ? props.data.getContract : [],
      };
    },
  }),
)(ContractDetail);

export default ContractDetailWithData;
