import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();
const ChatRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('ChatApp', () => ChatRedux);
