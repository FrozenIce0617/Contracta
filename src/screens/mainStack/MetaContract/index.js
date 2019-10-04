import React from 'react';
import axios from 'axios';
import qs from 'qs';

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
import { compose, graphql, Mutation } from 'react-apollo';
import { Auth } from 'aws-amplify';
import { Card, Divider, Button } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  MetaContractList,
  GetUser,
  UpdateTC,
} from '../../../generated/graphql';
import HeaderNavigatorBar from '../../../components/HeaderNavigatorBar';
import Header from '../../../components/Header';

import styles from './styles';

class MetaContract extends React.Component {
  state = {
    userId: '',
    showModal: '',
    fileProcessing: false,
    fileProcessingResp:''
  };

  componentWillMount() {
    Auth.currentUserInfo().then(res => {
      this.setState({ userId: res.id });
    });
  }

  onPressDetails = item => {
    const { navigation } = this.props;
    navigation.navigate('ContractDetail', { item });
  };

  onPressProcessFile = async item => {
    const { navigation } = this.props;
    console.log("Process called for item: ",item);
    this.setState({
      fileProcessing: true
     });
    const foo = {
      'document_uri': 's3://'+item.folder+item.filename,
      'disable_ocr': 'true'
    }
    await axios.get('https://hmrhmw0c65.execute-api.eu-west-1.amazonaws.com/dev/S3Trigger749b1d51-devv', {
    headers: { 'x-api-key': 'UG2Qm9uV3h38xoPY0UsA6854ofnmHOyw9sL6xuSF' },
    data: JSON.stringify(foo),
    })
    .then((resp) => {
      this.response = resp.data;
      console.log(resp.data);
      console.log(resp.status);
      //todo: If success, then trigger Meta Contract Creation, Contract creation and change file state to 1 (i.e Processed)
    }).catch((err) => {
      this.error = err.message;
      console.log("axios err ", err)
    });
    
  };

  _parseFile = async file => {
    const fileName = file.uri.replace(/^.*[\\\/]/, '');
    const fileType = mime.lookup(file.uri);
    const access = { level: 'private', contentType: 'text/plain' };
    const fileData = await fetch(file.uri);
    const blobData = await fileData.blob();

    try {
      let putresponse = await Storage.put(fileName, blobData, access);
      console.log('S3 response: ', putresponse);
      //_addFileToUser();
    } catch (err) {
      console.log('error: ', err);
    }
  };

  onPressUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText, DocumentPicker.types.pdf],
      });
      if (res.type === 'success') this._parseFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled
      } else {
        throw err;
      }
    }
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
                  {console.log("Analysing unprocessed via: ", contract)}
                  {contract.map(item =>
                    item.userowner.files.items.map((unprocessedFile, index) => {
                      if (unprocessedFile.filestate !== 0) return;
                      return (
                        <TouchableOpacity
                          key={index}
                           onPress={() => this.onPressProcessFile(unprocessedFile)}
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
)(MetaContract);

export default MetaContractWithData;
