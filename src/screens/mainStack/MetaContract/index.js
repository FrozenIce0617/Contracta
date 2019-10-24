import React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
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
  CreateMetaContract,
  ListFiles,
} from '../../../generated/graphql';
import HeaderNavigatorBar from '../../../components/HeaderNavigatorBar';
import Header from '../../../components/Header';
import styles from './styles';

class MetaContract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      userName: '',
      showModal: '',
      showMenu: false,
      showUnprocessedMenu: false,
      myMetaContractId: '',
      contract: [],
      files: [],
      curContract: null,
      curUnprocessed: null,
    };
  }

  componentDidMount() {
    const { contract, files } = this.props;
    this.setState({
      contract,
      files,
    });
  }

  componentWillMount() {
    Auth.currentUserInfo().then(res => {
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

  _onPressProcessFile = item => {
    const { client } = this.props;
    const { userName } = this.state;

    try {
      let isodate = new Date().toISOString();
      let metaId = '';

      client
        .mutate({
          mutation: CreateMetaContract,
          variables: {
            input: {
              id: uuidv4(),
              name: item.filename,
              description: 'Automated file processing for ' + item.filename,
              url: encodeURI(`s3://${item.folder}${item.filename}`),
              date: isodate.split('T')[0],
              lang: 'en',
              arn: 'NA',
              state: 'init',
              access: userName,
              docbot: 'NA',
              metaContractUserownerId: userName,
            },
          },
          fetchPolicy: 'no-cache',
        })
        .then(async res => {
          metaId = res.data.createMetaContract.id;
          //Todo: set state is not working in this context. @yuriy pls check
          //this.setState({ myMetaContractId: metaId });
          Alert.alert(
            'Success',
            'Successfully created Meta Contract and Processed File',
            [{ text: 'OK' }],
          );
          //File unprocessed to processed state to 1 cannot be done here. Do it from backend.

          const foo = {
            document_uri: 's3://' + item.folder + item.filename,
            disable_ocr: 'true',
            metaContractID: metaId,
            contractOwner: userName,
            userJWT: '',
            fileStateToChange: item.id,
          };

          console.log('passing following params to REST ', foo);
          await axios
            .get(
              'https://hmrhmw0c65.execute-api.eu-west-1.amazonaws.com/dev/S3Trigger749b1d51-devv',
              {
                headers: {
                  'x-api-key': 'UG2Qm9uV3h38xoPY0UsA6854ofnmHOyw9sL6xuSF',
                },
                data: JSON.stringify(foo),
              },
            )
            .then(resp => {
              this.response = resp.data;
              console.log(resp.data);
              console.log(resp.status);
            })
            .catch(err => {
              this.error = err.message;
              console.log('axios err ', err);
            });
        })
        .catch(function(err) {
          Alert.alert('Fail', 'Unprocessed file creation failed', [
            { text: 'OK' },
          ]);
        });
    } catch (err) {
      console.log('error: ', err);
    }
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
      client
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
        .then(() => {
          Analytics.record({
            name: 'File Upload',
            attributes: { id: userId },
          })
            .then(res => console.log('Analytics Success: ', res))
            .catch(err => console.log('Analytics Error: ', err));
          Alert.alert('Success', 'Successfully uploaded', [{ text: 'OK' }]);
        })
        .catch(err => Alert.alert('Fail', 'Upload failed', [{ text: 'OK' }]));
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

  onPressRefresh = async () => {
    const { client } = this.props;

    await client
      .query({
        query: MetaContractList,
        fetchPolicy: 'no-cache',
      })
      .then(res => {
        this.setState({
          contract:
            res.data.listMetaContracts && res.data.listMetaContracts.items
              ? res.data.listMetaContracts.items
              : [],
        });
      })
      .catch(err => console.log(err));

    await client
      .query({
        query: ListFiles,
        fetchPolicy: 'no-cache',
      })
      .then(res => {
        this.setState({
          files: res.data.listFiles ? res.data.listFiles : [],
        });
      })
      .catch(err => console.log(err));
  };

  onSignOut = () => {
    const { screenProps } = this.props;
    Auth.signOut()
      .then(() => screenProps.onStateChange('signedOut', null))
      .catch(err => console.log(err));
  };

  render() {
    const { userInfo, loading } = this.props;
    const {
      showModal,
      showMenu,
      showUnprocessedMenu,
      contract,
      files,
    } = this.state;
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={showMenu}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.termsContainer}>
              <Card
                title="Contract Manipulation"
                containerStyle={styles.termsCardContainer}
                titleStyle={styles.termsTitle}
              >
                <Button
                  buttonStyle={[styles.btnAction, styles.firstChild]}
                  title="View as Card"
                  titleStyle={styles.titleAction}
                  onPress={() => {
                    const { curContract } = this.state;
                    this.setState({ showMenu: false });
                    if (curContract === null) return;
                    this.onPressDetails(curContract);
                  }}
                />
                <Divider style={styles.actionDivider} />
                <Button
                  buttonStyle={styles.btnAction}
                  title="View as TXT"
                  titleStyle={styles.titleAction}
                  disabled
                  disabledStyle={styles.btnAction}
                />
                <Divider style={styles.actionDivider} />
                <Button
                  buttonStyle={styles.btnAction}
                  title="Delete contract"
                  titleStyle={styles.titleAction}
                  disabled
                  disabledStyle={styles.btnAction}
                />
                <Divider style={styles.actionFooterDivider} />
                <View style={styles.termsRow}>
                  <Button
                    buttonStyle={styles.termsAccept}
                    title="Cancel"
                    onPress={() => {
                      this.setState({
                        showMenu: false,
                      });
                    }}
                  />
                </View>
              </Card>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showUnprocessedMenu}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.termsContainer}>
              <Card
                title="Contract Manipulation"
                containerStyle={styles.termsCardContainer}
                titleStyle={styles.termsTitle}
              >
                <Button
                  buttonStyle={[styles.btnAction, styles.firstChild]}
                  title="Process Original"
                  titleStyle={styles.titleAction}
                  onPress={() => {
                    const { curUnprocessed } = this.state;
                    this.setState({ showUnprocessedMenu: false });
                    if (curUnprocessed === null) return;
                    this._onPressProcessFile(curUnprocessed);
                  }}
                />
                <Divider style={styles.actionDivider} />
                <Button
                  buttonStyle={styles.btnAction}
                  title="Process En"
                  titleStyle={styles.titleAction}
                  disabledStyle={styles.btnAction}
                  disabled
                />
                <Divider style={styles.actionDivider} />
                <Button
                  buttonStyle={styles.btnAction}
                  title="Process Es"
                  titleStyle={styles.titleAction}
                  disabledStyle={styles.btnAction}
                  disabled
                />
                <Divider style={styles.actionDivider} />
                <Button
                  buttonStyle={styles.btnAction}
                  title="Process Ar"
                  titleStyle={styles.titleAction}
                  disabledStyle={styles.btnAction}
                  disabled
                />
                <Divider style={styles.actionFooterDivider} />
                <View style={styles.termsRow}>
                  <Button
                    buttonStyle={styles.termsAccept}
                    title="Cancel"
                    onPress={() => {
                      this.setState({ showUnprocessedMenu: false });
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
            title="Upload"
            titleStyle={styles.btnFontSize}
            icon={<Icon name="upload" size={20} color="white" />}
            onPress={this.onPressUpload}
          />
          <Button
            buttonStyle={{ marginLeft: 20 }}
            title="Refresh"
            titleStyle={styles.btnFontSize}
            icon={<Icon name="refresh" size={20} color="white" />}
            onPress={this.onPressRefresh}
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
                      // onPress={() => this.onPressDetails(item)}
                      onPress={() =>
                        this.setState({ showMenu: true, curContract: item })
                      }
                    >
                      <View style={styles.contractItem}>
                        <View style={[styles.center, styles.preview]}>
                          <Image
                            source={require('../../../assets/images/PDF.png')}
                            style={styles.previewIcon}
                          />
                        </View>
                        <Text numberOfLines={2} style={styles.contractTitle}>
                          {item.name}
                        </Text>
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
              {Object.keys(files).length !== 0 ? (
                <View style={styles.contractContainer}>
                  {/*console.log('Analysing unprocessed via: ', files)*/}
                  {files.items.map((unprocessedFile, index) => {
                    if (unprocessedFile.filestate !== 0) return;
                    return (
                      <TouchableOpacity
                        key={index}
                        // onPress={() =>
                        //   this._onPressProcessFile(unprocessedFile)
                        // }
                        onPress={() => {
                          this.setState({
                            showUnprocessedMenu: true,
                            curUnprocessed: unprocessedFile,
                          });
                        }}
                      >
                        <View style={styles.contractItem}>
                          <View style={[styles.center, styles.preview]}>
                            <Image
                              source={require('../../../assets/images/TBD.png')}
                              style={styles.previewIcon}
                            />
                          </View>
                          <Text numberOfLines={2} style={styles.contractTitle}>
                            {unprocessedFile.filename}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
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
    options: { fetchPolicy: 'network-only' /* pollInterval: 500 */ },
    props: props => ({
      contract:
        props.data.listMetaContracts && props.data.listMetaContracts.items
          ? props.data.listMetaContracts.items
          : [],
      loading: props.data.loading,
    }),
  }),
  graphql(ListFiles, {
    options: { fetchPolicy: 'network-only' },
    props: props => ({
      files: props.data.listFiles ? props.data.listFiles : [],
    }),
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
