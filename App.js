import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import Group from './components/Group';
import ConfirmCode from './components/ConfirmCode';

const RootNavigation = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Join Anonymous Chat'
    })
  },
  Group: {
    screen: Group,
    navigationOptions: ({ navigation }) => ({
      title: `Welcome ${navigation.state.params.userDetails.number || 'Nobody'}`
    })
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.groupData.groupName}`
    })
  },
  ConfirmCode: {
    screen: ConfirmCode,
    navigationOptions: ({ navigation }) => ({
      title: 'ConfirmCode'
    })
  }
});

export default RootNavigation;
