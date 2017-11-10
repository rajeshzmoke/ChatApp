import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';

class Group extends Component {
  state = {
    groups: []
  };
  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput ref="GroupName" placeholder="Enter Group name" style={styles.inputStyle} />
          <TouchableOpacity
            style={styles.groupButton}
            onPress={() =>
              navigate('Chat', {
                grpName: this.refs.GroupName._lastNativeText || 'A Grp has noName'
              })}
          >
            <Text>ADD GROUP</Text>
            {console.log(state.params.userDetails.number)}
          </TouchableOpacity>
        </View>

        <Text>{}</Text>

        <Text>Add Group to Start Chatting {state.params.userDetails.name}</Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  groupButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'ios' ? 10 : 15,
    margin: 5,
    borderWidth: 2,
    backgroundColor: '#a9a9a9'
  },
  inputStyle: {
    flex: 2,
    margin: 5,
    borderWidth: Platform.OS === 'ios' ? 2 : 0
    // justifyContent: 'stretch'
  }
});
export default Group;
