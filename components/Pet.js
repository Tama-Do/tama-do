import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';
import AnimatedSprite from 'react-native-animated-sprite';
import sample from 'lodash.sample';
import { connect } from 'react-redux';
import monsterSprite from '../sprites/monster/monsterSprite';


class Pet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      animationType: 'WALK',
      tweenOptions: {},
      pet: this.props.navigation.state.params
    };
    console.log('this.props in Pet', this.props)
    console.log('this.state.pet', this.state.pet)
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name
  });

  onPress () {
    const animation = sample(monsterSprite.animationTypes);
    debugger;
    this.setState({ animationType: animation });
  }

  tweenSprite () {
    const coords = this.refs.monsterRef.getCoordinates();
    const location = [0, 100, 200, 300, 400, 500];
    this.setState({
      tweenOptions: {
        tweenType: 'sine-wave',
        startXY: [coords.left, coords.top],
        xTo: [sample(location), sample(location)],
        yTo: [sample(location), sample(location)],
        duration: 1000,
        loop: false,
      }
    }, () => {
      this.refs.monsterRef.startTween();
    });
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
          tweenOptions = {this.state.tweenOptions}
          tweenStart={'fromMethod'}
          onPress={() => {this.onPress();}}
        />
        <Button
          style={styles.button}
          onPress={() => {this.tweenSprite()}}
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
    paddingTop: 10
  },
  button: {
    paddingBottom: 10
  }
});

const mapState = ({pets}) => ({pets})

const mapDispatch = { }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
