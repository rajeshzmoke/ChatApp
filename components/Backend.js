import { getFireBase } from '../components/FireHelper';

const firebase = getFireBase();
let backendInstance = null;

class Backend {
  messagesRef = null;

  createGroup = (groupInfo, callBack) => {
    const groupRef = firebase
      .database()
      .ref()
      .child('Groups')
      .push();
    const groupKey = groupRef.key;
    groupRef.set(
      {
        groupName: groupInfo.groupName,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: groupInfo.userId
      },
      () => {
        this.addGroupToUser({
          ...groupInfo,
          groupKey
        });
        callBack(groupKey);
      }
    );
  };

  addGroupToUser = groupInfo => {
    firebase
      .database()
      .ref()
      .child('Users')
      .child(groupInfo.userId)
      .child('groups')
      .child(groupInfo.groupKey)
      .set(groupInfo.groupName);
  };

  //retrieve messages from the backend
  loadMessages(callback, key) {
    this.messagesRef = firebase
      .database()
      .ref('Messages')
      .child(key);
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
      firebase
        .database()
        .ref()
        .child('Messages')
        .child(groupInfo.groupKey)
        .push({
          groupName: groupInfo.gName,
          text: message[i].text,
          user: message[i].user,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
    }
  };

  addUsers = user => {
    const firebaseRef = firebase.database().ref();

    firebaseRef
      .child('Users')
      .child(user.userId)
      .once('value', snapshot => {
        const exists = snapshot.val() !== null;
        if (!exists) {
          firebaseRef
            .child('Users')
            .child(user.userId)
            .set({
              name: user.name,
              phoneNumber: user.phoneNumber,
              createdAt: firebase.database.ServerValue.TIMESTAMP
            });

          const inviteRef = firebaseRef.child('Invite').child(user.phoneNumber);

          inviteRef.once('value').then(data => {
            if (data.val()) {
              console.log(data.val());
              // this.addGroupToUser({
              //   groupName: groupInfo.groupName,
              //   groupKey: groupInfo.groupKey,
              //   userId: user.userId
              // });
            }
          });
        }
      });
  };

  checkForUsersInGroup = groupInfo => {
    console.log('in checkForUsersInGroup');
    console.log(groupInfo.phoneNumber);
    firebase
      .database()
      .ref()
      .child('Users')
      .orderByChild('phoneNumber')
      .equalTo(groupInfo.phoneNumber)
      .once('value', snapshot => {
        console.log('==================checkForUsersInGroup==================');
        console.log(snapshot);
        if (snapshot.val()) {
          console.log('if');
          const userId = String(Object.keys(snapshot.val()));
          this.addGroupToUser({
            groupName: groupInfo.groupName,
            groupKey: groupInfo.groupKey,
            userId
          });
        } else {
          console.log('else');
          this.addUserToInvite(groupInfo);
        }
        console.log('=================checkForUsersInGroup===================');
      });
  };

  getGroups = userID => {
    const data = firebase
      .database()
      .ref('Users')
      .child(userID)
      .child('groups');
    //data.off(); todo why
    return data.once('value').then(snapshot => snapshot.val());
  };

  addUserToInvite = groupInfo => {
    firebase
      .database()
      .ref()
      .child('Invite')
      .child(groupInfo.phoneNumber)
      .child(groupInfo.groupKey)
      .set(groupInfo.groupName);
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
