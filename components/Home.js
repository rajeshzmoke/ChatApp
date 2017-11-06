import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as chatActions from '../actions/chatActions';

class Home extends Component {
  // state = {
  //   name: '',
  //   number: null
  // };
  // nameRow(name, index) {
  //   return <Text key={index}>{name}</Text>;
  // }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.title}>Enter Your Number :</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="+91"
          onChange={num => {
            this.props.dispatch(chatActions.setNumber(num));
          }}
          value={this.props.numberR}
        />

        <Text style={styles.title2}>Enter Your Name :</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="John Snow"
          onChangeText={text => {
            this.setState({
              name: text
            });
          }}
          value={this.props.nameR}
        />

        <TouchableOpacity
          onPress={() => {
            navigate('Chat', {
              inputNumber: this.props.numberR,
              inputName: this.props.nameR
            });
          }}
          /* onPress={() => {
            this.props.dispatch(chatActions.showName(this.state.name));
          }} */
        >
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
function mapStateToProps(state, ownProps) {
  return {
    nameR: state.name,
    numberR: state.number,
    messagesR: state.messages
  };
}

export default connect(mapStateToProps)(Home);
