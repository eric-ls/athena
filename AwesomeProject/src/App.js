import React from 'react';

import { Router, Scene } from 'react-native-router-flux';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='login' title='Login' component={Login} initial={true} />
          <Scene key='home' title='Home' component={Home}/>
          <Scene key='chat' title='Chat' component={Chat}/>
        </Scene>
      </Router>
    );
  }
}
