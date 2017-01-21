import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text
} from 'react-native';

import MainView from './js/main/MainView.js';

export default class JackBan extends Component {
  
  render() {
      return(
        <Navigator
            initialRoute={{component: MainView}}
            renderScene={(route, navigator) => {
                return <route.component navigator={navigator} {...route.args}/>
                }
            }/>
        );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('JackBan', () => JackBan);
