import React, { Component } from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import getBackend from './Backend';
import { getInstance } from '../components/FireBaseHelper';
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
  Right,
  Thumbnail,
  Icon,
  Fab,
  List,
  ListItem
} from 'native-base';
import { Row } from 'react-native-easy-grid';

import imageurl from '../components/images/ice.jpg';
import reactImage from '../components/images/img1.jpg';

const firebase = getInstance();

const backend = getBackend();

const navigateAction = NavigationActions.navigate({
  routeName: 'Home',
  action: NavigationActions.navigate({ routeName: 'Group' })
});
class Group extends Component {
  state = {
    grpName: '',
    groups: [],
    active: 'false',
    items: []
  }

  componentDidMount() {
    this.updateGroups();
  }

  signOut = () => {
    firebase.auth().signOut();
    this.props.navigation.dispatch(navigateAction);
    this.setState({
      active: !this.state.active
    });
  };
  
  goToUsers = (groupKey) => {
    
    const userDetails = this.props.navigation.state.params.userDetails;
    this.props.navigation.navigate('Chat', {
      groupData: {
        ...userDetails,
        groupName: this.state.items[groupKey],
        groupKey
      },
      onNavigateBack: this.updateGroups
    });
  }

  addGroup = () => {
    const userDetails = this.props.navigation.state.params.userDetails;
    const groupKey = backend.addGroup({
      ...userDetails,
      groupName: this.state.grpName
    }, this.getGroupKey);    
  };

  getGroupKey = (groupKey) => {
    const userDetails = this.props.navigation.state.params.userDetails;
    this.props.navigation.navigate('Chat', {
      groupData: {
        ...userDetails,
        groupName: this.state.grpName,
        groupKey
      }
    });
  }
  updateGroups = () => {
    console.log('in update groups');
    const userId = this.props.navigation.state.params.userDetails.userId;
    backend.getGroups(userId)
    .then((snapshot) => {
      this.setState({
        items: snapshot
      });
    });
  }

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
          <View style={{ flexDirection: 'row' }}>
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
          </View>
        </View>
        <View style={{ flex: 5, alignContent: 'stretch' }}>
          <List
            dataArray={Object.keys(this.state.items)}
            renderRow={item => (
              <ListItem
                button
                avatar
                style={{ padding: 5, backgroundColor: 'transparent' }}
                onPress={() => { this.goToUsers(item); }}
              >
                <Thumbnail circular source={reactImage} />
                <Body>
                  <Text style={{ fontFamily: 'Helvetica', fontWeight: '600' }}>{this.state.items[item]} </Text>
                </Body>
              </ListItem>
            )}
          />
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
  header: {
    backgroundColor: '#87cefa'
  },
  groupButton: {
    margin: 10
  }
});
export default Group;

// class Group extends Component {

//   state = {
//     grpName: '',
//     groups: [],
//     active: 'false'
//   };

//   componentWillMount() {
//    const userId = this.props.navigation.state.params.userDetails.userId;
//     backend.getGroups(userId);
//   }

//   signOut = () => {
//     firebase.auth().signOut();

//     this.setState({
//       active: !this.state.active
//     });
//     this.props.navigation.dispatch(navigateAction);
//   };

  
//   addGroup = () => {
//    const userDetails = this.props.navigation.state.params.userDetails;
//    backend.addGroup({
//        ...userDetails,
//         groupName: this.state.grpName
//     });
//     console.log('====================================');
//     console.log('its navigating');
//     console.log('====================================');
//     this.props.navigation.navigate('Chat', {
//       groupData: {
//         ...userDetails,
//         groupName: this.state.grpName
//       }
//     });
//   };

//   goToChat = (userDetails) => {
//     this.props.navigation.navigate('Chat', {
//       groupData: {
//         ...userDetails,
//         groupName: this.state.grpName
//       }
//     });
//   }

//   render() {
//     const { navigate } = this.props.navigation;
//     const { state } = this.props.navigation;
//     const { goBack } = this.props.navigation;

//     console.log('logging the prop');
//     console.log(this.props.navigation.state.params.userDetails.number);
//     console.log('====================================');
//     return (
//       <Container>
//         <Image style={styles.imageContainer} source={imageurl} />
//         <Header style={styles.title}>
//           <Row>
//             {/* <Left /> */}
//             <Body>
//               <Title style={{ color: 'black' }}>
//                 Welcome {this.props.navigation.state.params.name}
//               </Title>
//             </Body>
//             {/* <Right /> */}
//           </Row>
//         </Header>
//         <Content>
//           <Row>
//             <Left>
//               <Item>
//                 <Input
//                   placeholder="Enter Group name"
//                   onChangeText={text => this.setState({ grpName: text })}
//                 />
//               </Item>
//             </Left>
//             <Button
//               rounded
//               primary
//               style={styles.groupButton}
//               onPress={this.addGroup}
//             >
//               <Text> Add Group </Text>
//             </Button>
//           </Row>
//           <Text>{}</Text>
//           <Text>
//             Add Group to Start Chatting {/*{state.params.userDetails.name}*/}
//           </Text>
//         </Content>
//         <Fab
//           active={!this.state.active}
//           direction="up"
//           containerStyle={{}}
//           style={{ backgroundColor: '#000000' }}
//           position="bottomRight"
//           onPress={() => this.setState({ active: !this.state.active })}
//         >
//           <Icon name="share" />
//           <Button style={{ backgroundColor: '#34A34F' }} onPress={this.signOut}>
//             <Icon name="exit" />
//           </Button>
//           <Button style={{ backgroundColor: '#3B5998' }}>
//             <Icon name="contact" />
//           </Button>
//           <Button disabled style={{ backgroundColor: '#DD5144' }}>
//             <Icon name="mail" />
//           </Button>
//         </Fab>
//       </Container>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row'
//   },
//   imageContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     width: '100%',
//     height: '100%'
//   },
//   title: {
//     backgroundColor: '#c0c0c0'
//   },
//   groupButton: {
//     margin: 10
//   },
//   signOut: {
//     marginLeft: 'auto',
//     margin: 15
//   },
//   inputStyle: {
//     flex: 2,
//     margin: 5,
//     borderWidth: Platform.OS === 'ios' ? 2 : 0
//   }
// });
// export default Group;
