import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import Group from './components/Group';
import ConfirmCode from './components/ConfirmCode';
import Users from './components/Users';
import Modalview from './components/Modalview';
import firebase from 'react-native-firebase';

class ChatHome extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    if (this.state.loading) return null; // Render loading/splash screen etc
    if (!this.state.authenticated) {
      return <Home navigation={this.props.navigation} />;
    }
    return <Group navigation={this.props.navigation} />;
  }
}
const RootNavigation = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#696969'
        },
        headerTitleStyle: {
          color: 'white'
        },
        gesturesEnabled: false
      })
    },
    Group: {
      screen: Group,
      navigationOptions: ({ navigation }) => ({
        //title: `Welcome ${navigation.state.params.userDetails.number || 'Snow'}`,
        header: null,
        gesturesEnabled: false
      })
    },
    Chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.grpName}`,
        header: null,
        gesturesEnabled: false
      })
    },
    ConfirmCode: {
      screen: ConfirmCode,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    },
    Modalview: {
      screen: Modalview,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    Users: {
      screen: Users,
      navigationOptions: ({ navigation }) => ({
        title: 'Users Page',
        gesturesEnabled: false,
        header: null
      })
    }
  },
  {
    headerMode: 'screen'
  }
);

export default RootNavigation;
