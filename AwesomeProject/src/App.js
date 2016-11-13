import React from 'react';

import { Router, Scene, Actions } from 'react-native-router-flux';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login';
import Landing from './components/Landing';
import Settings from './components/Settings';
import Topics from './components/Topics';
import ProfilePage from './components/Profile';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene
            key='landing'
            // title='Login'
            component={Landing}
            />
          <Scene
            key='settings'
            title='Settings'
            component={Settings}
            initial={true} />
          <Scene
            key='login'
            // title='Login'
            component={Login}
              />
          <Scene
            key='home'
            // title='Home'
            component={Home} />
          <Scene
            key='topics'
            // title='Topics'
            component={Topics} />
          <Scene
            key='chat'
            // title='Chat'
            onRight={() => { Actions.settings({}); }}
            rightTitle='Settings' // TODO: Make this an icon
            component={Chat} />
          <Scene
            key='profile'
            // title='Profile'
            component={ProfilePage} />
        </Scene>
      </Router>
    );
  }
}
