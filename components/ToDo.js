import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation'
import AddTask from './AddTask'
import store from '../store'
import Checkbox from './common/checkbox'
import database from '../firebase'



class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
    this.onChange = this.onChange.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
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
  addTreat(treatsRef, taskRef) {
    // check for treatType on task
    taskRef.once('value').then((snapshot) => {
      return snapshot.val().treat
    })
      .then(treatType => {
        //what if task does not yet have a treatType associated?
        if (!treatType) {
          //treatType = this.getTreatType()
          treatType = 'anger'
          // update task to have treat type
          taskRef.update({ treat: treatType })
          console.log("I should only be here if treat type is unassigned")
        }
        return treatType
      })
      .then(treatType => {
        var query = treatsRef.orderByChild("type").equalTo(treatType)

        //what if query returns nothing because treatType does not exist on treats?
        query.once('value', (snapshot) => {
          if (!snapshot.val()) {
            //create treat
            var newTreatRef = treatsRef.push()
            newTreatRef.set({
              type: treatType,
              quantity: 0
            })
              .then(() => { this.updateQuantity(query) })
          } else {
            this.updateQuantity(query)
          }
        })
      })
  }

  subtractTreat(treatsRef, taskRef) {
    taskRef.once('value').then((snapshot) => {
      return snapshot.val().treat
    })
      .then((treatType) => {
        var query = treatsRef.orderByChild("type").equalTo(treatType)
        this.updateQuantity(query, 'decrement')
      })

  }

  updateQuantity(query, direction = 'increment') {
    var quant
    query.once('value', function (snapshot) {
      var snapArr = []
      if (!Array.isArray(snapshot.val())) {
        for (var key in snapshot.val()) {
          snapArr.push(snapshot.val()[key])
        }
      } else {
        snapArr = snapshot.val()
      }
      snapArr = snapArr.filter(child => child)
      quant = snapArr[0].quantity
    })
    query.once('child_added', function (snapshot) {
      if (direction == 'increment') {
        quant = (Number(quant) + 1)
      } else {
        quant = (Number(quant) - 1)
      }
      snapshot.ref.update({ quantity: quant })
    })
  }


  onChange(userId, taskId, completed) {
    console.log("we're heerrre !")
    var taskUpdates = {}
    var treatsRef = database.ref(`/users/${this.state.auth.user}`).child('treats')
    var taskRef = database.ref(`/users/${this.state.auth.user}/tasks/${taskId}`)


    if (completed) {
      console.log("we're unchecking a checked box")
      taskUpdates = { completed: false }
      this.subtractTreat(treatsRef, taskRef)
    } else {
      console.log("we're checking an unchecked box")
      taskUpdates = { completed: true }
      this.addTreat(treatsRef, taskRef)
    }
    database.ref(`/users/${userId}/tasks/${taskId}`).update(taskUpdates)
  }


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
                  onChange={() => {
                    console.log("got here!")
                    this.onChange(this.state.auth.user, item.key, item.completed)}}
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