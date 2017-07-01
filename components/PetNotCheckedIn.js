import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, FlatList, TouchableHighlight, Dimensions, Image } from 'react-native';
import AnimatedSprite from 'react-native-animated-sprite';
import { connect } from 'react-redux';
import monsterSprite from '../sprites/monster/monsterSprite';
import database from '../firebase.js';

class PetNotCheckedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'IDLE',
            tweenOptions: {},
            pet: null,
            showTreats: false,
            spriteVertical: null
        };
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
        let userId = this.props.auth.user;
        const petKey = this.props.petKey;
        database.ref(`/users/${userId}/pets/${petKey}`).off;
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
                        />
                }
                </View>
                <View style={styles.overlay}></View>
                <View style={styles.feedContainer}>
                  <Button
                      style={styles.button}
                      title="Feed me!"
                      onPress={() => console.log('You are too far away from pet!')}
                      color={'rgba(0, 0, 0, 0.3)'}
                  />
                  <Text>You're too far away to feed me!</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1.0)'
    },
    header: {
        paddingTop: 10,
        flex: 1
    },
    spriteContainer: {
        flex: 4,
    },
    feedContainer: {
        flex: 2,
        backgroundColor: 'rgba(255, 255, 255, 1.0)'
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
  overlay:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  }
});

const mapState = ({ pets, auth }) => ({ pets, auth });

const mapDispatch = { };

const PetNotCheckedInContainer = connect(mapState, mapDispatch)(PetNotCheckedIn);

export default PetNotCheckedInContainer;
