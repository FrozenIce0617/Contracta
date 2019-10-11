import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { Avatar, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ListFactSets } from '../../../generated/graphql';
import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';
import { colors } from '../../../styles';

class FactSet extends React.Component {
  render() {
    const { navigation, factSets, loading } = this.props;
    const contractId = navigation.getParam('contractId', '');

    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Fact Sets" {...this.props} />
        <ScrollView>
          <View style={styles.btnAdd}>
            <Button
              title="Add Fact"
              titleStyle={styles.btnAddStyle}
              icon={<Icon name="plus" size={20} color="white" />}
            />
          </View>
          <View style={styles.bodyContainer}>
            {factSets.items.map(factSet => {
              if (factSet.contract && factSet.contract.id) {
                if (contractId !== factSet.contract.id) return;
                return factSet.fact.items.map(item => (
                  <View style={styles.info}>
                    {/* <TextInput style={styles.factName} value={item.factname} /> */}
                    <Text style={styles.factName}>{item.factname}</Text>
                    <TextInput
                      style={styles.factValue}
                      value={item.factfriendlyvalue}
                    />
                  </View>
                ));
              }
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const FactSetWithData = compose(
  graphql(ListFactSets, {
    props: props => {
      console.log('Props: ', props);
      return {
        factSets: props.data.listFactSets,
        loading: props.data.loading,
      };
    },
  }),
)(FactSet);

export default FactSetWithData;
