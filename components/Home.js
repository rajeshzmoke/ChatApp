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
    //debugger;
    const { navigate } = this.props.navigation;
    const userDetails = {
      number: this.refs.numberField._lastNativeText, //get the value from the textinput
      name: this.refs.nameField._lastNativeText
    };
    console.log(userDetails.name);
    this.props.dispatch(chatActions.setName(userDetails));
    navigate('Group', {
      //name: this.refs.nameField._lastNativeText,
      userDetails
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter Your Number :</Text>
        <TextInput ref="numberField" style={styles.nameInput} placeholder="+91" />

        <Text style={styles.title2}>Enter Your Name :</Text>
        <TextInput ref="nameField" style={styles.nameInput} placeholder="John Snow" />
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonText} onPress={this.nextPressed}>
            <Text>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}>
            <Text> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 10,
    borderWidth: 2,
    backgroundColor: '#a9a9a9'
  }
});

export default connect(state => ({ home: state.chatReducer.chat }))(Home);
