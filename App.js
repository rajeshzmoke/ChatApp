import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Chat from './components/Chat';

const RootNavigation = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Join Anonymous Chat'
    }
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
