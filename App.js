import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/Home';
import Chat from './components/Chat';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" style={{ paddingTop: Platform.OS === 'ios' ? 64 : 54 }}>
          <Scene key="home" component={Home} title="Home" />
          <Scene key="chat" component={Chat} title="Chat" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
