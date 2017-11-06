const initialState = {
  name: '',
  number: 0,
  messages: []
};
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_NUMBER':
      return [...state, action.number];
    case 'SET_NAME':
      return [...state, action.name];
    default:
      return state;
  }
}
