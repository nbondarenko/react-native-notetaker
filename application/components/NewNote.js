import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { db } from './utils/db';
import Badge from './Badge';

export default class NewNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }

  statics: {
    title: 'New Note'
  }

  handleCreate = () => {
    db.createNote(this.state).then((res) => {
      this.props.navigator.push({
        title: 'Notes',
        passProps: {
          title: 'Notes'
        }
      })
    })
  }

  handleReturn = () => {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Badge />
          <Text style={styles.welcome}>New Note</Text>
          <View
            style={{
              height: 1,
              backgroundColor: '#3B5998',
            }}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Type title here"
            onChangeText={(text) => this.setState({ title: text })}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Type description here"
            onChangeText={(text) => this.setState({ description: text })}
          />
        </View>
        <View>
          <TouchableHighlight
            underlayColor='#ad1457'
            style={{
              height: 55,
              backgroundColor: '#ad1457',
            }}
            onPress={() => {
              this.handleCreate();
            }}>
            <Text style={styles.button_text}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='#4527a0'
            style={{
              backgroundColor: '#4527a0',
              height: 55,
            }}
            onPress={() => {
              this.handleReturn();
            }}>
            <Text style={styles.button_text}>Return</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'space-between'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttons: {
  },
  button_text: {
    color: '#fff',
    fontSize: 18,
    margin: 15,
    textAlign: 'center',
  },
});
