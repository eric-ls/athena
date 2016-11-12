import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

export default class Topics extends Component {
  _handlePress = () => {
    Actions.chat({});
  }

  render() {
    return (    
      <View style={{marginTop: 100}}>
        <Button>Topic 1</Button>
        <Button>Topic 2</Button>
        <Button>Topic 3</Button>
        <Button onPress={this._handlePress}>Proceed to chat</Button>
      </View>
    );
  }
}