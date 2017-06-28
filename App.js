import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';

import database from './firebase';
import { Tabs } from './Tabs';
import LoginForm from './components/LoginForm'
import store from './store';
import {auth} from './firebase'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("auth state changed, user is", user)
        //generally confused about how this is working
        // when you first sign in nothing happens but when you refresh the page
        // you get the console.log
        this.setState({user});
      } else {
        // No user is signed in.
        console.log("user logged out", this);
        this.setState({user:null})
      }
    });
  }

  render() {
    if(this.state.user){
      return (
        <Provider store={store}>
          <Tabs />
        </Provider>
      )
    }
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}
