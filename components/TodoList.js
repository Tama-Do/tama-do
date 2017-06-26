import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as firebase from "firebase";
import AddTask from './AddTask'
import { StackNavigator } from 'react-navigation'

class TodoListScreen extends React.Component {
    render() {
        return (
            <View>
                <TaskNavigator>
                </TaskNavigator>
            </View>
        )
    }
}



export class TodoList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            database: this.props.database
        }
    }

    static navigationOptions = {
        title: 'To Do List',
    };

    _keyExtractor = (item) => item.name

    // createTask(name, location) {
    //     tasksRef.push({
    //         name: name,
    //         location: location
    //     })
    // }


    render() {
        const { navigate } = this.props.navigation;
        console.log("****************", this.props.todos)
        return (

            <View style={styles.container}>
                <FlatList
                    data={this.props.todos}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                />
                <Button
                    onPress={() =>
                        navigate('AddTask')
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
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

const TaskNavigator = StackNavigator({
    TodoList: { screen: TodoListScreen },
    AddTask: { screen: AddTaskScreen }
})
