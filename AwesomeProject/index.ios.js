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

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
