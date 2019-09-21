import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { compose, graphql, withApollo } from 'react-apollo';

import HeaderBar from '../../../components/HeaderBar';
import Notification from '../../../components/Notification';
import ContractCard from '../../../components/ContractCard';
import { GetContractDocument } from '../../../generated/graphql';

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
    const { navigation, contract, loading } = this.props;
    const item = navigation.getParam('item', { name: '', id: '' });

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
        <HeaderBar heading={item.name} {...this.props} />
        <Notification />
        <ScrollView>
          {Object.keys(contract).length !== 0 ? (
            // contract.bodytext.items
            //   .sort((a, b) => a.seqnr - b.seqnr)
            //   .map((bt, i) => (
            <ContractCard
              info={contract}
              intentOptions={intentOptions}
              priorityOptions={priorityOptions}
              onPressStretch={() => this.onPressStretch(bt)}
            />
          ) : (
            // ))
            <SafeAreaView>
              <View style={styles.center}>
                <Text>No contract</Text>
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
    options: props => {
      const { navigation } = props;
      const item = navigation.getParam('item', { name: '', id: '' });
      const subContractId =
        item.contracts &&
        item.contracts.items.length > 0 &&
        item.contracts.items[0].id;

      return {
        variables: {
          id: subContractId,
        },
      };
    },
    props: props => {
      console.log('DATA: ', props.data.getContract);
      return {
        contract: props.data.getContract ? props.data.getContract : [],
        loading: props.data.loading,
      };
    },
  }),
)(ContractDetail);

export default ContractDetailWithData;
