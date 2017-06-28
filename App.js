import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';

import database from './firebase';
import { Tabs } from './Tabs';
import LoginForm from './components/LoginForm'
import store from './store';
import {auth} from './firebase'

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("auth state changed, user is", user)
    //generally confused about how this is working
    // when you first sign in nothing happens but when you refresh the page 
    // you get the console.log
  } else {
    // No user is signed in.
    "oh no no user is signed in "
  }
});


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}

