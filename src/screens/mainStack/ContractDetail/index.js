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
  state = {
    // SortOrder: 1 - ASC, -1 - DESC
    sortOrder: 1,
    // FilterType: 0 - ALL, 1 - HIGH, 2 - MED, 3 - LOW
    filterType: 'ALL',
    // SortType: 0 - Priority, 1 - Seq
    sortType: 0,
  };

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

  onPressFact = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item', { name: '', id: '' });
    const subContractId =
      item.contracts &&
      item.contracts.items.length > 0 &&
      item.contracts.items[0].id;

    navigation.navigate('FactSet', {
      contractId: subContractId ? subContractId : '',
      contractName: item.name,
    });
  };

  onChangeFilter = text => {
    this.setState({ filterType: text });
  };

  onChangeOrder = sortOrder => {
    this.setState({ sortOrder });
  };

  onChangeSortType = sortType => {
    if (sortType === 'Priority') this.setState({ sortType: 0 });
    else if (sortType === 'Sequence') this.setState({ sortType: 1 });
  };

  render() {
    const { navigation, contract, loading } = this.props;
    const { sortType, sortOrder, filterType } = this.state;
    const item = navigation.getParam('item', { name: '', id: '' });
    const prio = ['LOW', 'MED', 'HIGH'];

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
          onPressFact={() => this.onPressFact()}
          onChangeFilter={text => this.onChangeFilter(text)}
          onChangeOrder={sortOrder => this.onChangeOrder(sortOrder)}
          onChangeSortType={sortType => this.onChangeSortType(sortType)}
        />
        <ScrollView>
          {Object.keys(contract).length !== 0 ? (
            contract.bodytext.items
              .filter(item => {
                if (filterType === 'ALL') return item;
                else if (item.priority === filterType) return item;
                return;
              })
              .sort((a, b) => {
                if (sortType !== 1) return 0;
                return (a.seqnr - b.seqnr) * sortOrder;
              })
              .sort((a, b) => {
                if (sortType !== 0) return 0;
                return (
                  sortOrder *
                  (prio.indexOf(a.priority) - prio.indexOf(b.priority))
                );
              })
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
        fetchPolicy: 'network-only',
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
