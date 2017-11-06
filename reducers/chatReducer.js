export default function chatReducer(state = [], action) {
  debugger;
  switch (action.type) {
    case 'SHOW_NAME':
      return [...state, action.name];
    case 'SET_NAME':
      return [...state, action.name];
    default:
      return state;
  }
}
