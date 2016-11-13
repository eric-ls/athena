import React, { Component } from 'react';
import { GiftedChat,
         Bubble,
         MessageText,
         Send,
} from 'react-native-gifted-chat';
import {
  AsyncStorage,
} from 'react-native'

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
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
          _id: 1,
          _id: this.state.user_id,
        }}
      />
    );
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id").then((value) => {
      console.log("chat", value);
      this.setState({"user_id": parseInt(value)});
    }).done();
  }
}
