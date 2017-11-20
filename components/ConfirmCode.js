import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Text, Item, Icon, Input, Title } from 'native-base';

import { Row, Col, Grid } from 'react-native-easy-grid';
import imageurl from '../components/images/ice.jpg';

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
              name: this.props.navigation.state.params.details.name
            }
          });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };
  goToGroups = () => {
    this.props.navigation.navigate('Group', {
      name: this.props.navigation.state.params.details.name
    });
  };

  render() {
    const { goBack } = this.props.navigation;
    console.log('====================================');
    console.log(this.props.navigation.state.params.details.phoneNumber);
    console.log('====================================');
    return (
      <Container style={{ backgroundColor: '#dcdcdc' }}>
        <Image style={styles.imageContainer} source={imageurl} />
        <Header style={styles.header}>
          <Row>
            <Button transparent onPress={() => goBack()}>
              <Icon style={{ fontSize: 20, color: 'black' }} name="arrow-back" />
            </Button>

            <Title style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 15 }}>
              {`OTP sent for ${this.props.navigation.state.params.details.phoneNumber}`}
            </Title>

            {/* <Right /> */}
          </Row>
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
          <Button rounded dark style={styles.groupButton} onPress={this.goToGroups}>
            <Text style={{ fontWeight: '400' }}> Confirm OTP </Text>
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
  header: {
    flexDirection: 'row',
    backgroundColor: '#87cefa'
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
