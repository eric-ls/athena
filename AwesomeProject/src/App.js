import React from 'react';
import {
  AsyncStorage,
} from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login';
import Topics from './components/Topics';
import ProfilePage from './components/Profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 3,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem("convo").then((convos_flag) => {
      if (convos_flag) {
        return;
      }
      console.log("-1");
      this.state.value -= 1;
    }).done();

    AsyncStorage.getItem("political_lean").then((plean_flag) => {
      if (plean_flag) {
        return;
      }
      console.log("-2");
      this.state.value -= 1;
    }).done();

    AsyncStorage.getItem("user_id").then((user_id_flag) => {
      if (user_id_flag) {
        return;
      }
      console.log("-3");
      this.state.value -= 1;
    }).done();
  }

  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene
            key='login'
            title='Login'
            component={Login}
            initial={this.state.value == 0}/>
          <Scene
            key='home'
            title='Home'
            component={Home}
            initial={this.state.value == 1}/>
          <Scene
            key='topics'
            title='Topics'
            component={Topics}
            initial={this.state.value == 2}/>
          <Scene
            key='chat'
            title='Chat'
            onRight={() => { Actions.profile({}); }}
            rightTitle='Profile'
            component={Chat}
            initial={this.state.value == 3}/>
          <Scene
            key='profile'
            title='Profile'
            component={ProfilePage} />
        </Scene>
      </Router>
    );
  }
}
