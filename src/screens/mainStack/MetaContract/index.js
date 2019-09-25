import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { compose, graphql } from 'react-apollo';
import { Auth } from 'aws-amplify';
import { Button } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MetaContractList } from '../../../generated/graphql';
import HeaderNavigatorBar from '../../../components/HeaderNavigatorBar';
import Header from '../../../components/Header';

import styles from './styles';

class MetaContract extends React.Component {
  state = {
    userId: '',
  };

  componentWillMount() {
    Auth.currentUserInfo().then(res => {
      this.setState({ userId: res.id });
      console.log('Auth Session: ', res);
    });
  }

  onPressDetails = item => {
    const { navigation } = this.props;
    navigation.navigate('ContractDetail', { item });
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
    } catch (err) {
      console.log('error: ', err);
    }
  };

  onPressUpload = async () => {
    console.log('Hi');
    try {
      console.log('Hello');
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
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

  render() {
    const { contract, loading } = this.props;

    console.log('Contracts: ', contract, loading);

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
        <HeaderNavigatorBar {...this.props} />
        <Header name="Ian" contract="12Eastcote" />
        <View style={styles.email}>
          <Text style={styles.navy}>
            Your contracta email: xyz@contracta.xyz
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
                      console.log(
                        'Unprocessed File: ',
                        unprocessedFile.filename,
                      );
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
)(MetaContract);

export default MetaContractWithData;
