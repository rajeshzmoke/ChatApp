import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Backend from './Backend';

class Chat extends Component {
  state = {
    messages: []
  };
  ComponentWillMmount() {}
  ComponentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    });
  }
  ComponentWillUnmount() {
    Backend.closeChat();
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessages(message);
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
