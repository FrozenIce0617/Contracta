import React from 'react';
import {
  SafeAreaView,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import Timeline from 'react-native-timeline-listview';
import { API, graphqlOperation } from 'aws-amplify';

import { GetUser, GetTimelineEvents } from '../../../generated/graphql';
import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class TimelineModule extends React.Component {
  state = {
    isRefreshing: false,
    waiting: true,
    data: [],
  };

  getTimelineData() {
    const { navigation } = this.props;
    const userId = navigation.getParam('username', '');

    API.graphql(
      graphqlOperation(GetUser, {
        id: userId,
      }),
    )
      .then(result => {
        const timelineId = result.data.getUser.timeline.id;
        API.graphql(
          graphqlOperation(GetTimelineEvents, {
            id: timelineId,
          }),
        )
          .then(res => {
            let data = [];
            res.data.getTimeline.event.items.map(item => {
              data = [
                ...data,
                {
                  time: item.start,
                  title: item.name,
                  description: item.description,
                },
              ];
              return true;
            });
            this.setState({ data, waiting: false });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getTimelineData();
  }

  renderFooter = () => {
    const { waiting } = this.state;

    if (waiting) {
      return <ActivityIndicator size="large" color="#1E8AF6" />;
    }
  };

  render() {
    const { data } = this.state;

    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Timeline" {...this.props} />
        <View style={styles.container}>
          <Timeline
            timeContainerStyle={{ minWidth: 72 }}
            style={styles.list}
            data={data}
            innerCircle="dot"
            circleSize={20}
            lineColor={'rgb(45, 156, 219)'}
            descriptionStyle={{ color: 'gray' }}
            options={{
              style: { paddingTop: 5 },
              refreshControl: (
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh}
                />
              ),
              renderFooter: this.renderFooter,
              // onEndReached: this.onEndReached,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(TimelineModule);
