import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableHighlight,
    Dimensions,
    Image,
    PanResponder,
    Animated,
    TouchableOpacity
} from 'react-native';
import AnimatedSprite from 'react-native-animated-sprite';
import { connect } from 'react-redux';
import Modal from 'react-native-modal'

import monsterSprite from '../sprites/monster/monsterSprite';
import { removeTreat } from '../reducers/treats';
import { increasePet } from '../reducers/pets';
import database from '../firebase.js';
import treatPaths from './helpers/TreatPaths';
import { distance } from './helpers/distance';

class Pet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'IDLE',
            tweenOptions: {},
            pet: null,
            treats: this.props.treats,
            showTreats: false,
            spriteVertical: null,
            checkedIn: false,
            showDraggable: true,
            dropZoneValues  : null,
            pan: new Animated.ValueXY(),
            visibleModal: false,
            selectedTreat: null
        };
        this.feedPet = this.feedPet.bind(this);
        this.onPress = this.onPress.bind(this);
        this.showTreats = this.showTreats.bind(this);
        this.buttonColor = this.buttonColor.bind(this);
        this.distance = distance.bind(this);
        this.setDropZoneValues.bind(this);
        this.renderDraggable = this.renderDraggable.bind(this);

        // panResponder handles dragging animation and drop callbacks
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null,{
                dx : this.state.pan.x,
                dy : this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                if(this.isDropZone(gesture)){
                    this.setState({
                        showDraggable : false
                    });
                    this.feedPet(this.state.selectedTreat);
                    this.setState({selectedTreat: null, showTreats: false})
                } else {
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start();
                }
            }
        });
    }

    setDropZoneValues(event){
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }

    isDropZone(gesture){
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
            this.setState({ pet: null }, () => this.setState({ pet: pet }));
        })
        // Check if user is at pet's location
        const { latitude, longitude } = this.props.navigation.state.params;
        this.distance(latitude, longitude);
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

    buttonColor() {
        return this.state.checkedIn ? "#841584" : 'rgba(0, 0, 0, 0.3)'
    }

    onPress() {  //Petting the monster
        if (this.state.checkedIn) {
            this.setState({ animationType: 'CELEBRATE' });
            setTimeout(() => this.setState({ animationType: 'IDLE' }), 1200)
        }
    }

    showTreats() {
        if (this.state.checkedIn) {
            const oldState = this.state.showTreats;
            this.setState({ showTreats: !oldState });
        }
    }

    feedPet(treat) {
        let userId = this.props.auth.user
        // remove a treat from database
        const quantity = treat.quantity - 1;
        this.props.removeTreat(userId, treat.key, quantity);
        // increase size of pet
        const petKey = this.props.navigation.state.params.key;
        const points = treat.points + this.state.pet.size;
        this.props.increasePet(userId, petKey, points);
        // pet eating animation
        this.setState({ animationType: 'EAT' });
        setTimeout(() => this.setState({ animationType: 'IDLE' }), 1200)
    }


    renderDraggable(treat){
        if (this.state.showDraggable){
            return (
                <View
                    style={styles.draggableContainer}
                    key={treat.key}
                >
                        <Animated.Image
                            {...this.panResponder.panHandlers}
                            style={[this.state.pan.getLayout()]}
                        >
                                <Image source={treatPaths[treat.type]} />
                        </Animated.Image>
                </View>
            );
        }
    }

    setTreat (treat) {
        console.log(`${treat.type} pressed`)
        this.setState({selectedTreat: treat})
        this.setState({showTreats: true})
        this.setState({visibleModal: false})
    }

  _renderButton = (text, onPress) => {

      // make button unclickable if user is too far away

      if (!this.state.showTreats) {
        return (<TouchableOpacity onPress={onPress}>
                    <View style={modalStyles.button}>
                        <Text>{text}</Text>
                    </View>
                </TouchableOpacity>
        )}

  };

  _renderModalContent = () => (
    <View style={modalStyles.modalContent}>
        {this.props.treats.map(treat =>
            <View key={treat.key}style={modalStyles.treats}>
                <TouchableHighlight
                    onPress={() => this.setTreat(treat)}>
                    <Image source={treatPaths[treat.type]} />
                </TouchableHighlight>
                <Text>{treat.quantity}</Text>
            </View>
            )}
      {this._renderButton('Close', () => this.setState({ visibleModal: false }))}
    </View> );


    _keyExtractor = (item) => item.key

    render() {
        if (!this.state.pet) return null

        // calculate size of the pet
        const petLength = 70 + this.state.pet.size * 5;
        const xlocation = petLength / 2;

        return (
            <View style={styles.container}>

                <Text style={styles.header}>Location: {this.state.pet.location}</Text>

                <View style={styles.spriteContainer} onLayout={this.onLayout}>
                    {
                        !this.state.spriteVertical ? null :
                            <AnimatedSprite
                                style={styles.sprite}
                                ref={'monsterRef'}
                                sprite={monsterSprite}
                                animationFrameIndex={monsterSprite.animationIndex(this.state.animationType)}
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
                </View>

                {this.state.checkedIn ? null : <View style={styles.overlay}></View>}

                <View style={styles.feedContainer}>
                    {
                        !this.state.showTreats ? null :
                        this.renderDraggable(this.state.selectedTreat)
                    }

                    {this.state.checkedIn ? null : <Text>You are too far away!</Text>}

                    {this._renderButton('Feed Me!', () => this.setState({ visibleModal: true }))}
                    <Modal
                        isVisible={this.state.visibleModal}
                        style={modalStyles.bottomModal}
                        backdropOpacity={0.2}
                    >
                        {this._renderModalContent()}
                    </Modal>
                </View>


            </View>
        );
    }
}

let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingTop: 10,
        flex: 1
    },
    spriteContainer: {
        flex: 4,
    },
    feedContainer: {
        flex: 2
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
        position    : 'absolute',
    }
});


const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
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
  }
});

const mapState = ({ pets, treats, auth }) => ({ pets, treats, auth })

const mapDispatch = { increasePet, removeTreat }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
