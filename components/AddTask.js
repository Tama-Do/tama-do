import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, TextInput } from 'react-native'
import { Card, CardSection, Input, Button, Spinner } from './common';
import database from '../firebase'
import store from '../store'



export default class AddTaskModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task: '',
            auth: null
        }
    }

    componentDidMount() {
    let unsubscribe = store.subscribe(()=> {
      this.setState(store.getState())
    })
  }

    onButtonPress() {
        var tasksRef = database.ref(`/users/${this.state.auth.user}`).child('tasks')
        var newTaskRef = tasksRef.push();
        newTaskRef.set({
            name: this.state.task,
            completed: false
        });
    }

   
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ marginTop: 50 }}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{ marginTop: 100 }}>
                        <View>
                            <CardSection>
                                <Input
                                    label="NewTask"
                                    placeholder="new task"
                                    onChangeText={(task) => this.setState({ task })}
                                    value={this.state.task}
                                />
                            </CardSection>
                            <CardSection>
                            <Button onPress={()=>{this.onButtonPress()}}></Button>
                            </CardSection>
                            <CardSection>
                                <TouchableHighlight onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <Text>Return to Todo List</Text>
                                </TouchableHighlight>
                            </CardSection>

                        </View>
                    </View>
                </Modal>

                <TouchableHighlight onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Add a Task</Text>
                </TouchableHighlight>
            </View>
        );
    }
}