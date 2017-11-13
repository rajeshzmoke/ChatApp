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
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import * as chatActions from '../actions/chatActions';

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      number: '',
      name: ''
    };
  }

  nextPressed = () => {
    const { navigate } = this.props.navigation;
    const userDetails = {
      number: this.state.number, //this.refs.numberField._lastNativeText, //get the value from the textinput
      name: this.state.name //this.refs.nameField._lastNativeText
    };
    console.log(userDetails);
    this.props.dispatch(chatActions.setName(userDetails));
    navigate('Group', {
      //name: this.refs.nameField._lastNativeText,
      userDetails
    });
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
            <Input onChangeText={text => this.setState({ number: text })} />
          </Item>
          <Item floatingLabel last>
            <Label>Enter Name</Label>
            <Input onChangeText={text => this.setState({ name: text })} />
          </Item>
        </Form>
        <Content>
          <Grid>
            <Button rounded success style={styles.buttonText} onPress={this.nextPressed}>
              <Icon name="arrow-forward" />
              <Text>Next</Text>
            </Button>
            <Button rounded danger style={styles.buttonText}>
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
    // borderWidth: 2,
    // borderColor: 'black',
    // backgroundColor: '#a9a9a9'
  }
});

export default connect(state => ({ home: state.chatReducer.chat }))(Home);
