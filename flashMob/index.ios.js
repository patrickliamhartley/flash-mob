import React, { Component } from 'react';
import { Main } from './components/Main.js';
import Button from 'react-native-button';
import { Map } from './components/mapView.js';
import { EventsList } from './components/events.js';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

console.disableYellowBox = true;

//testing to use navigatorIOS for testing purposes, but would need to explore how to get user to a different screen without using a stack
const styles = StyleSheet.create({
  navigator: {flex: 1}
});
class flashMob extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isEvents: false
  //   }
  //   this.eventsOrMap = this.eventsOrMap.bind(this)
  // }

  // eventsOrMap() {
  //   console.log(this.state.isEvents)
  //   if (this.state.isEvents) {
  //     console.log('yo')
  //     // var route = this.refs.nav.navigationContext.currentRoute;
  //     // route.title = 'Events';
  //     // route.component = EventsList;
  //     // route.passProps = {
  //     //   username: this.state.username,
  //     //   eventsOrMap: this.eventsOrMap
  //     // }
  //     // route.rightButtonTitle = 'Map';
  //     // route.onRightButtonPress = () => {
  //     //   this.eventsOrMap();
  //     // }
  //     // this.refs.nav.replace(route);
  //     this.refs.nav.push({
  //       title: 'Map',
  //       component: Map
  //     });
  //     this.refs.nav.replacePreviousAndPop({
  //       title: 'Events',
  //       component: EventsList,
  //       passProps: {
  //         username: this.state.username,
  //         eventsOrMap: this.eventsOrMap
  //       },
  //       rightButtonTitle: 'Map',
  //       onRightButtonPress: () => {
  //         this.eventsOrMap();
  //       }
  //     }); 
  //   } else {
  //     // var route = this.refs.nav.navigationContext.currentRoute;
  //     // route.title = 'Map';
  //     // route.component = Map;
  //     // route.passProps = {
  //     //   username: this.state.username,
  //     //   eventsOrMap: this.eventsOrMap
  //     // }
  //     // route.rightButtonTitle = 'Events';
  //     // route.onRightButtonPress = () => {
  //     //   this.eventsOrMap();
  //     // }
  //     // this.refs.nav.replace(route);
  //     this.refs.nav.push({
  //       title: 'Events',
  //       component: EventsList
  //     });
  //     this.refs.nav.replacePreviousAndPop({
  //       title: 'Map',
  //       component: Map,
  //       passProps: {
  //         username: this.state.username,
  //         eventsOrMap: this.eventsOrMap
  //       },
  //       rightButtonTitle: 'Events',
  //       onRightButtonPress: () => {
  //         this.eventsOrMap();
  //       }
  //     });
  //   }
  //   this.setState({
  //     isEvents: !this.state.isEvents
  //   })
  // }

  render() {
    return (
      <NavigatorIOS 
        style={styles.navigator}
        ref="nav"
        initialRoute={{
          title: 'get started',
          component: Main
        }}/>
    );      
  }
}


AppRegistry.registerComponent('flashMob', () => flashMob);


