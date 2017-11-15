import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
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

        this.props.navigation.navigate('ConfirmCode', { home: this.state.confirmResult });
        console.log('in 3');
      })
      .catch(error =>
        this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
      );
  };

  // nextPressed = () => {
  //   const { navigate } = this.props.navigation;
  //   const userDetails = {
  //     number: this.state.number, //this.refs.numberField._lastNativeText, //get the value from the textinput
  //     name: this.state.name //this.refs.nameField._lastNativeText
  //   };
  //   console.log(userDetails);
  //   this.props.dispatch(chatActions.setName(userDetails));
  //   navigate('Group', {
  //     //name: this.refs.nameField._lastNativeText,
  //     userDetails
  //   });
  // };

  otpCode = () => {
    this.props.navigation.navigate('ConfirmCode', { Home: this.state });
  };

  render() {
    return (
      <Container>
        <Header style={styles.title}>
          <Body>
            <Title style={{ color: 'black' }}>Join Anonymous Chat</Title>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel>
            <Label>Phone Number</Label>
            <Input
              autoFocus
              onChangeText={value => this.setState({ phoneNumber: value })}
              value={this.state.phoneNumber}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Enter Name</Label>
            <Input onChangeText={text => this.setState({ name: text })} />
          </Item>
        </Form>
        <Content>
          <Grid>
            <Button rounded success style={styles.buttonText} onPress={this.signIn}>
              <Icon name="arrow-forward" />
              <Text>Next</Text>
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
    flexDirection: 'row'
  },
  title: {
    backgroundColor: '#c0c0c0'
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
