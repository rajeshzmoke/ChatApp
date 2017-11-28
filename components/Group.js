import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getFireBase } from '../components/FireHelper';
import { Row } from 'react-native-easy-grid';
import { Container, Header, Body, Text, Title, Thumbnail, Icon, List, ListItem } from 'native-base';
import imageurl from '../components/images/ocean.jpg';
import reactImage from '../components/images/img1.jpg';
import getBackend from './Backend';
import PopupDialog, {
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation
} from 'react-native-popup-dialog';
import { Dialog } from 'react-native-simple-dialogs';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionButton from 'react-native-action-button';
import LinearGradient from 'react-native-linear-gradient';

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
  constructor(props) {
    super(props);
    this.state = {
      grpName: '',
      groups: [],
      active: 'false',
      items: [],
      loading: false
    };
  }
  componentWillMount() {
    this.updateGroups();
  }

  goToChat = groupKey => {
    const userDetails = this.props.navigation.state.params.userDetails;
    this.props.navigation.navigate('Chat', {
      groupData: {
        ...userDetails,
        groupName: this.state.items[groupKey],
        groupKey
      },
      onNavigateBack: this.updateGroups
    });
  };

  goToModal = () => {
    console.log('go to model');
    this.props.navigation.navigate('Modalview');
  };

  createGroup = () => {
    const userDetails = this.props.navigation.state.params.userDetails;
    backend.createGroup(
      {
        ...userDetails,
        groupName: this.state.grpName
      },
      this.getGroupKey
    );
  };

  getGroupKey = groupKey => {
    const userDetails = this.props.navigation.state.params.userDetails;
    this.props.navigation.navigate(
      'Chat',
      {
        groupData: {
          ...userDetails,
          groupName: this.state.grpName,
          groupKey
        },
        onNavigateBack: this.updateGroups
      },
      this.setState({ showDialog: false })
    );
  };

  signOut = () => {
    firebase.auth().signOut();
    this.props.navigation.dispatch(navigateAction);
    this.setState({
      active: !this.state.active
    });
  };

  updateGroups = () => {
    this.setState({ loading: true });
    console.log('in update groups and its the keys bleow');
    console.log(this.props.navigation.state.key);
    const userId = this.props.navigation.state.params.userDetails.userId;
    backend.getGroups(userId).then(snapshot => {
      console.log('================snapshot====================');
      console.log(snapshot);
      console.log('================snapshot====================');
      this.setState({
        items: snapshot,
        loading: false
      });
    });
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
        <Header style={styles.header}>
          <Row>
            <Body>
              <Title style={{ color: 'black' }}>Welcome {state.params.userDetails.userName}</Title>
            </Body>
          </Row>
        </Header>
        <LinearGradient colors={['white', '#87cefa']} style={{ height: '100%' }}>
          <View style={{ flex: 5, alignContent: 'stretch' }}>
            <List
              dataArray={this.state.items ? Object.keys(this.state.items) : []}
              renderRow={item => (
                <ListItem
                  button
                  avatar
                  style={{ padding: 5, backgroundColor: 'transparent' }}
                  onPress={() => {
                    this.goToChat(item);
                  }}
                >
                  <Thumbnail circular source={reactImage} />
                  <Body>
                    <Text style={{ fontFamily: 'Helvetica', fontWeight: '600' }}>
                      {this.state.items[item]}
                    </Text>
                  </Body>
                </ListItem>
              )}
            />
            <Dialog
              visible={this.state.showDialog}
              //title="Add Group"
              onTouchOutside={() => this.setState({ showDialog: false })}
            >
              <View style={{ flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextInput
                  placeholder="Enter Group Name"
                  style={{
                    height: 30,
                    width: '50%',
                    borderBottomWidth: 2,
                    borderBottomColor: 'black'
                  }}
                  onChangeText={text => this.setState({ grpName: text })}
                />

                <TouchableOpacity
                  style={{
                    padding: 5,
                    width: '50%',
                    backgroundColor: '#222',
                    borderRadius: 20,
                    marginTop: 5
                  }}
                  onPress={this.createGroup}
                >
                  <Title style={{ color: 'white' }}>Create Group</Title>
                </TouchableOpacity>
              </View>
            </Dialog>
          </View>
        </LinearGradient>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Group"
            onPress={() => this.openDialog(true)}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1abc9c" title="Logout" onPress={this.signOut}>
            <Icon name="log-out" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        <Spinner
          visible={this.state.loading}
          textContent={'Loading Groups...'}
          textStyle={{ color: '#fff' }}
          overlayColor="rgba(0, 0, 0, 0.6)"
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
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
