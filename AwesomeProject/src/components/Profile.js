import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  Text,
  Navigator,
  StyleSheet,
  Image
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age_range: {}
    };
  }

  //Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ', error.toString());
    } else {
      console.log(result);
      this.setState({
        name: result.first_name,
        email: result.email,
        facebook_id: result.id,
        photo: result.picture.data.url,
        age_range: result.age_range,
        gender: result.gender,
      });
    }
  }

  componentWillMount() {
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=first_name,email,picture.type(large),location,gender,age_range',
      null,
      this._responseInfoCallback
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  render() {
    let age = `${this.state.age_range['min']}-${this.state.age_range['max']} yrs.`;
    return (
      <View style={s.container}>
        <View style={s.coverBG}></View>
        <View style={{bottom: 80, alignItems: 'center'}}>
          <Image source={{uri: this.state.photo}}
                 style={s.profileImg} />
          <Text style={s.name}>{this.state.name}</Text>
          <Text style={s.subtitle}>{this.state.gender}, {age}</Text>
          <Text style={s.bio}>My Self Summary: {this.state.gender}</Text>
        </View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  coverBG: {
    backgroundColor: '#8E44AD',
    height: 170,
  },
  profileImg: {
    width: 140,
    height: 140,
    borderColor: 'white',
    borderWidth: 5,
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3C4858',
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 16,
    color: '#3C4858',
    opacity: 0.8,
  },
  bio: {
    fontSize: 16,
    color: '#7C4858',
    opacity: 0.8,
    marginTop: 20,
    width: 350,
  }
})
