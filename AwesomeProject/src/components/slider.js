import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  Text,
  Navigator,
  TouchableHighlight,
  StyleSheet,
  AlertIOS,
  AsyncStorage,
} from 'react-native';
import Backend from './Backend';
import Button from 'react-native-button';
import Slider from 'react-native-slider';


export default class UserSlider extends Component {
  static get defaultProps() {
    return {
      title: 'Slider'
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      value: 0.5,
      politicalLeaning: 'Moderate',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id").then((value) => {
      this.setState({"user_id": parseInt(value)});
    }).done();
  }

  _updateSliderValue = (value) => {
    let leaning;
    if (value <= 0.10) { // TODO: More left is liberal.
      leaning = 'Very Conservative';
    } else if (value <= 0.25) {
      leaning = 'Mostly Conservative';
    } else if (value <= 0.4) {
      leaning = 'Slightly Conservative';
    } else if (value <= 0.6) {
      leaning = 'Moderate';
    } else if (value <= 0.75) {
      leaning = 'Slightly Liberal';
    } else if (value <= 0.9) {
      leaning = 'Mostly Liberal';
    } else {
      leaning = 'Very Liberal';
    }

    this.setState({
      value: value,
      politicalLeaning: leaning,
    })
  }

  _handlePress = () => {
    uid = this.state.user_id;
    // TODO: Write state.politicalLeaning to leaning variable in uid's row in backend DB
    Backend.set_political_leaning(uid, this.state.value);
    Actions.topics({});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Political Leaning</Text>
          <Text style={styles.description}>Use the slider to choose your political orientation</Text>
        </View>
        <Text style={styles.result}>{this.state.politicalLeaning}</Text>
        <Slider
          onValueChange={this._updateSliderValue}
          value={this.state.value}
          style={styles.slider}
          thumbStyle={styles.thumbStyle}/>
        <Button
          containerStyle={styles.buttonContainerStyle}
          style={styles.buttonTextStyle}
          onPress={this._handlePress}>Continue</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 100,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
  },
  result: {
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  slider: {
    height: 50,
    marginBottom: 50,
  },
  thumbStyle: {
    height: 25,
    width: 10,
  },
  buttonContainerStyle: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#8E44AD',
    overflow: 'hidden',
    marginBottom: 10,
  },
  buttonTextStyle: {
    fontSize: 20,
    color: 'white',
  }
})
