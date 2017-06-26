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

//ref.child('users').equalTo('Alex').on('child_added',  ...)
// var tasksRef = database.ref('/tasks')

// var taskRef = tasksRef.push({
//  name: 'eat ice cream'
// });

var path = `/users/1/tasks`
database.ref(path).once('value') //data is an object with keys set to true
    .then(data => {
      console.log("DATA IS ", data)
      //console.log("Object.keys(data.val())", Object.keys(data.val()))
      // console.log("data.key ", data.key)
      // console.log("object.keys???", Object.keys(data.key))
      // console.log("data.val()", data.val())
      //data.forEach(x => console.log("x???", x))
      // for (var key in data) {
      //   //console.log("check another way", key)
      // }
      
        // Object.keys(data).map(key => {
        //   //console.log("key is ", key)
        //    database.ref(`/tasks/${key}`).once('value')
        //    .then(task => console.log(task))
        //     //return database.ref(`/tasks/${key}`).once('value')
        // })
    })