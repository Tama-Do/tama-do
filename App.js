import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import database from './firebase';
import { StackNavigator } from 'react-navigation';


// **** Testing Firebase Connection **** //
// function writeUserData(userId, name, email) {
//   database.ref('users/' + userId).set({
//     username: name,
//     email: email
//   });
// }

// writeUserData(1, "Stella", "stella@stella.stella")

// database.ref('/users/1').once('value').then(data => {
//   console.log(data.val())
// })



import { connect, Provider } from 'react-redux'
import store from './store'
import Main from './components/Main'


export default class App extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: App },
});
