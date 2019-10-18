import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { compose, graphql, withApollo, Mutation } from 'react-apollo';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuidv4 from 'uuid/v4';

import {
  ListFactSets,
  CreateFactSet,
  CreateFactObj,
  DeleteFactObj,
} from '../../../generated/graphql';
import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';
import { colors } from '../../../styles';

class FactSet extends React.Component {
  state = {
    modalVisible: false,
    factName: '',
    factValue: '',
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  deleteFact = (factIdToDelete) => {
    const { client, navigation } = this.props;
    client
    .mutate({
      mutation: DeleteFactObj,
      variables: {
        input: {
          id: factIdToDelete,
        },
      },
      fetchPolicy: 'no-cache',
    })
    .then(res => {
      console.log('RES: ', res.data);
    })
    .catch(err => console.log('Err: ', err));

 
  }

  createFactSet = () => {
    const { client, navigation } = this.props;
    const { factName, factValue } = this.state;
    const contractId = navigation.getParam('contractId', '');
    const contractName = navigation.getParam('contractName', '');

    client
      .mutate({
        mutation: CreateFactSet,
        variables: {
          input: {
            id: uuidv4(),
            factsetname: `Fact_${contractName}`,
            factsetdomain: 'Tenancy',
            factsetdoctype: 'assuredshorthold',
            factsettemplatecode: 'tenancy_ash',
            factSetContractId: contractId,
          },
        },
        fetchPolicy: 'no-cache',
      })
      .then(res => {
        console.log('RES: ', res.data);
        client
          .mutate({
            mutation: CreateFactObj,
            variables: {
              input: {
                id: uuidv4(),
                factname: factName,
                derivedfrom: 'UserInput',
                factfriendlyvalue: factValue,
                factjson: `{${factName}:${factValue}}`,
                isEnabled: true,
                factObjFsId: res.data.createFactSet.id,
              },
            },
          })
          .then(() => {
            this.setState({ factName: '', factValue: '' });
            console.log('Success');
          })
          .catch(() => console.log('Failed'));
      })
      .catch(err => console.log('Err: ', err));
  };

  render() {
    const { navigation, factSets, loading } = this.props;
    const { modalVisible, factName, factValue } = this.state;
    const contractId = navigation.getParam('contractId', '');
    const factObjId =
      (factSets && factSets.factset && factSets.factset.id) || '';

    return (
      <SafeAreaView style={styles.safeContainer}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Card
              title="Add new Fact"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardContainer}
            >
              <Text style={styles.modalCategory}>Fact name:</Text>
              <TextInput
                style={styles.modalInput}
                editable
                maxLength={50}
                onChangeText={text => this.setState({ factName: text })}
              />
              <Text style={styles.modalCategory}>Fact value:</Text>
              <TextInput
                style={styles.modalInput}
                editable
                maxLength={50}
                onChangeText={text => this.setState({ factValue: text })}
              />
              <View style={styles.modalButtons}>
                <Mutation
                  mutation={CreateFactObj}
                  variables={{
                    input: {
                      id: uuidv4(),
                      factname: factName,
                      derivedfrom: 'UserInput',
                      factfriendlyvalue: factValue,
                      factjson: `{${factName}:${factValue}}`,
                      isEnabled: true,
                      factObjFsId: factObjId,
                    },
                  }}
                >
                  {createFactObjMutation => (
                    <Button
                      buttonStyle={styles.btnAddFact}
                      title="Add Fact"
                      onPress={() => {
                        this.setModalVisible(false);
                        if (factObjId === undefined || factObjId === '') {
                          this.createFactSet();
                        } else {
                          createFactObjMutation();
                          this.setState({
                            factName: '',
                            factValue: '',
                          });
                        }
                      }}
                    />
                  )}
                </Mutation>
                <Button
                  buttonStyle={styles.btnDecline}
                  title="Decline"
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                />
              </View>
            </Card>
          </View>
        </Modal>
        <HeaderBar heading="Fact Sets" {...this.props} />
        <ScrollView>
          <View style={styles.btnAdd}>
            <Button
              title="Add Fact"
              titleStyle={styles.btnAddStyle}
              icon={<Icon name="plus" size={20} color="white" />}
              onPress={() => this.setModalVisible(true)}
            />
          </View>
          <View style={styles.bodyContainer}>
            {contractId !== '' ? (
              factSets.factset &&
              factSets.factset.fact &&
              factSets.factset.fact.items &&
              factSets.factset.fact.items.map(item => (
                <View style={styles.info}>
                  <Text style={styles.factName}>{item.factname}</Text>
                  <View style={styles.category}>
                    <TextInput
                      style={styles.factValue}
                      value={item.factfriendlyvalue}
                    />
                    <TouchableOpacity>
                      <Icon name="trash-o" size={25} color={colors.navy} 
                      onPress={() => this.deleteFact(item.id)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No Fact</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const FactSetWithData = compose(
  graphql(ListFactSets, {
    options: props => {
      const { navigation } = props;
      const contractId = navigation.getParam('contractId', '');
      return {
        variables: {
          id: contractId,
        },
        pollInterval: 500,
      };
    },
    props: props => {
      return {
        factSets: props.data.getContract || {},
        loading: props.data.loading,
      };
    },
  }),
)(withApollo(FactSet));

export default FactSetWithData;
