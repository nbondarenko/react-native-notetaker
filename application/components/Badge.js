import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Badge extends Component {
  render() {
    return (
      <View style={styles.badge}>
        <Image source={require('./note.png')} style={styles.image} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
