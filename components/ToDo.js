import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation'
import AddTask from './AddTask'
import store from '../store'
import Checkbox from './common/checkbox'

//what todo list needs:
// check boxes for complete or uncomplete
 // on complete a treat is added to the users/treats
 // on uncheck the treat is taken away again
 // need to be able to add a todo.
 // 

export class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    let unsubscribe = store.subscribe(()=> {
      this.setState(store.getState())
    })
  }

  _keyExtractor = (item) => item.name

   render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tasks}
                    removeClippedSubviews={false}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listItem}>
                            <Checkbox label={item.name}/>
                            </View>
                            )}
                    }
                />
                <Button
                    onPress={() => {
                        navigate('AddTask')
                    }
                    }
                    title="Add a Task"
                    color="#841584"
                />
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


const mapState = ({tasks}) => ({tasks})

const mapDispatch = { }



export const TaskNavigator = StackNavigator({
    ToDo: { screen: ToDo },
    AddTask: { screen: AddTask }
})

export default connect(mapState, mapDispatch)(ToDo)