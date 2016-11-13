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
import PopupDialog, {
  DialogTitle,
  SlideAnimation,
  DialogButton
} from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Backend from './Backend';

const popupAnimation = new SlideAnimation({ slideFrom: 'bottom' });

export default class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTopics: [], dialogIsOpen: false };
  }

  _handleNextView = () => {
    uid = this.state.user_id;
    // TODO: Pass the array of selectedTopics to the Backend POST which will return a response body
    //        representing a match for this user to match with
    const response = Backend.set_topic_and_get_match(uid, this.state.selectedTopics);
    // TODO: If matched_user is null, then we should do something.
    const matched_user = response.match;
    const topic_chosen = response.topic_chosen;

    Actions.chat({});
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id").then((value) => {
      this.setState({"user_id": parseInt(value)});
    }).done();
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

  openPopupDialog = () => {
    this.state.dialogIsOpen = true;
    this.popupDialog.openDialog();
  }

  render() {
    let topics = this.topics.map((topic, index) => {
      let icon = this.imgurl[topic];

      return (
        <TouchableOpacity onPress={this._handleTopicSelect.bind(this, topic)}
              key={index} style={this._getTopicStyle(topic)}>
          <Image source={icon} style={s.topicImg} resizeMode={'contain'}/>
          <Text style={s.topicName}>{topic}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={s.topicContainer}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation = { popupAnimation }
          onClosed={this._handleNextView}
          actions={[
            <DialogButton
              text="CLOSE"
              onPress={() => {
                this.popupDialog.closeDialog();
              }}
              key="button-1"
            />,
          ]}
        >
          <View>
            <Text>Hello!!!!!!!!!!!!!!!</Text>
          </View>
        </PopupDialog>
        <Text style={s.topicTitle}>Choose some topics you want to talk about</Text>
        <ScrollView>
          <View style={s.scroll}>
            {topics}
          </View>
        </ScrollView>
        <View style={s.buttonBar}>
          <Button
            disabled={this.state.selectedTopics.length == 0}
            styleDisabled={{opacity: 0.4}}
            style={s.button}
            onPress={this.openPopupDialog}
            containerStyle={s.buttonContainerStyle}
            style={s.buttonTextStyle}
            >Proceed to chat</Button>
        </View>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation = { popupAnimation }
          onClosed={this._handleNextView}
          dialogTitle={<DialogTitle title="Reminder" />}
          actions={[
            <DialogButton
              text="PROCEED TO CHAT"
              onPress={() => {
                this.state.dialogIsOpen = false;
                this.popupDialog.closeDialog();
              }}
              key="button-1"
            />,
          ]}
        >
          <View>
            <Text>A compliment a day keeps a smile on all our faces :)</Text>
          </View>
        </PopupDialog>
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

  imgurl = {
    'Immigration': require('../img/immigration.png'),
    'Healthcare': require('../img/healthcare.png'),
    'Climate Change': require('../img/climatechange.png'),
    'Guns': require('../img/guns.png'),
    'Abortion': require('../img/abortion.png'),
    'Education': require('../img/education.png'),
    'Taxes': require('../img/taxes.png'),
    'Foreign Policy': require('../img/foreignpolicy.png'),
  }
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
