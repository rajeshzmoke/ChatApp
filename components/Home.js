import React, { Component } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
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
import * as chatActions from '../actions/chatActions';
import { getFireBase } from '../components/FireHelper';
import imageurl from '../components/images/ice.jpg';

const firebase = getFireBase();

class Home extends Component {
  static navigationOptions = {
    header: null
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
      name: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('====================================');
        console.log('auto check');
        console.log('====================================');
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+91',
          confirmResult: null,
          name: ''
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
    this.setState({ message: 'Sending code ...' });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        console.log('in 1');
        this.setState({ confirmResult, message: 'Code has been sent!' });
        console.log(this.state.user);

        this.props.navigation.navigate('ConfirmCode', {
          home: this.state.confirmResult,
          details: this.state
        });
        console.log('in 3');
      })
      .catch(error =>
        this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
      );
  };

  otpCode = () => {
    this.props.navigation.navigate('ConfirmCode', { details: this.state });
  };

  goToConfirmCode = () => {
    this.props.navigation.navigate('ConfirmCode', {
      home: this.state.confirmResult,
      details: this.state
    });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Image style={styles.imageContainer} source={imageurl} />
        <Header style={styles.header}>
          <Body>
            <Title style={{ color: 'black' }}>Join Anonymous Chat</Title>
          </Body>
        </Header>
        <Content style={{ height: '100%' }}>
          <Form>
            <Item floatingLabel style={{ borderBottomColor: 'black' }}>
              <Label>Phone Number</Label>
              <Input
                //autoFocus
                onChangeText={value => this.setState({ phoneNumber: value })}
                value={this.state.phoneNumber}
              />
            </Item>
            <Item floatingLabel style={{ borderBottomColor: 'black' }}>
              <Label>Enter Name</Label>
              <Input onChangeText={text => this.setState({ name: text })} />
            </Item>
          </Form>

          <Grid>
            <Button rounded success style={styles.buttonText} onPress={this.goToConfirmCode}>
              <Text>Next</Text>
              <Icon name="arrow-forward" />
            </Button>
            <Button rounded danger style={styles.buttonText} onPress={this.otpCode}>
              <Text> Signup</Text>
            </Button>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcdcdc'
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
