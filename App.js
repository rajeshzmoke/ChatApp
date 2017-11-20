import { Platform } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import Group from './components/Group';
import ConfirmCode from './components/ConfirmCode';
import Users from './components/Users';

const RootNavigation = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        //header: null
        gesturesEnabled: false
      })
    },
    Group: {
      screen: Group,
      navigationOptions: ({ navigation }) => ({
        //title: `Welcome ${navigation.state.params.userDetails.number || 'Snow'}`,
        header: null,
        gesturesEnabled: false
      })
    },
    Chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.grpName}`,
        gesturesEnabled: false
      })
    },
    ConfirmCode: {
      screen: ConfirmCode,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    },
    Users: {
      screen: Users,
      navigationOptions: ({ navigation }) => ({
        title: 'Users Page',
        gesturesEnabled: false
      })
    }
  },
  {
    headerMode: 'screen'
  }
);

export default RootNavigation;
