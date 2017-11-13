import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
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
  Right
} from 'native-base';
import { Row } from 'react-native-easy-grid';

class Group extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      grpName: '',
      groups: []
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    return (
      <Container>
        <Header style={styles.title}>
          <Row>
            <Body>
              <Title style={{ color: 'black' }}>Welcome</Title>
            </Body>
            <Right>
              <Button small danger style={{ marginTop: 15 }}>
                <Text>Signout</Text>
              </Button>
            </Right>
          </Row>
        </Header>
        <Content>
          <Row>
            <Left>
              <Item>
                <Input
                  placeholder="Enter Group name"
                  onChangeText={text => this.setState({ grpName: text })}
                />
              </Item>
            </Left>
            <Button
              primary
              style={styles.groupButton}
              onPress={() =>
                navigate('Chat', {
                  grpName: 'Zmoke' //this.refs.GroupName._lastNativeText || 'A Grp has noName'
                })}
            >
              <Text> Add Group </Text>
            </Button>
          </Row>
          <Text>{}</Text>
          <Text>Add Group to Start Chatting {state.params.userDetails.name}</Text>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  title: {
    backgroundColor: '#c0c0c0'
  },
  groupButton: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // paddingVertical: Platform.OS === 'ios' ? 10 : 15,
    margin: 10
    // borderWidth: 2,
    // backgroundColor: '#a9a9a9'
  },
  inputStyle: {
    flex: 2,
    margin: 5,
    borderWidth: Platform.OS === 'ios' ? 2 : 0
    // justifyContent: 'stretch'
  }
});
export default Group;
