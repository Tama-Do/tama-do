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
    let unsubscribe = store.subscribe(()=> {
      this.setState(store.getState())
    })
  }

  onChange(userId, taskId, completed) {
    //if unchecked changes to checked, change database item to completed through redux
    //add treat to treat list
    // treat should contain reference to this task so that if it's unchecked again the treat
    // can be taken away.  
    //if checked changes to unchecked, change database item to completed = false
    // treat is taken away

    var updates = {}
    var treatsRef = database.ref(`/users/${this.state.auth.user}`).child('treats')
    if (completed) {
        updates = {completed: false}
        var newTreatRef = treatsRef.push();
        newTreatRef.set({
            type: this.state.task,
            task: taskId
        });
    } else {
        updates = {completed: true}
        //find treat where taskId = taskId and delete it.  
    }
    database.ref(`/users/${userId}/tasks/${taskId}`).update(updates)

  }

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
                              onChange={()=>this.onChange(this.state.auth.user, item.key, item.completed)} 
                              checked={item.completed}
                              />
                            </View>
                            )}
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
            <AddTask/>
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


const mapState = ({tasks, auth}) => ({tasks, auth})

const mapDispatch = { }



export const TaskNavigator = StackNavigator({
    ToDo: { screen: ToDo },
    AddTask: { screen: AddTask }
})

export default connect(mapState, mapDispatch)(ToDo)