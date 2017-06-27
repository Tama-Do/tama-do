import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';

import database from './firebase';
import { Tabs } from './Tabs';
import LoginForm from './components/LoginForm'
import store from './store';
import {auth} from './firebase'

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


auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("auth state changed, user is", user)
  } else {
    // No user is signed in.
    "oh no no user is signed in "
  }
});




export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}
