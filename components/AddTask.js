import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    Button,
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
                    <View style={styles.modalContainer}>
                        <View style={styles.bodyContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerTextStyle}> NEW TASK </Text>
                                <TouchableHighlight
                                    style={{ height: 25, paddingTop: 4, paddingBottom: 10 }}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                    }}>
                                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>   x   </Text>
                                </TouchableHighlight>
                            </View>
                            <View>
                            <TextInput style={{height:25, textAlign: 'center', backgroundColor: 'white', justifyContent: 'center' }}
                                placeholder="task description"
                                onChangeText={(task) => this.setState({ task })}
                                value={this.state.task}
                            />
                            </View>
                            <View style={styles.buttonContainer}>
                                {<Button style={styles.buttonStyle} title={'ADD NEW TASK'} onPress={() => { this.onButtonPress() }} />}
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
    },

    buttonContainer: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#8061A9'
    },
    buttonStyle: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#8061A9',
        borderColor: '#6D45AD',
        color: 'white',
        marginLeft: 10,
        marginRight: 10

    },
    modalContainer: {
        flex: 1,
        alignSelf:
        'stretch',
        top: 160
    },
    headerContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        justifyContent: 'space-between',
        backgroundColor: '#8061A9',
        marginBottom: 20
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
        borderTopColor: '#D9D9D9'
    },
    headerTextStyle: {
        paddingTop: 6,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }

})