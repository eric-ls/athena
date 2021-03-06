import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Backend from './Backend';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = { current_chat: "" };
  }

  async getCache(key){
      try{
          console.log("getting cache");
          let value = await AsyncStorage.getItem(key);
          console.log("cache value is ", value);
          return value;
      }
      catch(e){
          console.log('caught error', e);
          // Handle exceptions
      }
  }

  _handleSubmit = () => {
    Actions.topics({});
  }

  // lets make this entire function async doe LOL #nhamena
  async componentWillMount() {
    AsyncStorage.getItem("user_id").then((value) => {
      this.setState({"user_id": parseInt(value)});
    }).done();

    const current_chat = await this.getCache("current_chat")
    this.setState({"current_chat": JSON.parse(current_chat) });
  }

  render() {
    return (
      <View style={s.feedbackContainer}>
        <Text style={s.rateTitle}> Did you enjoy your conversation?</Text>
        <Text style={s.rateTitle}> Stars </Text>
        <Text style={s.rateTitle}> Tag it!</Text>
        <Text style={s.rateTitle}> Tags</Text>
         <Button
            styleDisabled={{opacity: 0.4}}
            style={s.button}
            onPress={this._handleSubmit}
            containerStyle={s.buttonContainerStyle}
            style={s.buttonTextStyle}
            >Submit</Button>
      </View>
    );
  }
}

const s = StyleSheet.create({
  feedbackContainer: {
    paddingTop: 60,
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3C4858',
    marginBottom: 7,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 7,
  },
  break: {
    flex: 0.2,
    height: 25,
    // Add shadow
  },
  buttons: {
    flex:1,
  },
  rateTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    padding: 20,
  },
  topicImg: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  scroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonBar: {
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flex: 0,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  buttonContainerStyle: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#8E44AD',
    overflow: 'hidden',
  },
  buttonTextStyle: {
    fontSize: 20,
    color: 'white',
  },
  topicItem: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 3,
    height: 100,
    margin: 10,
    width: Dimensions.get('window').width / 2 - 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topicName: {
    fontWeight: '700',
  }
})
