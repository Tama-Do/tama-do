import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';

import database from './firebase';
import { Tabs } from './Tabs';
import store from './store';

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







export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}
