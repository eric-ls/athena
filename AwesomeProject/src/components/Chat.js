import React, { Component } from 'react';
import { GiftedChat,
         Bubble,
         MessageText,
         Send,
} from 'react-native-gifted-chat';
import {
  AsyncStorage,
} from 'react-native'
import Backend from './Backend';

export default class Chat extends React.Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Welcome! The chosen topic for discussion is: ' + this.props.topic,
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend = (messages = []) => {
    for (i = 0; i < messages.length; i++) {
      message = messages[i]
      Backend.sendMessage({
        message: message.text,
        sender: message.user._id,
        chat_id: this.state.chat_id,
      }).then(message_id => {
       console.log("message_id", message_id);
      })
    }

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#8E44AD',
          }
        }}
      />
    );
  }

  renderMessageText = (props) => {
    return (
      <MessageText
        {...props}
        textStyle={{
          right: {
            color: 'white',
          }
        }}
      />
    )
  }

  renderSend = (props) => {
    return (
      <Send
        {...props}
        textStyle={{
          color: '#8E44AD',
        }}
      />
    )
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        renderBubble={this.renderBubble}
        renderMessageText={this.renderMessageText}
        renderSend={this.renderSend}
        user={{
          _id: this.state.user_id,
        }}
      />
    );
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id").then((user_id) => {
      this.setState({"user_id": parseInt(user_id)});

      Backend.createChat(user_id, this.props.matched_user).then((response) => {
        console.log("createChat", response);
        this.setState({chat_id: response.chat_id});

        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, response.messages),
          };
        });

        // polling
        Backend.loadMessages((message) => {
          this.setState((previousState) => {
            console.log("chat loadmessages", message);
            return {
              messages: GiftedChat.append(previousState.messages, message),
            };
          });
        }, response.chat_id, user_id);
      })
    }).done();


    // Save current chat information so we can pass to settings
    // TODO: Do this correctly with router
    AsyncStorage.setItem("current_chat", JSON.stringify(this.state.messages[0].user));

  }
}
