import React, { Component } from 'react';
import { Image, StyleSheet, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Container, Header, Content, Button, Text, Item, Icon, Input, Title } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { Row, Col, Grid } from 'react-native-easy-grid';
import imageurl from '../components/images/ice.jpg';
import Timer from './Timer';
import getBackend from './Backend';

const backend = getBackend();

const timer = new Timer();
class ConfirmCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: '',
      timer: 0,
      loading: false
    };
  }

  confirmCode = () => {
    console.log('in confirm code');
    this.setState({ loading: true });
    const confirmResult = this.props.navigation.state.params.home;
    console.log(this.props.navigation.state.params.home);
    console.log('in confirm res');
    const { codeInput } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: 'Codeb  Confirmed!', loading: false });
          backend.addUsers({
            number: this.props.navigation.state.params.number,
            name: this.props.navigation.state.params.name,
            userId: user.uid
          });

          this.props.navigation.navigate('Group', {
            userDetails: {
              number: this.props.navigation.state.params.details.number,
              name: this.props.navigation.state.params.details.name,
              userId: user.uid
            }
          });
          console.log('in ccs');
        })
        .catch(error => {
          console.log(error);
          console.log('ERrrrrror');

          this.setState({ message: `Code Confirm Error: ${error.message}`, loading: false });
        });
    }
  };
  goToGroups = () => {
    // console.log('in gotogrps');
    // timer.startTimer(timer);
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
              {`OTP sent to ${this.props.navigation.state.params.details.phoneNumber}`}
            </Title>
          </Row>
        </Header>

        <View
          style={{
            flexDirection: 'column',
            height: '83%',
            width: '100%',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <TextInput
            keyboardType="number-pad"
            style={{
              borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
              padding: 4,
              width: '40%',
              textAlign: 'center'
            }}
            placeholder="Enter OTP"
            onChangeText={text => this.setState({ codeInput: text })}
          />
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#333',
              borderRadius: 20,
              marginTop: 5
            }}
            onPress={this.confirmCode}
          >
            <Text style={{ color: '#fff', fontWeight: '400' }}> Confirm OTP </Text>
          </TouchableOpacity>
          <Timer />
        </View>
        <Spinner
          visible={this.state.loading}
          textContent={'Checking OTP...'}
          textStyle={{ color: '#fff' }}
          overlayColor="rgba(0, 0, 0, 0.6)"
        />
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
