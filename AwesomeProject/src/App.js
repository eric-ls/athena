import React from 'react';

import { Router, Scene, Actions } from 'react-native-router-flux';
import Intro from './components/Intro';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login';
import Topics from './components/Topics';
import ProfilePage from './components/Profile';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene
            key='intro'
            title='Welcome'
            component={Intro}
            hideNavBar={true}
            initial={true} />
          <Scene
            key='login'
            title='Login'
            hideNavBar={false}
            component={Login} />
          <Scene
            key='home'
            title='Home'
            component={Home} />
          <Scene
            key='topics'
            title='Topics'
            component={Topics} />
          <Scene
            key='chat'
            title='Chat'
            onRight={() => { Actions.profile({}); }}
            rightTitle='Profile'
            component={Chat} />
          <Scene
            key='profile'
            title='Profile'
            component={ProfilePage} />
        </Scene>
      </Router>
    );
  }
}
