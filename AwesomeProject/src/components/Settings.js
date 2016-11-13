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
} from 'react-native';
import PopupDialog, {
  DialogTitle,
  SlideAnimation,
  DialogButton
} from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Backend from './Backend';

const popupAnimation = new SlideAnimation({ slideFrom: 'bottom' });

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { current_chat: "" };
  }

  openPopupDialog = () => {
    this.popupDialog.openDialog();
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

  _handleEndConversation = () => {
    // Actions.feedback({});
    this.popupDialog.openDialog();
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
      <View style={s.settingsContainer}>
        <View style={s.profileContainer}>
          <Text style={s.name}>{this.state.current_chat.name}</Text>
          <Image
            source={{uri: this.state.current_chat.avatar}}
            style={s.profilePhoto} />
        </View>
        <View style={s.break}/>
        <View style={s.buttons}>
          <Button
            styleDisabled={{opacity: 0.4}}
            style={s.button}
            onPress={this._handleEndConversation} // Add Feedback Form
            containerStyle={s.buttonContainerStyle}
            style={s.buttonTextStyle}
            >End Conversation</Button>
        </View>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation = { popupAnimation }
          onClosed={this._handleNextView}
          dialogTitle={<DialogTitle title="Reminder" />}
          actions={[
            <DialogButton
              text="SUBMIT"
              onPress={() => {
                this.state.dialogIsOpen = false;
                this.popupDialog.closeDialog();
                Actions.topics({});
              }}
              key="button-1"
            />,
          ]}
        >
          <View style={s.feedbackContainer}>
            <Text style={s.rateTitle}> Did you enjoy your conversation?</Text>
            <Text style={s.rateTitle}> Stars </Text>
            <Text style={s.rateTitle}> Tag it!</Text>
            <Text style={s.rateTitle}> Tags</Text>
              <Button // TODO: Need to remove this button!
                styleDisabled={{opacity: 0.4}}
                style={s.buttons}
                onPress={this.openPopupDialog}
                containerStyle={s.buttonContainerStyle}
                style={s.buttonTextStyle}
                >Submit</Button>
          </View>
        </PopupDialog>
      </View>
    );
  }
}

const s = StyleSheet.create({
  feedbackContainer: {
    paddingTop: 60,
    flex: 1,
  },
  settingsContainer: {
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
  },
  rateTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    padding: 20,
  }
})
