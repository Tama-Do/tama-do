import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
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
        this.onButtonPress = this.onButtonPress.bind(this)
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
        this.setModalVisible(!this.state.modalVisible)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={styles.background}>
                        <View style={styles.modalContainer}>
                            <View style={styles.bodyContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.headerTextStyle}> NEW TASK </Text>
                                    <TouchableHighlight style={styles.x}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible)
                                        }}>
                                        <Text style={styles.xtext}>   x   </Text>
                                    </TouchableHighlight>
                                </View>
                                <View>
                                    <TextInput style={styles.textInput}
                                        placeholder="task description"
                                        onChangeText={(task) => this.setState({ task })}
                                        value={this.state.task}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => this.onButtonPress()}
                                        style={styles.buttonStyle}>
                                        <Text style={styles.buttonTextStyle}>
                                            ADD NEW TASK
                                    </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
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
    modalContainer: {
        flex: 1,
        alignSelf:
        'stretch',
        top: 160
    },
    bodyContainer: {
        backgroundColor: 'white',
        height: 175,
        flexDirection: 'column',
        justifyItems: 'center',
        borderBottomRadius: .1,
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        borderTopRadius: .1,
        borderTopWidth: 1,
        borderTopColor: '#6D45AD'
    },

    headerContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        justifyContent: 'space-between',
        backgroundColor: '#8061A9',
        marginBottom: 20,
    },
    headerTextStyle: {
        paddingTop: 6,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    pawprintContainer: {
        flex: 1,

    },
    pawprint: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        opacity: .8,
        alignSelf: 'flex-end',

    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    x: {
        height: 25,
        paddingTop: 4,
        paddingBottom: 10
    },
    xtext: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    textInput: {
        height: 25,
        textAlign: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    buttonStyle: {
        flex: 0,
        // alignSelf: 'stretch',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#6D45AD',
        backgroundColor: '#8061A9',
        marginLeft: 5,
        marginRight: 5
    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
})
