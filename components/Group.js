import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Group extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>WELCOME TO GROUPS PAGE</Text>
        <Text>{}</Text>
        <TouchableOpacity onPress={() => navigate('Chat')}>
          <Text>Go to chat</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Group;
