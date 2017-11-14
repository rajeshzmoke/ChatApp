import React from 'react';
// import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import Group from './components/Group';
import grpUsers from './components/grpUsers';

const RootNavigation = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        //header: null
      })
    },
    Group: {
      screen: Group,
      navigationOptions: ({ navigation }) => ({
        title: `Welcome ${navigation.state.params.userDetails.number || 'Snow'}`
        //headerLeft: <Group nav={navigation} />
      })
    },
    Chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.grpName}`
      })
    },
    GroupUsers: {
      screen: grpUsers,
      navigationOptions: ({ navigation }) => ({
        title: ''
      })
    }
  },
  {
    headerMode: 'screen'
  }
);

export default RootNavigation;
