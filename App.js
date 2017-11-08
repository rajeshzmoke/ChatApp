import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import Group from './components/Group';

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
  }
});

export default RootNavigation;
