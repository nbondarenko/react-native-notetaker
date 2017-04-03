/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import NotesList from './application/components/NotesList'
import NoteView from './application/components/NoteView'
import NewNote from './application/components/NewNote'
import EditNote from './application/components/EditNote'
import { db } from './application/components/utils/db'

export default class AwesomeProject extends Component {
  renderScene(route, navigator) {
   if(route.title == 'Notes') {
     return <NotesList navigator={navigator} {...route.passProps} />
   }
   if(route.title == 'Note') {
     return <NoteView navigator={navigator} {...route.passProps} />
   }
   if(route.title == 'New Note') {
     return <NewNote navigator={navigator} {...route.passProps} />
   }
   if(route.title == 'Edit Note') {
     return <EditNote navigator={navigator} {...route.passProps} />
   }
 }

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Notes', index: 0 }}
        renderScene={ this.renderScene }
      />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
