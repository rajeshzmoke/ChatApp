import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
import getBackend from './Backend';

const backend = getBackend();

let gName = '';
let uId = '';
let userName = '';
let ref = '';

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
    backend.loadMessages(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    });
    this.setState({
      isLoadingEarlier: true
    });
  }
  componentWillUnmount() {
    backend.closeChat();
  }

  render() {
    const { goBack } = this.props.navigation;

    uId = this.props.navigation.state.params.groupData.userId;
    userName = this.props.navigation.state.params.groupData.name;
    gName = this.props.navigation.state.params.groupData.groupName;
    ref = this.props.navigation.state.params.groupData.ref;

    return (
      <Container style={styles.chatContainer}>
        <Header>
          <Row>
            <Button transparent onPress={() => goBack()}>
              <Icon style={{ fontSize: 20, color: 'black' }} name="arrow-back" />
            </Button>
            <Body>
              <Title style={{ marginRight: 'auto', color: 'black' }}>
                {this.props.navigation.state.params.groupData.groupName} Chat
              </Title>
            </Body>
            {/* <Right /> */}
          </Row>
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={message => {
            backend.sendMessage(message, gName);
          }}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={{
            id: uId,
            name: userName
          }}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: '#B8DBEE'
  }
});
export default connect(state => ({ chat: state.chatReducer.chat }))(Chat);
