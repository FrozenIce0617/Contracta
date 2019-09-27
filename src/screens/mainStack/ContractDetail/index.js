import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { compose, graphql } from 'react-apollo';

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
//Todo: implement onPressBell, onPressEmail, onPressFlash, onPressShare, onPressExport, onPressComment
class ContractDetail extends React.Component {
  onPressBell = item => {
    const { navigation } = this.props;
    navigation.navigate('ContractAlert', {
      item,
    });
  };

  onPressFlash = item => {
    const { navigation } = this.props;
    navigation.navigate('ContractAction', {
      item,
    });
  };

  onPressComment = item => {
    const { navigation } = this.props;
    navigation.navigate('ContractComment', {
      item,
    });
  };

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
        <Notification
          onPressBell={() => this.onPressBell(contract)}
          onPressFlash={() => this.onPressFlash(contract)}
          onPressComment={() => this.onPressComment(contract)}
        />
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
      return {
        contract: props.data.getContract ? props.data.getContract : [],
        loading: props.data.loading,
      };
    },
  }),
)(ContractDetail);

export default ContractDetailWithData;
