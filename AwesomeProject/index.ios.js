'use strict'

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native'
import UserSlider from './js/slider'
import Login from './js/login'

class AwesomeProject extends Component {
  render() {
    return (
      <View>
        <Text>Welcome to the Facebook SDK for React Native!</Text>
        <Login />
        <UserSlider />
      </View>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
