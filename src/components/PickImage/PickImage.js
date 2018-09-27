import React, { Component } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';

import imagePlaceholder from '../../assets/img1.jpg'

export default class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={imagePlaceholder} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert('pickpick')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    width: '80%',
    height: 200,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#eee'
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});
