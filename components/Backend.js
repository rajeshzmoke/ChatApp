import React from 'react';
import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  constructor() {
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      storageBucket: ''
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            alert(error.message);
          });
      }
    });
  }
  getUid() {
    return this.uid;
  }
  //retrieve messages from the backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  //send the message to the BAckend
  sendMessage(message) {
    for (let index = 0; index < message.length; index++) {
      this.messagesRef.push({
        text: message[index].text,
        user: message[index].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }
  //close the connection to the backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}
export default new Backend();
