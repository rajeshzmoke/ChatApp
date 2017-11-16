import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Body,
  Content,
  Button,
  Text,
  Item,
  Input,
  Title,
  Left,
  Icon,
  Fab
} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { Row } from 'react-native-easy-grid';

import Backend from './Backend';

class Chat extends Component {
  static navigationOptions = {
    header: null
  };
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
      <Container>
        <Header>
          <Row>
            {/* <Left /> */}
            <Body>
              <Title style={{ color: 'black' }}>
                Welcome {this.props.navigation.state.params.name}
              </Title>
            </Body>
            {/* <Right /> */}
          </Row>
        </Header>
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
      </Container>
    );
  }
}

export default connect(state => ({ chat: state.chatReducer.chat }))(Chat);
