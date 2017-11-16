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
    const { goBack } = this.props.navigation;
    return (
      <Container style={styles.chatContainer}>
        <Header>
          <Row>
            <Button transparent onPress={() => goBack()}>
              <Icon style={{ fontSize: 20, color: 'black' }} name="arrow-back" />
            </Button>
            <Body>
              <Title style={{ marginRight: 'auto', color: 'black' }}>
                {this.props.navigation.state.params.grpName} Chat
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
const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: '#B8DBEE'
  }
});
export default connect(state => ({ chat: state.chatReducer.chat }))(Chat);
