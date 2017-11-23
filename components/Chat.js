import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';

import { getInstance } from './FireBaseHelper';
import getBackend from './Backend';

const backend = getBackend();

const firebase = getInstance();

// let gName = '';
// let uId = '';
// let userName = '';
// let groupKey = '';

class Chat extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isLoadingEarlier: false
    };
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    backend.loadMessages(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    }, this.props.navigation.state.params.groupData.groupKey);
    this.setState({
      isLoadingEarlier: true
    });
  }
  componentWillUnmount() {
    backend.closeChat();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;

      // uId = this.props.navigation.state.params.groupData.userId;
      // userName = this.props.navigation.state.params.groupData.name;
      // gName = this.props.navigation.state.params.groupData.groupName;
      // groupKey = this.props.navigation.state.params.groupData.groupKey;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          backend.sendMessage(message, {
            groupName: this.props.navigation.state.params.groupData.groupName,
            groupKey: this.props.navigation.state.params.groupData.groupKey
        });
        }}
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={{
          id: this.props.navigation.state.params.groupData.userId,
          name: this.props.navigation.state.params.groupData.name
        }}
      />
    );
  }
}

export default connect(state => ({ chat: state.chatReducer.chat }))(Chat);
