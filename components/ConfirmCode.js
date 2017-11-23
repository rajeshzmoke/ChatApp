import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Body,
  Content,
  Button,
  Text,
  Item,
  Icon,
  Input,
  Title,
  Left,
  Right
} from 'native-base';

import { Row, Col, Grid } from 'react-native-easy-grid';
import imageurl from '../components/images/ice.jpg';
import getBackend from './Backend';


const backend = getBackend();

class ConfirmCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: ''
    };
  }

  confirmCode = () => {
   
    const confirmResult = this.props.navigation.state.params.home;
    const { codeInput } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: 'Code Confirmed!' });
          backend.addUsers({
            number: this.props.navigation.state.params.number,
            name: this.props.navigation.state.params.name, 
            userId: user.uid
          });
          this.props.navigation.navigate('Group', {
            userDetails: {
              number: this.props.navigation.state.params.number, //this.refs.numberField._lastNativeText, //get the value from the textinput
              name: this.props.navigation.state.params.name, //this.refs.nameField._lastNativeText
              userId: user.uid
            }
          });
        })
        .catch(error => {
 this.setState({ message: `Code Confirm Error: ${error.message}` });
        console.log(error);
      });
    } else {
        console.log('ssa');
    }
  };
//   goToGroups = () => {
//     this.props.navigation.navigate('Group', {
//       name: this.props.navigation.state.params.details.name
//     });
//   };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: '#dcdcdc' }}>
        <Image style={styles.imageContainer} source={imageurl} />
        <Header style={styles.title}>
          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon style={{ fontSize: 20, color: 'black' }} name="arrow-back" />
            </Button>
            <Title>{}</Title>
            <Title>Confirm OTP {this.props.navigation.state.params.number}</Title>
          </Left>
          {/* <Body>
            <Title>Confirm OTP {this.props.navigation.state.params.details.phoneNumber}</Title>
          </Body> */}
          <Right />
        </Header>
        <Content contentContainerStyle={{ marginVertical: 200 }}>
          <Item
            style={{ marginLeft: 'auto', marginRight: 'auto', width: 200, borderColor: 'black' }}
          >
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
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  title: {
    flexDirection: 'row',
    backgroundColor: '#f8f8ff'
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
