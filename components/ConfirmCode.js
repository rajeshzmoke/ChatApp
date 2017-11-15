import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
  constructor(props) {
    super(props);
    this.state = {
      codeInput: ''
    };
  }

  confirmCode = () => {
    console.log('in confirm code');
    const confirmResult = this.props.navigation.state.params.home;
    console.log(this.props.navigation.state.params.home);
    console.log('in confirm res');
    const { codeInput } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: 'Code Confirmed!' });
          this.props.navigation.navigate('Group', {
            userDetails: {
              number: '+918892468991', //this.refs.numberField._lastNativeText, //get the value from the textinput
              name: 'Swap' //this.refs.nameField._lastNativeText
            }
          });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  render() {
    const { goBack } = this.props.navigation;
    console.log('====================================');
    console.log(this.props.navigation.state.params.home);
    console.log('====================================');
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
              placeholder="Enter OTP"
              onChangeText={text => this.setState({ codeInput: text })}
            />
          </Item>
          <Button rounded primary style={styles.groupButton} onPress={this.confirmCode}>
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
