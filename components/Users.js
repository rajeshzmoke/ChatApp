import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';
import { Container, Header, Body, Title, Left, Right, Text, Button, Icon } from 'native-base';
import { Row } from 'react-native-easy-grid';
import getBackend from './Backend';
import imageurl from '../components/images/ocean.jpg';
import LinerGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';

const backend = getBackend();

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      members: []
    };
  }

  componentWillMount() {}

  render() {
    const { goBack } = this.props.navigation;

    const backAction = NavigationActions.back({
      key: this.props.navigation.state.params.groupData.groupPageKey
    });

    return (
      <Container>
        <Header style={styles.header}>
          <Row>
            <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => goBack()}>
              <Icon style={{ color: 'black' }} name="arrow-back" />
            </TouchableOpacity>
            <Title style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 15 }}>
              Users Page
            </Title>
          </Row>
        </Header>
        <LinerGradient colors={['white', '#00bfff']}>
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View style={{ marginTop: 50 }}>
              <TextInput
                keyboardType="phone-pad"
                style={{
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  padding: 4,
                  width: '60%',
                  textAlign: 'center'
                }}
                placeholder="Enter Anonymous number"
                onChangeText={text => this.setState({ phoneNumber: text })}
              />
              <TouchableOpacity
                style={{
                  padding: 10,
                  width: '60%',
                  backgroundColor: '#333',
                  borderRadius: 20,
                  alignItems: 'center',
                  marginTop: 10
                }}
                onPress={() => {
                  backend.checkForUsersInGroup({
                    ...this.props.navigation.state.params.groupData,
                    phoneNumber: this.state.phoneNumber
                  });
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '400' }}> Add Anonymous User </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
              <FlatList
                data={[{ key: 'a' }, { key: 'b' }]}
                renderItem={({ item }) => <Text>{item.key}</Text>}
              />
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
                width: '35%',
                backgroundColor: '#333',
                borderRadius: 20,
                marginBottom: 100,
                alignItems: 'center'
              }}
              onPress={() => {
                backend.exitGroup(
                  {
                    ...this.props.navigation.state.params.groupData
                  },
                  this.props.navigation.dispatch(backAction)
                );
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '400' }}> Leave Group </Text>
            </TouchableOpacity>
          </View>
        </LinerGradient>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  header: {
    backgroundColor: '#87cefa'
  }
});
export default Users;
