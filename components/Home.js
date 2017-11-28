import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Container,
  Header,
  Body,
  Content,
  Button,
  Text,
  Icon,
  Form,
  Item,
  Input,
  Title,
  Label
} from 'native-base';
import { Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { getFireBase } from '../components/FireHelper';
import imageurl from '../components/images/ocean.jpg';
import LinerGradient from 'react-native-linear-gradient';

const firebase = getFireBase();

class Home extends Component {
  static navigationOptions = {
    header: null
    // title: 'Join Anonymous Chat'
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+91',
      confirmResult: null,
      userName: '',
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Groups', {});
        console.log('auto check');
        console.log(user);
        console.log('====================================');
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+91',
          confirmResult: null,
          userName: '',
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    console.log('in sign in');
    const { phoneNumber } = this.state;
    console.log(phoneNumber);
    this.setState({ message: 'Sending code ...', loading: true });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        this.setState({ confirmResult, message: 'Code has been sent!', loading: false });
        this.props.navigation.navigate('ConfirmCode', {
          home: this.state.confirmResult,
          details: this.state
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`,
          loading: false
        });
      });
  };

  otpCode = () => {
    this.props.navigation.navigate('ConfirmCode', { details: this.state });
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title style={{ color: 'white' }}>Join Anonymous Chat</Title>
          </Body>
        </Header>
        <LinerGradient colors={['white', '#87cefa']}>
          <View style={{ height: '100%' }}>
            <Form>
              <Item floatingLabel style={{ borderBottomColor: 'black' }}>
                <Label>Phone Number</Label>
                <Input
                  //autoFocus
                  keyboardType="phone-pad"
                  onChangeText={value => this.setState({ phoneNumber: value })}
                  value={this.state.phoneNumber}
                />
              </Item>
              <Item floatingLabel style={{ borderBottomColor: 'black' }}>
                <Label>Enter Name</Label>
                <Input onChangeText={text => this.setState({ userName: text })} />
              </Item>
            </Form>

            <View style={{ marginTop: 10 }}>
              <Button rounded dark style={styles.buttonText} onPress={this.signIn}>
                <Text>Next</Text>
                <Icon name="arrow-forward" />
              </Button>
            </View>
          </View>
        </LinerGradient>
        <Spinner
          visible={this.state.loading}
          textContent={'Logging in...'}
          textStyle={{ color: '#fff' }}
          overlayColor="rgba(0, 0, 0, 0.6)"
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  header: {
    backgroundColor: '#87cefa'
  },
  title2: {
    marginLeft: 20,
    fontSize: 18
  },
  nameInput: {
    padding: 5,
    height: 40,
    borderWidth: Platform.OS === 'ios' ? 2 : 0,
    borderColor: 'black',
    margin: 10
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 10
  }
});

export default connect(state => ({ home: state.chatReducer.chat }))(Home);
