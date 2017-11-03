export default function chatReducer(state = [], action) {
  switch (action.type) {
    case 'LOAD_MESSAGE':
      return [...state, Object.assign({}, action.course)];
    default:
      return state;
  }
}
