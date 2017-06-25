import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBFeL-7XzwY3Al3cBjjlHXXm4JYUInVaSk",
  authDomain: "tama-do.firebaseapp.com",
  databaseURL: "https://tama-do.firebaseio.com",
  storageBucket: "tama-do.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export default database;
