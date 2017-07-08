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
        this.distance = distance.bind(this);

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

    setDropZoneValues = event => {
        this.setState({
            dropZoneValues: event.nativeEvent.layout
        });
    }

    isDropZone = gesture => {
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    renderDraggable = (treat) => {
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

    // Stack Navigator - option to have the monster's name appear at top of
    // navigation when navigating to Pet view
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name
    });

    componentDidMount() {
        let userId = this.props.auth.user;
        const petKey = this.props.navigation.state.params.key;
        // Listen directly to firebase for user's Pet
        database.ref(`/users/${userId}/pets/${petKey}`).on('value', (snapshot) => {
            let pet = snapshot.val();
            this.setState({ pet: null }, () => this.setState({ pet: pet }));
        })
        // Check if user is at pet's location
        const { latitude, longitude } = this.props.navigation.state.params;
        this.distance(latitude, longitude, userId, petKey);
    }

    componentWillUnmount() {
        // Remove firebase listeners
        let userId = this.props.auth.user
        const petKey = this.props.navigation.state.params.key;
        database.ref(`/users/${userId}/pets/${petKey}`).off
    }

    // Calculate the display size of the monster based on size property in database
    // The monster sprite is assumed to be a square
    monsterDimensions = (petSize) => 70 + this.state.pet.size * 5

    // Center the pet vertically each time the pet grows
    // Set the dropzone for the treat to trigger pet feeding
    onLayout = event => {
        // if (this.state.spriteVertical) return // layout was already called
        const length = this.monsterDimensions(this.state.pet.size);
        let { height } = event.nativeEvent.layout;
        let spriteVertical = (height / 2) - (length / 1.5);
        this.setState({ spriteVertical: null }, () => this.setState({ spriteVertical }));
        this.setDropZoneValues(event);
    }

    petMonster = () => {
        if (this.state.checkedIn) {
            this.setState({ animationType: 'CELEBRATE' });
            setTimeout(() => this.setState({ animationType: 'IDLE' }), 1200)
        }
    }

    // Toggle Treat Modal visibility
    toggleModal = bool => {
        this.setState({ visibleModal: bool })
    }

    setTreat = treat => {
        this.setState({
            selectedTreat: treat,
            showDraggable: true,
            visibleModal: false
        });
    }

    // 1. Decrease treat quantity by 1
    // 2. Pet eating animation
    // 3. increase the size of the pet
    feedPet = (treat) => {
        let userId = this.props.auth.user
        const quantity = treat.quantity - 1;
        this.props.removeTreat(userId, treat.key, quantity);
        this.setState({ animationType: 'EAT' });
        setTimeout(() => {
            this.setState({ animationType: 'IDLE' })
            const petKey = this.props.navigation.state.params.key;
            const points = treat.points + this.state.pet.size;
            this.props.increasePet(userId, petKey, points);
        }, 1200)
    }

    renderSprite = () => {
        const spriteFile = monsterPicker(this.state.pet)
        const petLength = this.monsterDimensions(this.state.pet.size)
        const xlocation = petLength / 2; // pet is anchored on the top left corner
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
                onPress={() => { this.petMonster(); }}
            />
    }

    unvisitedSpriteMessage = (checkedIn, lastVisit) => {
        return checkedIn ? null :
            <View>
                <Text style={styles.far}>You are too far away!</Text>
                {
                    this.state.lastVisit ?
                        <Text style={styles.visit}>You haven't visited me since {lastVisit}</Text>
                        : null
                }
            </View>
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

                { this.state.checkedIn ? null : <View style={styles.overlay}></View> }

                <View style={styles.feedContainer}>
                    { this.renderDraggable(this.state.selectedTreat) }
                    { this.unvisitedSpriteMessage(this.state.checkedIn, this.state.lastVisit) }
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

const mapState = ({ pets, treats, auth }) => ({ pets, treats, auth })

const mapDispatch = { increasePet, removeTreat, addPetDate }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
