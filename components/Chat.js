import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import Backend from './Backend';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isLoadingEarlier: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    });
    this.setState({
      isLoadingEarlier: true
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
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={{
          _id: Backend.getUid(),
          name: this.props.chat.name
        }}
      />
    );
  }
}

export default connect(state => ({ chat: state.chatReducer.chat }))(Chat);
