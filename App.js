import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import Group from './components/Group';
import grpUsers from './components/grpUsers';

const RootNavigation = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Join Anonymous Chat'
    }
  },
  Group: {
    screen: Group,
    navigationOptions: ({ navigation }) => ({
      title: 'Group'
    })
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      title: 'Chat'
      // ${navigation.state.params.inputName}
    })
  },
  GroupUsers: {
    screen: grpUsers,
    navigationOptions: ({ navigation }) => ({
      screenProps: navigation.state.params.grpName,
      title: `${navigation.state.params.grpName} Group`
    })
  }
});

export default RootNavigation;
