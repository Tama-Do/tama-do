import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, FlatList, TouchableHighlight, Dimensions, Image } from 'react-native';
import AnimatedSprite from 'react-native-animated-sprite';
import { connect } from 'react-redux';
import monsterSprite from '../sprites/monster/monsterSprite';
import { removeTreat } from '../reducers/treats';
import { increasePet } from '../reducers/pets';
import database from '../firebase.js';
import treatPaths from './TreatPaths';

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
        };
        this.feedPet = this.feedPet.bind(this);
        this.onPress = this.onPress.bind(this);
        this.showTreats = this.showTreats.bind(this);
    }

    componentDidMount() {
        let userId = this.props.auth.user;
        const petKey = this.props.petKey;
        database.ref(`/users/${userId}/pets/${petKey}`).on('value', (snapshot) => {
            let pet = snapshot.val();
            this.setState({pet: null}, () => this.setState({ pet: pet }));
        })
    }

    componentWillUnmount() {
        let userId = this.props.auth.user
        const petKey = this.props.petKey;
        database.ref(`/users/${userId}/pets/${petKey}`).off
    }

    // static navigationOptions = ({ navigation, screenProps }) => ({
    //     title: navigation.state.params.name
    // });

    _keyExtractor = (item) => item.key

    onPress() {
        this.setState({ animationType: 'CELEBRATE' });
        setTimeout(() => this.setState({ animationType: 'IDLE' }), 1200)
    }

    showTreats() {
        const oldState = this.state.showTreats;
        this.setState({ showTreats: !oldState })
    }

    // tweenSprite () {
    //     const coords = this.refs.monsterRef.getCoordinates();
    //     const location = [0, 100, 200, 300, 400, 500];
    //     this.setState({
    //     tweenOptions: {
    //         tweenType: 'sineWave',
    //         startXY: [coords.left, coords.top],
    //         xTo: [sample(location), sample(location)],
    //         yTo: [sample(location), sample(location)],
    //         duration: 1000,
    //         loop: false,
    //     }
    //     }, () => {
    //     this.refs.monsterRef.startTween();
    //     });
    // }

    feedPet(treat) {
        let userId = this.props.auth.user
        // remove treat from database
        const quantity = treat.quantity - 1;
        this.props.removeTreat(userId, treat.key, quantity);
        // increase size of pet
        const petKey = this.props.petKey;
        const points = treat.points + this.state.pet.size;
        this.props.increasePet(userId, petKey, points);
        // pet eating animation
        this.setState({ animationType: 'EAT' });
        setTimeout(() => this.setState({ animationType: 'IDLE' }), 1200)
    }

    onLayout = event => {
        if (this.state.spriteDimensions) return // layout was already called
        const size = this.state.pet.size;
        const length = 70 + size * 5;
        let {width, height} = event.nativeEvent.layout;
        let spriteVertical = (height / 2) - (length / 1.5);
        this.setState({spriteVertical: null}, () => this.setState({ spriteVertical }));
    }

    render() {

        if (!this.state.pet) return null

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

                <View style={styles.feedContainer}>
                    {
                        !this.state.showTreats ? null :
                            <View style={styles.treatsContainer}>
                                <FlatList
                                    horizontal={true}
                                    data={this.props.treats}
                                    removeClippedSubviews={false}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={({ item }) =>
                                        <TouchableHighlight
                                            style={styles.treat}
                                            onPress={() => this.feedPet(item)}
                                            underlayColor="white"
                                            activeOpacity={0.7}
                                        >
                                            <View>
                                                <Image source={treatPaths[item.type]}/>
                                                <Text>{item.quantity}</Text>
                                            </View>

                                        </TouchableHighlight>

                                    }
                                />
                            </View>
                    }
                    <Button
                        style={styles.button}
                        onPress={() => { this.showTreats() }}
                        title="Feed me!"
                        color="#841584"
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
});

const mapState = ({ pets, treats, auth }) => ({ pets, treats, auth })

const mapDispatch = { increasePet, removeTreat }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
