import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

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

const navigateAction = NavigationActions.navigate({
  routeName: 'Home',
  action: NavigationActions.navigate({ routeName: 'Group' })
});

class Group extends Component {
  state = {
    grpName: '',
    groups: []
  };

  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header style={styles.title}>
          <Row>
            <Body>
              <Title style={{ color: 'black' }}>Welcome</Title>
            </Body>
            <Right>
              <Button
                rounded
                small
                danger
                style={{ marginTop: 15 }}
                onPress={() => this.props.navigation.dispatch(navigateAction)}
              >
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
              rounded
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
          <Text>Add Group to Start Chatting {/*{state.params.userDetails.name}*/}</Text>
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
    margin: 10
  },
  inputStyle: {
    flex: 2,
    margin: 5,
    borderWidth: Platform.OS === 'ios' ? 2 : 0
  }
});
export default Group;
