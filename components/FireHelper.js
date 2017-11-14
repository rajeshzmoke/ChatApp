import firebase from 'react-native-firebase';

let fireBase = null;

export function getFireBase() {
  if (fireBase == null) {
    fireBase = firebase;
  }
  return fireBase;
}
