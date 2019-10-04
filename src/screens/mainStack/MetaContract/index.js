import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { compose, graphql, withApollo, Mutation } from 'react-apollo';
import { Auth, Analytics, Storage } from 'aws-amplify';
import { Card, Divider, Button } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuidv4 from 'uuid/v4';

import {
  MetaContractList,
  GetUser,
  UpdateTC,
  CreateFile,
} from '../../../generated/graphql';
import HeaderNavigatorBar from '../../../components/HeaderNavigatorBar';
import Header from '../../../components/Header';

import styles from './styles';
import gql from 'graphql-tag';

class MetaContract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      userName: '',
      showModal: '',
    };
  }

  componentWillMount() {
    Auth.currentUserInfo().then(res => {
      console.log('Res: ', res);
      this.setState({ userId: res.id, userName: res.username });
    });
  }

  onPressDetails = item => {
    const { navigation } = this.props;
    const { userId } = this.state;

    navigation.navigate('ContractDetail', { item, userId });
    Analytics.record({
      name: 'Contract Detail Visit',
      attributes: { id: userId },
    })
      .then(res => console.log('Analytics Success: ', res))
      .catch(err => console.log('Analytics Error: ', err));
  };

  _parseFile = async file => {
    const { client } = this.props;
    const { userId, userName } = this.state;
    const fileName = file.name;
    const access = { level: 'private', contentType: 'text/plain' };
    const fileData = await fetch(file.uri);
    const blobData = await fileData.blob();

    try {
      // const res = await Storage.put(`${userId}/${fileName}`, blobData, access);
      const res = await Storage.put(fileName, blobData, access);
      console.log('User ID: ', userId);
      console.log('S3 response: ', res);
      const mutResult = client
        .mutate({
          mutation: CreateFile,
          variables: {
            input: {
              id: uuidv4(),
              friendlyname: fileName,
              filename: fileName,
              filestate: 0,
              source: fileName,
              folder: userId,
              fileFileownerId: userName,
              access: userName,
            },
          },
          fetchPolicy: 'no-cache',
        })
        .then(res => console.log('CreateFile Mutation Success: ', res))
        .catch(err => console.log(err));
    } catch (err) {
      console.log('error: ', err);
    }
  };

  onPressUpload = async () => {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
      .then(res => this._parseFile(res))
      .catch(err => console.log('Error: ', err));
  };

  onSignOut = () => {
    const { screenProps } = this.props;
    Auth.signOut()
      .then(() => screenProps.onStateChange('signedOut', null))
      .catch(err => console.log(err));
  };

  render() {
    const { contract, userInfo, loading } = this.props;
    const { showModal } = this.state;
    const isVisible =
      showModal === '' ? !userInfo.isTermsAndPrivacyAgreed : showModal;

    if (loading === true) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#1E8AF6" />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.termsContainer}>
              <Card
                title="Terms & Conditions"
                containerStyle={styles.termsCardContainer}
                titleStyle={styles.termsTitle}
              >
                <Text style={styles.termsContent}>
                  If you would like to contact us to understand more about this
                  Agreement or wish to contact us concerning any matter relating
                  to it, you may send an email to info@contracta.com.
                </Text>
                <Text style={styles.termsContent}>
                  This document was last updated on September 9, 2019.
                </Text>
                <Text style={styles.termsLink}>Privacy Policy</Text>
                <Text style={styles.termsLink}>Terms of Use</Text>
                <Divider style={styles.termsDivider} />
                <View style={styles.termsRow}>
                  <Mutation
                    mutation={UpdateTC}
                    variables={{
                      input: {
                        id: userInfo.id,
                        isTermsAndPrivacyAgreed: true,
                      },
                    }}
                  >
                    {updateTCMutation => (
                      <Button
                        buttonStyle={styles.termsAccept}
                        title="Accept"
                        onPress={() => {
                          this.setState({
                            showModal: false,
                          });
                          updateTCMutation();
                        }}
                      />
                    )}
                  </Mutation>
                  <Button
                    buttonStyle={styles.termsDecline}
                    title="Decline"
                    onPress={() => {
                      this.setState({ showModal: false });
                      this.onSignOut();
                    }}
                  />
                </View>
              </Card>
            </View>
          </SafeAreaView>
        </Modal>
        <HeaderNavigatorBar {...this.props} />
        <Header
          name={`${userInfo.firstname} ${userInfo.lastname}`}
          contract=""
        />
        <View style={styles.email}>
          <Text style={styles.navy}>
            Your contracta email: {userInfo.contractaemail}
          </Text>
        </View>
        <View style={styles.btnUpload}>
          <Button
            title="Upload a new document"
            titleStyle={styles.btnFontSize}
            icon={<Icon name="upload" size={20} color="white" />}
            onPress={this.onPressUpload}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.category}>Processed Contracts</Text>
          <ScrollView horizontal>
            <View>
              {Object.keys(contract).length !== 0 ? (
                <View style={styles.contractContainer}>
                  {contract.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => this.onPressDetails(item)}
                    >
                      <View style={styles.contractItem}>
                        <View style={[styles.preview, styles.center]}>
                          <Image
                            source={{ uri: 'https://imgur.com/Tq8xJsD.png' }}
                            style={styles.previewIcon}
                          />
                        </View>
                        <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <SafeAreaView>
                  <View style={styles.center}>
                    <Text>No Contract</Text>
                  </View>
                </SafeAreaView>
              )}
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.category}>Unprocessed Contracts</Text>
          <ScrollView horizontal>
            <View>
              {Object.keys(contract).length !== 0 ? (
                <View style={styles.contractContainer}>
                  {contract.map(item =>
                    item.userowner.files.items.map((unprocessedFile, index) => {
                      if (unprocessedFile.filestate !== 0) return;
                      return (
                        <TouchableOpacity
                          key={index}
                          // onPress={() => this.onPressDetails(item)}
                        >
                          <View style={styles.contractItem}>
                            <View style={[styles.preview, styles.center]}>
                              <Image
                                source={{
                                  uri: 'https://imgur.com/Tq8xJsD.png',
                                }}
                                style={styles.previewIcon}
                              />
                            </View>
                            <Text style={{ textAlign: 'center' }}>
                              {unprocessedFile.filename}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }),
                  )}
                </View>
              ) : (
                <SafeAreaView>
                  <View style={styles.center}>
                    <Text>No Contract</Text>
                  </View>
                </SafeAreaView>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const MetaContractWithData = compose(
  graphql(MetaContractList, {
    options: { fetchPolicy: 'network-only', pollInterval: 500 },
    props: props => {
      return {
        contract:
          props.data.listMetaContracts && props.data.listMetaContracts.items
            ? props.data.listMetaContracts.items
            : [],
        loading: props.data.loading,
      };
    },
  }),
  graphql(GetUser, {
    options: props => {
      const { navigation } = props;
      const userId = navigation.getParam('username', '');
      return {
        variables: {
          id: userId,
        },
        fetchPolicy: 'network-only',
      };
    },
    props: props => ({
      userInfo: props.data.getUser ? props.data.getUser : {},
    }),
  }),
)(withApollo(MetaContract));

export default MetaContractWithData;
