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
  Right,
  Icon,
  Fab
} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { Row } from 'react-native-easy-grid';
import getBackend from './Backend';
import imageurl from '../components/images/face.jpg';

const backend = getBackend();

const gName = '';
const uId = '';
const userName = '';
const ref = '';

class Chat extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isLoadingEarlier: false,
      showuseravatar: false
    };
  }

  componentWillMount() {}

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
  goToUserPage = () => {
    console.log('================goToUserPage=================');
    console.log(this.props.navigation.state.params.groupData);
    console.log('==================goToUserPage==================');
    this.props.navigation.navigate('Users', {
      groupData: {
        ...this.props.navigation.state.params.groupData
      }
    });
  };
  render() {
    const { goBack } = this.props.navigation;

    // uId = this.props.navigation.state.params.groupData.userId;
    // userName = this.props.navigation.state.params.groupData.name;
    // gName = this.props.navigation.state.params.groupData.groupName;
    // ref = this.props.navigation.state.params.groupData.ref;

    return (
      <Container style={styles.chatContainer}>
        <Header style={styles.header}>
          <Row>
            <TouchableOpacity
              style={{ paddingTop: 10 }}
              onPress={() => {
                this.props.navigation.state.params.onNavigateBack();
                goBack();
              }}
            >
              <Icon style={{ color: 'black' }} name="arrow-back" />
            </TouchableOpacity>
            <Button transparent onPress={this.goToUserPage}>
              <Title style={{ marginLeft: 'auto', marginRight: 'auto', color: 'black' }}>
                {this.props.navigation.state.params.groupData.groupName} Chat
              </Title>
            </Button>
          </Row>
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={message => {
            backend.sendMessage(message, {
              groupName: this.props.navigation.state.params.groupData.groupName,
              groupKey: this.props.navigation.state.params.groupData.groupKey
            });
          }}
          isLoadingEarlier={this.state.isLoadingEarlier}
          showUserAvatar={this.state.showuseravatar}
          user={{
            showUserAvatar: true,
            id: this.props.navigation.state.params.groupData.userId,
            name: this.props.navigation.state.params.groupData.name
          }}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: '#B8DBEE'
  },
  header: {
    backgroundColor: '#87cefa'
  }
});
export default connect(state => ({ chat: state.chatReducer.chat }))(Chat);
