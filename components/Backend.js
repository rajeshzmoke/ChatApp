import { getFireBase } from '../components/FireHelper';

const firebase = getFireBase();
let backendInstance = null;

class Backend {
  uid = '';
  messagesRef = null;
  key = null;

  addGroup = groupInfo => {
    const grpRef = firebase
      .database()
      .ref()
      .child('Groups')
      .push({
        groupName: groupInfo.groupName,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: groupInfo.userId
      });
    this.key = grpRef.key;
    firebase
      .database()
      .ref()
      .child('Users')
      .child(groupInfo.userId)
      .child('groups')
      .child(this.key)
      .set(groupInfo.groupName);
  };

  //retrieve messages from the backend
  loadMessages(callback) {
    this.messagesRef = firebase
      .database()
      .ref('Messages')
      .child(this.key);
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: 'wKFVFspfGJOHSqUl7rD1Hcty3OM2',
          name: 'Swap'
        }
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }

  //send the message to the BAckend
  sendMessage = (message, gName) => {
    console.log(message);
    console.log('====================================');
    console.log(gName);
    for (let i = 0; i < message.length; i++) {
      firebase
        .database()
        .ref()
        .child('Messages')
        .child(this.key)
        .push({
          groupName: gName,
          text: message[i].text,
          user: message[i].user,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
    }
  };

  addUsers = user => {
    console.log('===========in add Users===========');
    console.log(user);
    console.log('============in add Users==============');

    firebase
      .database()
      .ref()
      .child('Users')
      .child(user.userId)
      .once('value', snapshot => {
        const exists = snapshot.val() !== null;
        if (!exists) {
          firebase
            .database()
            .ref()
            .child('Users')
            .child(user.userId)
            .set({
              name: user.name,
              number: user.number,
              createdAt: firebase.database.ServerValue.TIMESTAMP
            });
        }
      });
  };

  getGroups = userID => {
    console.log(userID);
    const data = firebase
      .database()
      .ref('Users')
      .child(userID)
      .child('groups');
    data.off();
    console.log(data);
    data.once('value').then(snapshot => {
      console.log('=============snapshot==================');
      console.log(snapshot);
      const val = snapshot.val();
      console.log('=============getGroups==================');
      console.log(val);
      console.log('============getGroups=================');
    });
  };

  //close the connection to the backend

  closeChat = () => {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  };
}

export default function getBackend() {
  if (backendInstance == null) {
    backendInstance = new Backend();
  }
  return backendInstance;
}
