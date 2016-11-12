import {
  AppRegistry,
} from 'react-native';


//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   Navigator
// } from 'react-native'
// import UserSlider from './js/slider.js'
// import Login from './js/login.js'

// class AwesomeProject extends Component {
//   _renderScene(route, navigator) {
//     if (route.id == 0) {
//       return (
//         <View style={s.loginContainer}>
//           <Text style={s.loginTitle}>Elephant Meets Donkey</Text>
//           <Login navigator={navigator}/>
//         </View>
//       )
//     } else if (route.id == 1) {
//       return <UserSlider navigator={navigator}/>
//     }
//     // TODO: Create the id == 2 case
//   }

import App from './src/App';

AppRegistry.registerComponent('AwesomeProject', () => App);

// const s = StyleSheet.create({
//   loginContainer: {
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingTop: 50,
//   },
//   loginTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 30,
//   },
//   loginButton: {
//     marginTop: 100,
//   }
// })
=======
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator,
  Image
} from 'react-native'
import UserSlider from './js/slider.js';
import Login from './js/login.js';
import Button from 'react-native-button';

// class AwesomeProject extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loggedIn : false,
//     };
//   }

//   _setLoggedIn = (value) => {
//     this.setState({ loggedIn: value });
//   }

//   _onPress = (navigator) => {
//     navigator.push({id: 1});
//   }

//   _renderScene(route, navigator) {
//     if (route.id == 0) {
//       let profile;

//       if (this.state.loggedIn) {
//         profile = <UserProfile
//                     name={"Eric Liang"}
//                     location={"Berkeley, CA"} />;
//       } else {
//         profile = <Text>Not logged in</Text>;
//       }

//       return (
//         <View style={s.loginContainer}>
//           <Text style={s.loginTitle}>Elephant Meets Donkey</Text>
//           {profile}

//           <Login navigator   = {navigator}
//                  setLoggedIn = {this._setLoggedIn} />
//           <Button
//             disabled={!this.state.loggedIn}
//             styleDisabled={{opacity: 0.4}}
//             containerStyle={s.buttonContainerStyle}
//             style={s.buttonTextStyle}
//             onPress={navigator.push.bind(null, {id: 1})}
//             >Continue</Button>
//         </View>
//       )
//     } else if (route.id == 1) {
//       return <UserSlider navigator={navigator}/>
//     }
//     // TODO: Create the id == 2 case
//   }

//   render() {
//     return (
//       <Navigator
//         initialRoute={{ id: 0, }}
//         renderScene={this._renderScene.bind(this)}
//       />
//     );
//   }
// }

// class UserProfile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   render() {
//     return (
//       <View style={s.profileContainer}>
//         <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
//        style={{width: 200, height: 200}} />
//         <Text>{this.props.name}</Text>
//         <Text>{this.props.location}</Text>
//       </View>
//     )
//   }
// }

// const s = StyleSheet.create({
//   loginContainer: {
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'flex-end',
//     paddingTop: 50,
//   },
//   loginTitle: {
//     flex: 1,
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 30,
//   },
//   loginButton: {
//     marginTop: 50,
//     marginBottom: 100,
//   },
//   profileContainer: {
//     flex: 2,
//   },
//   buttonContainerStyle: {
//     padding: 10,
//     borderRadius: 2,
//     backgroundColor: '#8E44AD',
//     overflow: 'hidden',
//     marginBottom: 10,
//     alignSelf: 'stretch',
//     marginRight: 10,
//     marginLeft: 10,
//     marginBottom: 20,
//   },
//   buttonTextStyle: {
//     fontSize: 20,
//     color: 'white',
//   }
// })

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
