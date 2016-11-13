
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class Backend {
  uid = '';
  messagesRef = null;
  // root_url = 'https://tranquil-sands-22048.herokuapp.com';
  root_url = 'http://localhost:3000'

  // initialize State for Rails Backend
  constructor() {
  }

  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }

  // send user data to the Backend to get a User Object back
  async sendUserData(first_name, email, facebook_id, token) {
   try {
      const url = this.root_url + '/users';
      let response = await fetch(url, {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            first_name: first_name,
            email: email,
            facebook_id: facebook_id,
            token: token,
          }
        })
      });
      let res = await response.json();
      return res.id
    } catch(error) {
      console.error(error);
    }
  }

  // send user data to the Backend to get a User Object back
  async sendUserData(first_name, email, facebook_id, token) {
   try {
      const url = this.root_url + '/users';
      let response = await fetch(url, {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            first_name: first_name,
            email: email,
            facebook_id: facebook_id,
            token: token,
          }
        })
      });
      let res = await response.json();
      return res.id
    } catch(error) {
      console.error(error);
    }
  }


}

export default new Backend();
