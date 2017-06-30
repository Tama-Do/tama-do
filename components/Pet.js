import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, FlatList, TouchableHighlight, Dimensions, Image } from 'react-native';
import AnimatedSprite from 'react-native-animated-sprite';
import sample from 'lodash.sample';
import { connect } from 'react-redux';
import monsterSprite from '../sprites/monster/monsterSprite';
import { removeTreat } from '../reducers/treats';
import { increasePet } from '../reducers/pets';
import database from '../firebase.js';

class Pet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'IDLE',
            tweenOptions: {},
            pet: {},
            treats: this.props.treats,
            showTreats: false,
        };
        this.feedPet = this.feedPet.bind(this);
        this.onPress = this.onPress.bind(this);
        this.showTreats = this.showTreats.bind(this);
    }

    componentDidMount() {
        const userId = 1;
        const petId = this.props.navigation.state.params.id;
        database.ref(`/users/${userId}/pets/${petId}`).on('value', (snapshot) => {
            let pet = snapshot.val();
            this.setState({pet: null}, () => this.setState({ pet: pet }));
        })
    }

    componentWillUnmount() {
        const userId = 1;
        const petId = this.props.navigation.state.params.id;
        database.ref(`/users/${userId}/pets/${petId}`).off
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name
    });

    _keyExtractor = (item) => item.id

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
        const userId = 1;
        // remove treat from database
        const quantity = treat.quantity - 1;
        this.props.removeTreat(userId, treat.id, quantity);
        // increase size of pet
        const petId = this.props.navigation.state.params.id;
        const points = treat.points + this.state.pet.size;
        this.props.increasePet(userId, petId, points);
        this.setState({ animationType: 'EAT' });
        setTimeout(() => this.setState({ animationType: 'IDLE' }), 1200)
        this.forceUpdate()
    }
    render() {

        if (!this.state.pet) return null
        const size = this.state.pet.size;
        const length = 70 + size * 5;
        const location = length / 2;
        const treatPaths = {
            cherry: require("../sprites/treats/cherry.jpg"),
            donut: require("../sprites/treats/donut.png"),
            candy: require("../sprites/treats/candy.png")
        }

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Location: {this.props.navigation.state.params.location}</Text>
                {
                    !(size && location) ? null :

                    <View style={{backgroundColor: 'steelblue', flex: 4, alignContent: 'center', justifyContent: 'center'}}>

                        <AnimatedSprite
                            ref={'monsterRef'}
                            sprite={monsterSprite}
                            animationFrameIndex={monsterSprite.animationIndex(this.state.animationType)}
                            loopAnimation={true}
                            coordinates={{
                                top: 0,
                                left: -location,
                            }}
                            size={{
                                width: length,
                                height: length,
                            }}
                            draggable={true}
                            tweenOptions={this.state.tweenOptions}
                            tweenStart={'fromMethod'}
                            onPress={() => { this.onPress(); }}
                        />

                    </View>
                }
                <View style={{flex: 2}}>
                    {
                        !this.state.showTreats ? null :
                            <View style={styles.treatsView}>
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
        justifyContent: 'space-around',
    },
    header: {
        paddingTop: 10,
        flex: 1
    },
    button: {
        paddingBottom: 10,
        flex: 2
    },
    treatsView: {
        flex: 1,
        flexDirection: 'row',
    },
    treat: {
        marginBottom: 5,
        padding: 5
    },
});

const mapState = ({ pets, treats }) => ({ pets, treats })

const mapDispatch = { increasePet, removeTreat }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
