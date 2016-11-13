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

export default class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedTopics: [] };
  }

  _handleNextView = () => {
    Actions.chat({});
  }

  _handleTopicSelect = (t) => {
    let currentTopics = this.state.selectedTopics;

    if (currentTopics.includes(t)) {
      let index = currentTopics.indexOf(t);
      if (index > -1) {
        currentTopics.splice(index, 1);
      }
    } else {
      currentTopics.push(t);
    }

    this.setState({ selectedTopic: currentTopics })
    console.log(this.state.selectedTopics)
  }

  _getTopicStyle = (topic) => {
    if (this.state.selectedTopics.includes(topic)) {
      return {
        borderWidth: 1,
        borderColor: '#8E44AD',
        borderRadius: 3,
        height: 100,
        margin: 10,
        width: Dimensions.get('window').width / 2 - 20,
        alignItems: 'center',
        justifyContent: 'center'
      }
    } else {
      return s.topicItem;
    }
  }

  render() {
    let topics = this.topics.map((topic, index) => {
      return (
        <TouchableOpacity onPress={this._handleTopicSelect.bind(this, topic)}
              key={index} style={this._getTopicStyle(topic)}>
          <Image />
          <Text style={s.topicName}>{topic}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={s.topicContainer}>
        <Text style={s.topicTitle}>Choose some topics you want to talk about</Text>
        <ScrollView>
          <View style={s.scroll}>
            {topics}
          </View>
        </ScrollView>
        <View style={s.buttonBar}>
          <Button
            style={s.button}
            onPress={this._handleNextView}
            containerStyle={s.buttonContainerStyle}
            style={s.buttonTextStyle}>Proceed to chat</Button>
        </View>
      </View>
    );
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id").then((value) => {
      console.log("TOPIC", value);
      this.setState({"user_id": parseInt(value)});
    }).done();
  }

  topics = [
    'Immigration',
    'Healthcare',
    'Climate Change',
    'Guns',
    'Abortion',
    'Education',
    'Taxes',
    'Foreign Policy'
  ]
}

const s = StyleSheet.create({
  topicContainer: {
    paddingTop: 60,
    flex: 1,
    justifyContent: 'flex-end',
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    padding: 20,
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
