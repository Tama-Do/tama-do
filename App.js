import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import TodoList from './components/TodoList'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBFeL-7XzwY3Al3cBjjlHXXm4JYUInVaSk",
  authDomain: "tama-do.firebaseapp.com",
  databaseURL: "https://tama-do.firebaseio.com",
  storageBucket: "tama-do.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}

writeUserData(1, "Stella", "stella@stella.stella")




export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {todos: []}
  }

  componentDidMount() {
    firebase.database().ref('/tasks').on('value', data => {
      console.log(data.val())
      this.setState({ todos: (data.val()) })
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This simulator totally works</Text>
        <Text>I AM A WORKING APP.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <TodoList todos={this.state.todos}/>
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
