import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation'
import AddTask from './AddTask'
import store from '../store'
import Checkbox from './common/checkbox'
import database from '../firebase'


//what todo list needs:
// check boxes for complete or uncomplete
// on complete a treat is added to the users/treats
// on uncheck the treat is taken away again
// need to be able to add a todo.
// 

class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
    this.onChange = this.onChange.bind(this)
  }


  componentDidMount() {
    let unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  getTreatType() { // figure out whether this is working 
    min = 0;
    max = 3;
    randInt = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    switch (randInt) {
      case 0: return 'cherry'
      case 1: return 'donut'
      case 2: return 'candy'
      default: return null
    }
  }
  // 
  addTreat(treatsRef, taskRef, taskUpdates) {

  }

  onChange(userId, taskId, completed) {

    var taskUpdates = {}
    var treatsRef = database.ref(`/users/${this.state.auth.user}`).child('treats')
    var taskRef = database.ref(`/users/${this.state.auth.user}/tasks/${taskId}`)
    var treatType = this.getTreatType()
    //var treatType = 'cherry'
    console.log('treatType', treatType)

    if (completed) {
      console.log("we're unchecking a checked box")
      taskUpdates = { completed: false }
    } else {
      console.log("we're checking an unchecked box")
      taskUpdates = { completed: true }

      var query = treatsRef.orderByChild("type").equalTo(treatType)
      var quant
      query.once('value', function(snapshot) {
        console.log("snapshot", snapshot.val())
      var snapArr = []
      if (!Array.isArray(snapshot.val())) {
        for (var key in snapshot.val()) {
          snapArr.push(snapshot.val()[key])
        }
      } else {
        snapArr = snapshot.val()
      }
        console.log("snapArr", snapArr)
        snapArr = snapArr.filter(child => child)
        console.log("snapArr", snapArr)
        quant = snapArr[0].quantity
      })
      query.once('child_added', function (snapshot) {
         quant = (Number(quant) + 1)
         snapshot.ref.update({quantity: quant})
         })
    }
    database.ref(`/users/${userId}/tasks/${taskId}`).update(taskUpdates)
  }

// var query db.ref("-Users").orderByKey("uid").equalTo("jRXMsNZHR2exqifnR2rXcceEMxF2");
// query.once("child_added", function(snapshot) {
//   snapshot.ref.update({ displayName: "New trainer" })
// });

  // if (completed) {
  //   // if you "uncomplete a task"
  //   taskUpdates = { completed: false }
  //   // you need to get the treat associated with that task, and decrement it.
  //   // first we need to read the treat type from the task



  //   // treatsRef.orderByChild("task").equalTo(taskId).once("value", function (snapshot) {
  //   //   snapshot.forEach(function (child) {
  //   //     updates[child.key] = null;
  //   //   })
  //   // })
  // } else {
  //   taskUpdates = { completed: true }

  //   //addTreat(treatsRef, taskRef)

  //   // at the point at which you complete a task
  //   // ask: does this task already have a treat assigned?

  //   taskRef.once('value').then(function (snapshot) {
  //     var treatType
  //     var treat = snapshot.val().treat;
  //      // if not, assign a treat
  //     if (!treat) {
  //       treatType = getTreatType()
  //       taskUpdates['treat'] = treatType
  //     } else {
  //       //need to read the treatType from the task
  //       treatType = snapshot.val().treat.type
  //     }

  //     // ok, now you know the task has a treat

  //     // now you need to find the treat and increment it by one

  //     treatsRef.orderByChild("type").equalTo(treatType).once('value').then(function (snapshot) {
  //       // does that treat already exist on /treats? 
  //       if (snapshot.length == 0) {
  //         // if not, create it, with an initial quantity of 1
  //         var newTreatRef = treatsRef.push()
  //         newTreatRef.set({
  //           type: treatType,
  //           quantity: 1
  //         })
  //       } else {
  //         // if so, find it
  //         snapshot.forEach(function (child) {
  //           //get current quantity
  //           var quant = snapshot.val().quantity
  //           //add one
  //           quant = (Number(currQuant) + 1).toString()
  //           //update 
  //           child.update({ quantity: quant })
  //         })
  //       }
  //     }),

  //   database.ref(`/users/${userId}/tasks/${taskId}`).update(updates)
  // },
  // },
  _keyExtractor = (item) => item.key

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tasks}
          removeClippedSubviews={false}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => {
            console.log("completed ", item.completed)
            return (
              <View style={styles.listItem}>
                <Checkbox
                  label={item.name}
                  onChange={() => this.onChange(this.state.auth.user, item.key, item.completed)}
                  checked={item.completed}
                />
              </View>
            )
          }
          }
        />
        {/*}
                <Button
                    onPress={() => {
                    }
                    }
                    title="Clear Completed Tasks"
                    color="#841584"
                /> */}
        <AddTask />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {

    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});


const mapState = ({ tasks, auth }) => ({ tasks, auth })

const mapDispatch = {}



export const TaskNavigator = StackNavigator({
  ToDo: { screen: ToDo },
  AddTask: { screen: AddTask }
})

export default connect(mapState, mapDispatch)(ToDo)