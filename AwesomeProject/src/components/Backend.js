
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class Backend {
  uid = '';
  messagesRef = null;
  root_url = 'https://tranquil-sands-22048.herokuapp.com';
  // root_url = 'http://localhost:3000'

  // initialize State for Rails Backend
  constructor() {
  }

  // retrieve the messages from the Backend
  loadMessages(cb, chatid, send_id) {
    that = this;
    count = 0;
    console.log("calling loadMessages send_id", send_id);


    innerFunc = function(callback, chat_id, sender_id) {
      // console.log("calling loadMessages", callback);
      // console.log("calling loadMessages", chat_id);
      // console.log("calling loadMessages", count);
      // debugger;
      console.log("calling loadMessages sender_id", sender_id);

      const url = that.root_url + '/users/' + sender_id + '/chats/' + chat_id + '/new_messages';
      // console.log("calling loadMessages", url);
      fetch(url, {
        method:'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        for (i = 0; i < responseJson.messages.length; i++) {
          message = responseJson.messages[i];
          console.log("response", responseJson);
          callback({
            _id: message._id,
            text: message.text,
            createdAt: message.created_at,
            user: {
              _id: message.user._id,
              avatar: message.user.avatar,
              name: message.user.name,
              // name: message.user.name, TODO: Add this.
            },
          });
        }
        count += 1;
        setTimeout(innerFunc, 5000, callback, chat_id, sender_id);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    innerFunc(cb, chatid, send_id)
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
      const url = this.root_url  + '/users/set_topic_and_get_match';
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
      const url = this.root_url + '/users/set_political_leaning';
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

  async createChat(user_id, matched_user_id) {
   try {
      const url = this.root_url + '/chats';
      let response = await fetch(url, {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat: {
            user_1: user_id,
            user_2: matched_user_id
          }
        })
      });
      let res = await response.json();
      return res
    } catch(error) {
      console.error(error);
    }
  }
}

export default new Backend();
