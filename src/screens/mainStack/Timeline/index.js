import React from 'react';
import { SafeAreaView, View, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import Timeline from 'react-native-timeline-listview'


import HeaderBar from '../../../components/HeaderBar';
import styles from './styles';

class TimelineModule extends React.Component {

  constructor(){
    super()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    this.data = [
      {time: '06/06/19', title: 'Rent & Deposit Paid', description: 'Event 1 Description'},
      {time: '11/06/19', title: 'Rental Start', description: 'Event 2 Description'},
      {time: '12/08/19', title: 'Break Allowed', description: 'Event 3 Description'},
      {time: '11/05/20', title: 'Renewal Allowed', description: 'Event 4 Description'},
      {time: '11/06/20', title: 'Monthly Rolling', description: 'Event 5 Description'}
    ]

    this.state = {
      isRefreshing: false,      
      waiting: false,
      data: this.data
    }
  } 
  onRefresh(){
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 2000);
  }
  
  onEndReached() {
    if (!this.state.waiting) {
        this.setState({waiting: true});

        //fetch and concat data
        setTimeout(() => {

          //refresh to initial data
          var data = this.state.data.concat(
            [
              {time: '11/06/20', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '11/06/20', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '11/06/20', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '11/06/20', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '11/06/20', title: 'Load more data', description: 'append event at bottom of timeline'}
            ]
            )

          this.setState({
            waiting: false,
            data: data,
          });
        }, 2000);
    }
  }
  
  renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    } else {
        return <Text>~</Text>;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar heading="Timeline" {...this.props} />
        <View style={styles.container}>
          <Timeline 
            timeContainerStyle={{minWidth:72}}
            style={styles.list}
            data={this.data}
            options={{
              style:{paddingTop:5},
              refreshControl: (
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh}
                />
              ),
              renderFooter: this.renderFooter,
              onEndReached: this.onEndReached
            }}
          />
      </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(TimelineModule);
