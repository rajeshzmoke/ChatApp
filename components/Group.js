import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { TabNavigator } from 'react-navigation';
//import firebase from 'react-native-firebase';

class Group extends Component {
  state = {
    groups: []
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput ref="GroupName" placeholder="Enter Group name" />
          <TouchableOpacity
            style={styles.groupButton}
            onPress={() =>
              navigate('GroupUsers', {
                grpName: this.refs.GroupName._lastNativeText
              })}
          >
            <Text>ADD GROUP</Text>
          </TouchableOpacity>
        </View>

        <Text>{}</Text>
        <TouchableOpacity onPress={() => navigate('Chat')}>
          <Text>Go to chat</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  groupButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 2,
    backgroundColor: '#a9a9a9'
  }
});
export default Group;
