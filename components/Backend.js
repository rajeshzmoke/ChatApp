import * as firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAvKPtsqqqGjkGLkXD8BeqOR6GwJaI2AcE',
      authDomain: 'chatapp-7c693.firebaseapp.com',
      databaseURL: 'https://chatapp-7c693.firebaseio.com',
      storageBucket: 'chatapp-7c693.appspot.com'
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
  setUid(value) {
    this.uid = value;
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
    console.log('message is ', message);
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
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
