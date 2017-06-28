import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, FlatList, Image, TouchableHighlight } from 'react-native';
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
      pet: this.props.navigation.state.params,
      treat: this.props.treats,
      seeTreats: false
    };
    this.showTreats = this.showTreats.bind(this)
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name
  });

  // onPress () {
  //   const animation = sample(monsterSprite.animationTypes);
  //   debugger;
  //   this.setState({ animationType: animation });
  // }

  onPress() {
    console.log('Pet the monster')
  }

  _keyExtractor = (item) => item.type

  showTreats () {
    var oldState = this.state.seeTreats
    this.setState({ seeTreats: !oldState })
  }

  feedPet(treat) {
    console.log('Feed Pet: ', treat.type)
    // remove treat instance from the database and redux store
    // reflect action in the pet - increase happiness/size counter?
    // update the pet in the database and redux store
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Home: {this.props.navigation.state.params.location}</Text>
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
          onPress={() => {this.showTreats()}}
          title="Feed me!"
          color="#841584"
        />
        {!this.state.seeTreats ? null :
          <View style={styles.treatList}>
            <FlatList
              data={this.props.treats}
              removeClippedSubviews={false}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) =>

                <TouchableHighlight
                  onPress={() => this.feedPet(item)}
                  underlayColor="white"
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={styles.item}>{item.type}</Text>
                    <Image source={require('../sprites/treats/cupcake.png')}
          style={{width: 40, height: 40}} />
                  </View>
                </TouchableHighlight>

            }
            />
          </View>

        }

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
  },
  treatList: {
    flex: 1
  }
});

const mapState = ({pets, treats}) => ({pets, treats})

const mapDispatch = { }

const PetContainer = connect(mapState, mapDispatch)(Pet);

export default PetContainer;
