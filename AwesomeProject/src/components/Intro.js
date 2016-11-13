import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
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
        <Text style={s.appDescription}>Bridging the gap in the political spectrum</Text>

        <ScrollView>
          <View style={s.introSection}>
            <Image source={require('../img/people.png')} style={{width: 40, height: 40, alignSelf: 'center', marginBottom: 10,}} resizeMode={'contain'}/>
            <Text style={s.sectionTitle}>Match with a local</Text>
            <Text style={s.sectionDesc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
          </View>

          <View style={s.introSection}>
            <Image source={require('../img/chat.png')} style={{width: 40, height: 40, alignSelf: 'center', marginBottom: 10,}} resizeMode={'contain'}/>
            <Text style={s.sectionTitle}>Real-time chat</Text>
            <Text style={s.sectionDesc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
          </View>

          <View style={s.introSection}>
            <Image source={require('../img/opinion.png')} style={{width: 40, height: 40, alignSelf: 'center', marginBottom: 10,}} resizeMode={'contain'}/>
            <Text style={s.sectionTitle}>Learn opposing opinions</Text>
            <Text style={s.sectionDesc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
          </View>
        </ScrollView>


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
    padding: 15,
    paddingBottom: 0,
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
    flex: 0,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 80,
  },
  buttonContainerStyle: {
    padding: 10,
    marginTop: 30,
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
  },
  introSection: {
    marginBottom: 50,
    marginRight: 40,
    marginLeft: 40,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionDesc: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  }
})
