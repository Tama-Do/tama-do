import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, FlatList, TouchableHighlight } from 'react-native';
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
            showTreats: false
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
            this.setState({ pet: pet })
        })
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
        console.log('feed monster button pressed')
        const oldState = this.state.showTreats;
        this.setState({ showTreats: !oldState })
    }

    feedPet(treat) {
        console.log(`clicked on ${treat.type}`)
        const userId = 1;
        // remove treat from database
        const quantity = treat.quantity - 1;
        this.props.removeTreat(userId, treat.id, quantity);
        // increase size of pet
        const petId = this.props.navigation.state.params.id;
        const points = treat.points + this.state.pet.size;
        this.props.increasePet(userId, petId, points);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Location: {this.props.navigation.state.params.location}</Text>
                <AnimatedSprite
                    ref={'monsterRef'}
                    sprite={monsterSprite}
                    animationFrameIndex={monsterSprite.animationIndex(this.state.animationType)}
                    loopAnimation={true}
                    coordinates={{
                        top: 10,
                        left: 10,
                    }}
                    size={{
                        width: monsterSprite.size.width * 1.5,
                        height: monsterSprite.size.height * 1.5,
                    }}
                    draggable={true}
                    tweenOptions={this.state.tweenOptions}
                    tweenStart={'fromMethod'}
                    onPress={() => { this.onPress(); }}
                />
                {
                    !this.state.showTreats ? null :
                        <View style={styles.treatsView}>
                            <FlatList
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
                                        <Text>{item.type}</Text>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        paddingTop: 10,
        flex: 5
    },
    button: {
        paddingBottom: 10,
        flex: 2
    },
    treatsView: {
        height: 50,
        flex: 1,
        justifyContent: 'flex-end'
    },
    treat: {
        marginBottom: 5,
        padding: 5
    }
});

const mapState = ({ pets, treats }) => ({ pets, treats })

const mapDispatch = { increasePet, removeTreat }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
