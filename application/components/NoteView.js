import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { db } from './utils/db';
import Badge from './Badge';

export default class NoteView extends Component {
  constructor(props){
    super(props);
    this.state = {
      note: this.props.noteData
    }
  }

  statics: {
    title: 'Note'
  }

  handleDelete = () => {
    db.deleteNote(this.state.note.id).then((res) => {
      this.props.navigator.push({
        title: 'Notes',
        passProps: {
          title: 'Notes'
        }
      })
    })
  }

  handleEdit = () => {
    this.props.navigator.push({
      title: 'Edit Note',
      passProps: {
        noteData: this.state.note
      }
    })
  }

  handleReturn = () => {
    this.props.navigator.pop();
  }

  buttons = () => {
    return(
      <View style={styles.buttons}>
        <TouchableHighlight
          underlayColor='#ad1457'
          style={{
            height: 55,
            backgroundColor: '#ad1457'
          }}
          onPress={() => {
            this.handleEdit();
          }}>
          <Text style={styles.button_text}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='#00695c'
          style={{
            height: 55,
            backgroundColor: '#00695c'
          }}
          onPress={() => {
            this.handleDelete();
          }}>
          <Text style={styles.button_text}>Delete</Text>
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
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Badge />
          <Text style={styles.welcome}>{this.state.note.title}</Text>
          <View
            style={{
              height: 1,
              backgroundColor: '#3B5998',
            }}
          />
          <View style={styles.mainView}>
            <Text style={styles.title}>Details</Text>
            <Text style={styles.description}>{this.state.note.description}</Text>
          </View>
        </View>
        {this.buttons()}
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
  mainView: {
    margin: 15,
  },
  button_text: {
    color: '#fff',
    fontSize: 18,
    margin: 15,
    textAlign: 'center',
  },
  title: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    fontSize: 17,
    marginBottom: 15,
  },
  description: {
    fontStyle: 'italic',
    fontWeight: '700'
  }
});
