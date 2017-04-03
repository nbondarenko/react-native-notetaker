import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import { db } from './utils/db'
import Badge from './Badge'

export default class NotesList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      title: props.title,
      dataSource: ds.cloneWithRows([]),
      notes: []
    }
  }

  statics: {
    title: 'Notes',
    description: 'Performant, scrollable list of notes.'
  }

  componentWillMount() {
    let noteParams = {
      title: 'Test from app',
      description: 'Test desc from app'
    }
    db.getNotes().then((res) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ dataSource: ds.cloneWithRows(res), notes: res });
    });
  }

  openNotePage = (noteId) => {
    let clickedNote = this.state.notes.filter((obj) => {return obj.id == noteId})
    this.props.navigator.push({
      title: 'Note',
      passProps: {
        noteData: clickedNote[0]
      }
    })
  }

  handleNewNote = () => {
    this.props.navigator.push({
      title: 'New Note'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Badge />
        <Text style={styles.welcome}>Notes</Text>
        <View
          style={{
            height: 1,
            backgroundColor: '#3B5998',
          }}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          enableEmptySections={true}
        />
        <TouchableHighlight
          underlayColor='#1e88e5'
          style={{
            backgroundColor: '#1e88e5',
            height: 55,
          }}
          onPress={() => {
            this.handleNewNote();
          }}>
          <Text style={styles.button_text}>Create new</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return(
      <TouchableHighlight
        underlayColor='#88D4F5'
        onPress={() => {
          this.openNotePage(rowData.id);
        }}>
        <Text style={styles.row}>{rowData.title}</Text>
      </TouchableHighlight>
    )
  }

  _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  row: {
    color: '#333333',
    margin: 10,
    fontSize: 16
  },
  button_text: {
    color: '#fff',
    fontSize: 18,
    margin: 15,
    textAlign: 'center',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  image: {
    width: 100,
    height: 100,
  }
});
