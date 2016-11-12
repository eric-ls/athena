import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Backend from '../Backend';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

export default class Login extends Component {

  _handlePress = () => {
    Actions.home({});
  }

  render() {
    var _this = this;
    return (
      <View style={{margin: 128}}>
        <FBLogin style={{ marginBottom: 10, }}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={function(data){
            console.log("Logged in!");
            console.log(data);
            _this.setState({ user : data.credentials });
            Backend.sendUserData(this.state.user);
            this._handlePress();
          }}
          onLogout={function(){
            console.log("Logged out.");
            _this.setState({ user : null });
          }}
          onLoginFound={function(data){
            console.log("Existing login found.");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
          onLoginNotFound={function(){
            console.log("No user logged in.");
            _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
        />
      </View>
    );
  }
}
