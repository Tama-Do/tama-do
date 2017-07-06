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
import TreatPaths from './helpers/TreatPaths'


export default class NewTreatModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task: '',
            auth: null,
            modalVisible: true
        }
    }

    componentDidMount() {
        let unsubscribe = store.subscribe(() => {
            this.setState(store.getState())
        })
    }

    generateText(treatType) {
        console.log('treatType', treatType)
        switch (treatType) {
            case 'cherry':
                return 'YOU GOT CHERRIES!'
            case 'donut':
                return 'YOU GOT A DONUT!'
            case 'candy':
                return 'YOU GOT CANDY!'
            default:
                return 'YOU GOT A TREAT!'
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                <View style={styles.background}>
                    <View style={styles.treatContainer}>
                        <Text style={styles.text}>{this.generateText(this.props.treat)}</Text>
                        <Image source={TreatPaths[this.props.treat]}/>
                    </View>
                </View>
                </Modal>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    treatContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    text: {
        fontSize: 30,
        fontWeight: '600',
        color: '#6D45AD'
    }
})
