import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Backend from './Backend';

class Chat extends Component {
  state = {
    messages: []
  };
  componentWillMount() {}

  componentDidMount() {
    console.log('inside component did Mount');
    Backend.loadMessages(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
          name: this.props.inputName
        }}
      />
    );
  }
}

export default Chat;
