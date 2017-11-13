export function setMessage(msg) {
  return { type: 'SET_MESSAGE', msg };
}

export function setName(name) {
  return { type: 'SET_NAME', name };
}

export function setUserDetails(details) {
  return { type: 'SET_USER_DETAILS', details };
}
