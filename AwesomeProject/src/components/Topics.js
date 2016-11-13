import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Backend from './Backend';

export default class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTopics: [] };
  }

  _handleNextView = () => {
    uid = Backend.getUid();
    // TODO: Pass the array of selectedTopics to the Backend POST which will return a response body
    //        representing a match for this user to match with

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