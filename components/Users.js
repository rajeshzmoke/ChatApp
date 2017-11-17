import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Card, Text, View } from 'native-base';

class Users extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Users Page</Title>
          </Body>
        </Header>
        <Text>Welcome to users page</Text>
      </Container>
    );
  }
}

export default Users;
