import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, TouchableOpacity, TextInput, Button, Image, StyleSheet } from 'react-native'
import { Card, CardSection, Input, Spinner } from './common';
import database from '../firebase'
import store from '../store'



export default class AddTaskModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task: '',
            auth: null,
            modalVisible: false
        }
    }

    componentDidMount() {
        let unsubscribe = store.subscribe(() => {
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


    // state = {
    //     modalVisible: false,
    // }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{ flex: 1, position: 'absolute', top: 150 }}>
                        <View>
                            <CardSection>
                            <View style={{position: 'absolute', right: 10}}>
                             <TouchableHighlight onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <Text>x</Text>
                                </TouchableHighlight>
                            </View>
                                <Input
                                    label="NewTask"
                                    placeholder="new task"
                                    onChangeText={(task) => this.setState({ task })}
                                    value={this.state.task}
                                />
                            </CardSection>
                            <CardSection>
                                {/*<Button title={'Add Task'} onPress={()=>{this.onButtonPress()}}>Add Task</Button>*/}
                                <TouchableOpacity onPress={() => { this.onButtonPress() }}>
                                    <Image source={require('./common/paw_check_mark-03.png')} />

                                </TouchableOpacity>
                            </CardSection>
                        
                               
                            

                        </View>
                    </View>
                </Modal>
                <View style={styles.pawPrintContainer}>
                    <TouchableHighlight onPress={() => {
                        this.setModalVisible(true)
                    }}>
                        <Image style={styles.pawprint} source={require('./common/paw_check_mark-03.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pawprintContainer: {
        flex: 1,
        
    },
    pawprint: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        opacity: .8,
        // left: 30,

        alignSelf: 'flex-end',

    },
    x: {
        position: 'absolute',
        right: 10
    }
})