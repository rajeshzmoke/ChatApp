import { GiftedChat } from 'react-native-gifted-chat';

const initialState = {
  chat: {
    name: '',
    number: 0,
    messages: []
  }
};
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return {
        chat: { ...state.chat, ...action.messages }
      };
    case 'SET_MESSAGE':
      return {
        chat: { ...state.chat, messages: [...state.chat.messages, action.messages] }
      };
    case 'SET_NAME':
      return {
        chat: { ...state.chat, ...action.name }
      };
    default:
      return state;
  }
}
