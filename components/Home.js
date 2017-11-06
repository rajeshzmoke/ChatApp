import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as chatActions from '../actions/chatActions';

class Home extends Component {
  state = {
    name: ''
  };
  nameRow(name, index) {
    debugger;
    return <Text key={index}>{name}</Text>;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.title}>Enter Your Name :</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="John Snow"
          onChangeText={text => {
            this.setState({
              name: text
            });
          }}
          value={this.state.name}
        />
        <TouchableOpacity
          onPress={() => {
            navigate('Chat', {
              inputName: this.state.name
            });
          }}
          /* onPress={() => {
            this.props.dispatch(chatActions.showName(this.state.name));
          }} */
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        {this.props.nameR.map(this.nameRow)}
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
  nameInput: {
    padding: 5,
    height: 40,
    borderWidth: Platform.OS === 'ios' ? 2 : 0,
    borderColor: 'black',
    margin: 20
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
  debugger;
  return {
    nameR: state.nameR
  };
}

export default connect(mapStateToProps)(Home);
