import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    PanResponder,
    Animated,
    TouchableOpacity
} from 'react-native';
import AnimatedSprite from 'react-native-animated-sprite';
import { connect } from 'react-redux';
import Modal from 'react-native-modal'

import { removeTreat } from '../reducers/treats';
import { increasePet, addPetDate } from '../reducers/pets';
import database from '../firebase.js';
import { monsterPicker } from './helpers/monsterPicker';
import treatPaths from './helpers/TreatPaths';
import { distance } from './helpers/distance';
import TreatModal from './TreatModal';

class Pet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'IDLE',
            tweenOptions: {},
            pet: null,
            treats: this.props.treats,
            spriteVertical: null,
            checkedIn: false,
            showDraggable: false,
            dropZoneValues: null,
            pan: new Animated.ValueXY(),
            visibleModal: false,
            selectedTreat: null,
            lastVisit: null
        };
        this.feedPet = this.feedPet.bind(this);
        this.onPress = this.onPress.bind(this);
        this.distance = distance.bind(this);
        this.setDropZoneValues.bind(this);
        this.renderDraggable = this.renderDraggable.bind(this);

        // panResponder handles dragging animation and drop callbacks
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                if (this.isDropZone(gesture)) {
                    this.feedPet(this.state.selectedTreat);
                    this.state.pan.setValue({ x: 0, y: 0 })
                    this.setState({ showDraggable: false, selectedTreat: null })
                } else {
                    Animated.spring(
                        this.state.pan,
                        { toValue: { x: 0, y: 0 } }
                    ).start();
                }
            }
        });
    }

    setDropZoneValues(event) {
        this.setState({
            dropZoneValues: event.nativeEvent.layout
        });
    }

    isDropZone(gesture) {
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name
    });

    componentDidMount() {
        let userId = this.props.auth.user;
        const petKey = this.props.navigation.state.params.key;
        database.ref(`/users/${userId}/pets/${petKey}`).on('value', (snapshot) => {
            let pet = snapshot.val();
            // this.setState({ pet: pet})
            this.setState({ pet: null }, () => this.setState({ pet: pet }));
        })
        // Check if user is at pet's location
        const { latitude, longitude } = this.props.navigation.state.params;
        this.distance(latitude, longitude, userId, petKey);
    }

    componentWillUnmount() {
        let userId = this.props.auth.user
        const petKey = this.props.navigation.state.params.key;
        database.ref(`/users/${userId}/pets/${petKey}`).off
    }

    onLayout = event => {
        if (this.state.spriteDimensions) return // layout was already called
        const size = this.state.pet.size;
        const length = 70 + size * 5;
        let { width, height } = event.nativeEvent.layout;
        let spriteVertical = (height / 2) - (length / 1.5);
        this.setState({ spriteVertical: null }, () => this.setState({ spriteVertical }));
        this.setDropZoneValues(event);
    }

    onPress() {  //Petting the monster
        if (this.state.checkedIn) {
            this.setState({ animationType: 'CELEBRATE' });
            setTimeout(() => this.setState({ animationType: 'IDLE' }), 1200)
        }
    }

    feedPet(treat) {
        let userId = this.props.auth.user
        // remove a treat from database
        const quantity = treat.quantity - 1;
        this.props.removeTreat(userId, treat.key, quantity);
        // pet eating animation
        this.setState({ animationType: 'EAT' });
        setTimeout(() => {
            this.setState({ animationType: 'IDLE' })
            const petKey = this.props.navigation.state.params.key;
            const points = treat.points + this.state.pet.size;
            this.props.increasePet(userId, petKey, points);
        }, 1200)
    }

    renderDraggable(treat) {
        if (this.state.showDraggable) {
            return (
                <View
                    style={styles.draggableContainer}
                    key={treat.key}>
                    <Animated.Image
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout()]}>
                        <Image source={treatPaths[treat.type]} />
                    </Animated.Image>
                </View>
            );
        }
    }

    setTreat = (treat) => {
        this.setState({
            selectedTreat: treat,
            showDraggable: true,
            visibleModal: false
        });
    }

    toggleModal = (bool) => {
        this.setState({ visibleModal: bool})
    }

    // _renderButton = (text, onPress) => {
    //     if (!this.state.showDraggable && this.state.checkedIn) {
    //         return (
    //         <View style={modalStyles.buttonContainer}>
    //             <TouchableOpacity onPress={onPress}>
    //                 <View style={modalStyles.button}>
    //                     <Text style={modalStyles.buttonText}>{text}</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         </View>

    //         )
    //     }
    // };

    // _renderModalContent = () => (
    //     <View style={modalStyles.modalContent}>
    //         {this.props.treats.map(treat =>
    //             <View key={treat.key} style={modalStyles.treats}>
    //                 <TouchableOpacity
    //                     onPress={() => this.setTreat(treat)}>
    //                     <Image style={modalStyles.treatIcon} source={treatPaths[treat.type]} />
    //                 </TouchableOpacity>
    //                 <View style={modalStyles.quantityContainer}>
    //                     <Text style={modalStyles.quantity}>{treat.quantity}</Text>
    //                 </View>
    //             </View>
    //         )}
    //         <View style={modalStyles.buttonContainer}>
    //             <TouchableOpacity onPress={() => this.setState({ visibleModal: false })}>
    //                 <View style={modalStyles.closeButton}>
    //                     <Text style={modalStyles.buttonX}>X</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         </View>

    //     </View>);

    renderSprite = () => {
        // select appropriate sprite file
        const spriteFile = monsterPicker(this.state.pet)
        // calculate size of the pet
        const petLength = 70 + this.state.pet.size * 5;
        const xlocation = petLength / 2;
        return !this.state.spriteVertical ? null :
            <AnimatedSprite
                ref={'monsterRef'}
                sprite={spriteFile}
                animationFrameIndex={spriteFile.animationIndex(this.state.animationType)}
                loopAnimation={true}
                coordinates={{
                    top: this.state.spriteVertical,
                    left: -xlocation,
                }}
                size={{
                    width: petLength,
                    height: petLength,
                }}
                draggable={true}
                tweenOptions={this.state.tweenOptions}
                tweenStart={'fromMethod'}
                onPress={() => { this.onPress(); }}
            />

    }

    render() {
        if (!this.state.pet) {
            return null
        }
        return (
            <View style={styles.container}>

                <View style={styles.spriteContainer} onLayout={this.onLayout}>
                    { this.renderSprite() }
                </View>

                {this.state.checkedIn ? null : <View style={styles.overlay}></View>}

                <View style={styles.feedContainer}>

                    {this.renderDraggable(this.state.selectedTreat)}

                    {
                        this.state.checkedIn ? null :
                        <View>
                            <Text style={styles.far}>You are too far away!</Text>
                            {
                                this.state.lastVisit ?
                                <Text style={styles.visit}>You haven't visited me since {this.state.lastVisit}</Text>
                                : null
                            }
                        </View>

                    }

                    <TreatModal
                        showDraggable={this.state.showDraggable}
                        checkedIn={this.state.checkedIn}
                        toggleModal={this.toggleModal}
                        treats={this.props.treats}
                        setTreat={this.setTreat}
                        isModalVisible={this.state.visibleModal}
                    />
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    header: {
        paddingTop: 10,
        flex: 1
    },
    spriteContainer: {
        flex: 4,
        backgroundColor: 'white'
    },
    feedContainer: {
        flex: 1,
    },
    button: {
        paddingBottom: 10,
        flex: 2
    },
    treatsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    treat: {
        marginBottom: 5,
        padding: 5
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    draggableContainer: {
        position: 'absolute',
        top: 0,
        left: -60
    },
    far: {
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
    },
    visit: {
        marginTop: 5,
        color: '#808080',
        fontSize: 16,
        textAlign: 'center',
    }
});


const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'flex-start'
    },
    button: {
        padding: 12,
        paddingRight: 130,
        paddingLeft: 130,
        justifyContent: 'center',
        // flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#F0B52D',
        borderColor: '#EAA00C',
        marginLeft: 10,
        marginRight: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    closeButton: {
        backgroundColor: '#F0B52D',
        padding: 6,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 25,
        height: 25,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonX: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10
    },
    modalContent: {
        backgroundColor: 'white',
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        flexDirection: 'row'
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    treats: {
        flex: 1,
        flexDirection: 'row',
    },
    treatIcon: {
        width: 70,
        height: 70
    },
    quantityContainer: {
        marginRight: 10,
        marginLeft: -8
    },
    quantity: {
        color: '#808080',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const mapState = ({ pets, treats, auth }) => ({ pets, treats, auth })

const mapDispatch = { increasePet, removeTreat, addPetDate }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
