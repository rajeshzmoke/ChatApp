
import { getInstance } from './FireBaseHelper';

const firebase = getInstance();

let backendInstance = null;

class Backend {

  uid = '';
  messagesRef = null;
  key = null;

  addGroup = (groupInfo, callBack) => {
    const groupRef = firebase.database().ref().child('Groups').push();
    const groupKey = groupRef.key;
    groupRef.set({
      groupName: groupInfo.groupName,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      createdBy: groupInfo.userId
     }, () => { 
       this.addUsersToGroup({
                   ...groupInfo,
                      groupKey 
         });
        callBack(groupKey);
      });  
  }

  addUsersToGroup = (groupInfo) => { 
    firebase.database().ref().child('Users').child(groupInfo.userId)
    .child('groups')
    .child(groupInfo.groupKey)
    .set(groupInfo.groupName);
  }

  //retrieve messages from the backend
  loadMessages(callback, key) {

    this.messagesRef = firebase.database().ref('Messages').child(key);
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user.id,
          name: message.user.name
        }
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }


  //send the message to the BAckend
  sendMessage = (message, groupInfo) => {
    for (let i = 0; i < message.length; i++) {
      firebase.database().ref().child('Messages').child(groupInfo.groupKey)
      .push({
        groupName: groupInfo.gName,
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }

  addUsers = (user) => {
     firebase.database().ref().child('Users').child(user.userId)
      .once('value', (snapshot) => {
        const exists = (snapshot.val() !== null);
        if (!exists) {
          firebase.database().ref().child('Users').child(user.userId)
          .set({
            name: user.name,
            number: user.number,
            createdAt: firebase.database.ServerValue.TIMESTAMP
            });
        }
    });
  }

  getGroups = (userID) => {
    const data = firebase.database().ref('Users').child(userID).child('groups');
      //data.off(); todo why
   return data.once('value')
    .then((snapshot) => snapshot.val()
    );
  }


  //close the connection to the backend

  closeChat = () => {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default function getBackend() {
  if (backendInstance == null) {
    backendInstance = new Backend();
  }
  return backendInstance;
}
