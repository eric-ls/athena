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
import UserSlider from './js/slider.js'
import Login from './js/login.js'

class AwesomeProject extends Component {
  _renderScene(route, navigator) {
    if (route.id == 0) {
      return <Login navigator={navigator}/>
    } else if (route.id == 1) {
      return <UserSlider navigator={navigator}/>
    }
    // TODO: Create the id == 2 case
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 0, }}
        renderScene={this._renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
