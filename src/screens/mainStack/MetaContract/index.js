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
      console.log('Auth: ', res);
      this.setState({ userId: res.id });
    });
  }

  onPressDetails = key => {
    const { navigation } = this.props;
    navigation.navigate('ContractDetail', {
      key,
    });
  };

  render() {
    const { contract, loading } = this.props;

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
          />
        </View>
        <ScrollView>
          <View style={styles.center}>
            {Object.keys(contract).length !== 0 ? (
              <View style={styles.contractContainer}>
                {contract.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => this.onPressDetails(item.id)}
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
      </SafeAreaView>
    );
  }
}

const MetaContractWithData = compose(
  graphql(MetaContractList, {
    props: props => {
      console.log('Meta DATA: ', props.data);
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
