import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Card, Text } from 'native-base';
import { getFireBase } from '../components/FireHelper';
import getBackend from './Backend';

const backend = getBackend();

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ''
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Users Page</Title>
          </Body>
        </Header>
        <View style={{}}>
          <TextInput
            keyboardType="number-pad"
            style={{
              borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
              padding: 4,
              width: '40%',
              textAlign: 'center'
            }}
            placeholder="Enter OTP"
            onChangeText={text => this.setState({ phoneNumber: text })}
          />
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#333',
              borderRadius: 20,
              marginTop: 5
            }}
            onPress={() => {
              backend.checkForUsersInGroup({
                phoneNumber: this.state.phoneNumber,
                groupName: this.props.navigation.state.params.groupName,
                groupKey: this.props.navigation.state.params.groupKey
              });
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '400' }}> Add Anonymous User </Text>
          </TouchableOpacity>
        </View>
        <Text>Welcome to users page</Text>
      </Container>
    );
  }
}

export default Users;
