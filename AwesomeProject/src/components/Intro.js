import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

export default class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _handlePress = () => {
    Actions.login({});
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.appTitle}>Athena</Text>
        <Text style={s.appDescription}>Welcome to Athena!</Text>

        <Button
          containerStyle={s.buttonContainerStyle}
          style={s.buttonTextStyle}
          onPress={this._handlePress}
          >Get Started</Button>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    backgroundColor: '#8E44AD',
    paddingTop: 60,
    justifyContent: 'flex-end',
    flex: 1,
  },
  appTitle: {
    flex: 0,
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  appDescription: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonContainerStyle: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'stretch',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  buttonTextStyle: {
    fontSize: 20,
    color: '#8E44AD',
  }
})
