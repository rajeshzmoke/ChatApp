import React, { Component } from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getFireBase } from '../components/FireHelper';
import { Row } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Body,
  Button,
  Text,
  Item,
  Input,
  Title,
  Thumbnail,
  Icon,
  Fab,
  List,
  ListItem
} from 'native-base';
import imageurl from '../components/images/ice.jpg';
import reactImage from '../components/images/img1.jpg';
import getBackend from './Backend';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation
} from 'react-native-popup-dialog';
import { Dialog } from 'react-native-simple-dialogs';

const backend = getBackend();

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

const navigateAction = NavigationActions.navigate({
  routeName: 'Home',
  action: NavigationActions.navigate({ routeName: 'Group' })
});
const firebase = getFireBase();

class Group extends Component {
  state = {
    grpName: '',
    groups: [],
    active: 'false',
    items: [
      'Mobile Development',
      'React Native Developers',
      'ios Developers',
      'Android Developers',
      'React Web developers'
    ],
    modalVisible: false
  };

  componentWillMount() {
    const userId = this.props.navigation.state.params.userDetails.userId;
    backend.getGroups(userId);
  }

  signOut = () => {
    firebase.auth().signOut();
    this.props.navigation.dispatch(navigateAction);
    this.setState({
      active: !this.state.active
    });
  };
  goToUsers = () => {
    console.log('usersadasdasd');
    this.props.navigation.navigate('Users');
  };
  goToModal = () => {
    console.log('usersadasdasd');
    this.props.navigation.navigate('Modalview');
  };

  addGroup = () => {
    const userDetails = this.props.navigation.state.params.userDetails;
    backend.addGroup({
      ...userDetails,
      groupName: this.state.grpName
    });
    this.props.navigation.navigate(
      'Chat',
      {
        groupData: {
          ...userDetails,
          groupName: this.state.grpName
        }
      },
      this.setState({ showDialog: false })
    );
  };

  showModalView = () => {
    console.log('inside show modal');
    Alert.alert('Opening the Modal View');
  };

  openDialog = show => {
    this.setState({ showDialog: show });
  };
  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    //const { goBack } = this.props.navigation;

    return (
      <Container>
        <Image style={styles.imageContainer} source={imageurl} />
        <Header style={styles.header}>
          <Row>
            <Body>
              <Title style={{ color: 'black' }}>Welcome {state.params.userDetails.name}</Title>
            </Body>
          </Row>
        </Header>
        <View>
          {/* <View style={{ flexDirection: 'row' }}>
            <Item style={{ flex: 1, borderBottomColor: 'black' }}>
              <Input
                style={{ justifyContent: 'center' }}
                placeholder="Enter Group name"
                onChangeText={text => this.setState({ grpName: text })}
              />
            </Item>

            <Button small rounded dark style={styles.groupButton} onPress={this.addGroup}>
              <Text style={{ fontWeight: '500' }}> Add Group </Text>
            </Button>
          </View> */}
        </View>
        <View style={{ flex: 5, alignContent: 'stretch' }}>
          <List
            dataArray={this.state.items}
            renderRow={item => (
              <ListItem
                button
                avatar
                style={{ padding: 5, backgroundColor: 'transparent' }}
                onPress={this.addGroup}
              >
                <Thumbnail circular source={reactImage} />
                <Body>
                  <Text style={{ fontFamily: 'Helvetica', fontWeight: '600' }}>{item} </Text>
                </Body>
              </ListItem>
            )}
          />
          <Dialog
            style={{ backgroundColor: 'red' }}
            visible={this.state.showDialog}
            title="Add Group"
            onTouchOutside={() => this.setState({ showDialog: false })}
          >
            <View style={{ flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
              <TextInput
                placeholder="Enter Group Name"
                style={{
                  margin: 5,
                  width: '60%',
                  borderBottomWidth: 2,
                  borderBottomColor: 'black',
                  textAlign: 'center'
                }}
                onChangeText={text => this.setState({ grpName: text })}
              />
              {/* <Button rounded dark style={styles.groupButton} onPress={this.addGroup}>
                <Text style={{ fontWeight: '500' }}> Add Group </Text>
              </Button> */}
              <TouchableOpacity
                style={{
                  padding: 10,
                  width: '50%',
                  backgroundColor: '#222',
                  borderRadius: 20,
                  marginTop: 5
                }}
                onPress={this.addGroup}
              >
                <Title style={{ color: 'white' }}>Create Group</Title>
              </TouchableOpacity>
            </View>
          </Dialog>
        </View>
        <Fab
          active={!this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#000000' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="navigate" />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={this.signOut}>
            <Icon name="log-out" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }} onPress={this.goToUsers}>
            <Icon name="contact" />
          </Button>
          <Button
            style={{ backgroundColor: '#DD5144' }}
            onPress={() => this.openDialog(true)
            //this.slideAnimationDialog.show();
            }
            //this.slideAnimationDialog.show();
          >
            <Icon name="add" />
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
  header: {
    backgroundColor: '#87cefa'
  },
  groupButton: {
    margin: 10,
    alignItems: 'center'
  },
  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Group;
