
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
  async sendMessage(message) {
    try {
      const url = this.root_url + "/messages";
      console.log("posting", url);
      console.log("posting", message);
      let response = await fetch(url, {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: message})
      });
      let res = await response.json();
      return res.id;
    } catch(error) {
      console.error(error);
    }
  }

  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  };

  async set_topic_and_get_match(uid, topics) {
    try {
      const url = 'http://localhost:3000/users/set_topic_and_get_match';
      let response = await fetch(url, {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            id: uid,
            selected_topics: topics,
          }
        })
      });
      let res = await response.json(); // get res.match res.topic_chosen
      console.log("res", res); // TODO: This returns the user that you are about to talk to.
      return res;
    } catch(error) {
      console.error(error);
    }
  }

  async set_political_leaning(uid, leaning_value) {
    try {
      const url = 'http://localhost:3000/users/set_political_leaning';
      let response = await fetch(url, {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            id: uid,
            political_leaning: leaning_value,
          }
        })
      });
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

  async createChat() {
   try {
      const url = this.root_url + '/chats';
      let response = await fetch(url, {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      let res = await response.json();
      return res.id
    } catch(error) {
      console.error(error);
    }
  }
}

export default new Backend();
