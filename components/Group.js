import React, { Component } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

import {
  Container,
  Header,
  Body,
  Content,
  Button,
  Text,
  Item,
  Input,
  Title,
  Left,
  Icon,
  Fab
} from 'native-base';
import { Row } from 'react-native-easy-grid';
import imageurl from '../components/images/ice.jpg';

const navigateAction = NavigationActions.navigate({
  routeName: 'Home',
  action: NavigationActions.navigate({ routeName: 'Group' })
});

class Group extends Component {
  state = {
    grpName: '',
    groups: [],
    active: 'false'
  };

  signOut = () => {
    this.props.navigation.dispatch(navigateAction);
    this.setState({
      active: !this.state.active
    });
  };
  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Image style={styles.imageContainer} source={imageurl} />
        <Header style={styles.title}>
          <Row>
            {/* <Left /> */}
            <Body>
              <Title style={{ color: 'black' }}>
                Welcome {this.props.navigation.state.params.name}
              </Title>
            </Body>
            {/* <Right /> */}
          </Row>
        </Header>
        <Content>
          <Row>
            <Left>
              <Item>
                <Input
                  placeholder="Enter Group name"
                  onChangeText={text => this.setState({ grpName: text })}
                />
              </Item>
            </Left>
            <Button
              rounded
              primary
              style={styles.groupButton}
              onPress={() =>
                navigate('Chat', {
                  grpName: 'Zmoke' //this.refs.GroupName._lastNativeText || 'A Grp has noName'
                })}
            >
              <Text> Add Group </Text>
            </Button>
          </Row>
          <Text>{}</Text>
          <Text>Add Group to Start Chatting {/*{state.params.userDetails.name}*/}</Text>
        </Content>
        <Fab
          active={!this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#000000' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="share" />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={this.signOut}>
            <Icon name="exit" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="contact" />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Icon name="mail" />
          </Button>
        </Fab>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  title: {
    backgroundColor: '#c0c0c0'
  },
  groupButton: {
    margin: 10
  },
  signOut: {
    marginLeft: 'auto',
    margin: 15
  },
  inputStyle: {
    flex: 2,
    margin: 5,
    borderWidth: Platform.OS === 'ios' ? 2 : 0
  }
});
export default Group;
