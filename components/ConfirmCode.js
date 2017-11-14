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
  Right
} from 'native-base';

import { Row, Col, Grid } from 'react-native-easy-grid';

class ConfirmCode extends Component {
  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header style={styles.title}>
          <Row>
            <Left>
              <Button rounded small danger style={{ marginTop: 15 }} onPress={() => goBack()}>
                <Text>Cancel</Text>
              </Button>
            </Left>
            <Body>
              <Title style={{ color: 'black' }}>Confirm OTP</Title>
            </Body>
          </Row>
        </Header>
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <Item style={{ borderColor: 'black' }}>
            <Input
              style={{ textAlign: 'center' }}
              placeholder="Enter Group name"
              onChangeText={text => this.setState({ grpName: text })}
            />
          </Item>
          <Button
            rounded
            primary
            style={styles.groupButton}
            onPress={() =>
              this.props.navigation.navigate('Group', {
                grpName: 'Zmoke' //this.refs.GroupName._lastNativeText || 'A Grp has noName'
              })}
          >
            <Text> Confirm OTP </Text>
          </Button>

          <Text>{}</Text>
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
    margin: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  inputStyle: {
    flex: 2,
    margin: 5
  }
});

export default ConfirmCode;
