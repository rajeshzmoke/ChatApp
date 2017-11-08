import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import * as chatActions from '../actions/chatActions';
import Backend from './Backend';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {}

  componentDidMount() {
    // Backend.loadMessages(message => {
    //   this.props.dispatch(
    //     chatActions.setMessage(previousState => ({
    //       messages: GiftedChat.append(previousState.this.props.chat.messages, message)
    //     }))
    //   );
    // });
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
          name: this.props.chat.name
        }}
      />
    );
  }
}

export default connect(state => ({ chat: state.chatReducer.chat }))(Chat);
