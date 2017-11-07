import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as chatActions from '../actions/chatActions';

class Home extends Component {
  constructor() {
    super();
    this.nextPressed = this.nextPressed.bind(this);
  }
  nextPressed() {
    const { navigate } = this.props.navigation;
    const userDetails = {
      number: this.refs.numberField._lastNativeText, //get the value from the textinput
      name: this.refs.nameField._lastNativeText
    };
    console.log(userDetails);
    this.props.dispatch(chatActions.setName(userDetails));
    navigate('Chat');
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter Your Number :</Text>
        <TextInput ref="numberField" style={styles.nameInput} placeholder="+91" />

        <Text style={styles.title2}>Enter Your Name :</Text>
        <TextInput ref="nameField" style={styles.nameInput} placeholder="John Snow" />

        <TouchableOpacity onPress={this.nextPressed}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18
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
    marginLeft: 20,
    width: 60,
    height: 30,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 2,
    backgroundColor: '#4682b4'
  }
});

export default connect(state => ({ home: state.chatReducer.chat }))(Home);
