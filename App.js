import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import database from './firebase';

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
      <View style={styles.container}>
        <Text>Tama-Pets</Text>
        <Text>Helping you achieve more</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
