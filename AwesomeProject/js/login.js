import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

export default class Login extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = { loggedIn: false, };
  }

  render() {
    var _this = this;
    return (
      <FBLogin style={{ marginBottom: 50, }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          _this.setState({
            user : data.credentials,
          });
          _this.props.setLoggedIn(true);
        }}
        onLogout={function(){
          _this.setState({ user : null });
          _this.props.setLoggedIn(false);
        }}
        onLoginFound={function(data){
          console.log(data);
          _this.setState({
            user : data.credentials,
          });
          _this.props.setLoggedIn(true);
        }}
        onLoginNotFound={function(){
          _this.setState({ user : null });
          _this.props.setLoggedIn(false);
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
    );
  }
}
