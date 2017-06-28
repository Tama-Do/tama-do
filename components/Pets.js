import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import database from '../firebase';
import { fetchPets } from '../reducers/pets';
import { Pet } from './Pet'


class Pets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // ** if we are using redux, we probably don't need a stateful container
      pets: this.props.pets
    }
    this.viewPet = this.viewPet.bind(this)
  }

  _keyExtractor = (item) => item.name

  componentDidMount() {

    // ** If we don't use redux, we would set state on containers by directly
    // ** listening to the database

    // database.ref('/pets/0').on('value', (snapshot) => {
    //   this.setState({pets: snapshot.val()})
    //   console.log('this.state in pets', this.state)
    // })

  }

  viewPet(pet) {
    console.log('this.props.navigation.state', this.props.navigation.state)
    this.props.navigation.navigate('Pet', pet)
  }

  render() {
    return (
      <View style={styles.container} >
          <FlatList
              style={styles.flatlist}
              data={this.props.pets}
              keyExtractor={this._keyExtractor}
              removeClippedSubviews={false}
              renderItem={({ item }) =>
                <TouchableHighlight onPress={() => this.viewPet(item)}>
                  <View style={styles.listItem}>
                    <Image
                      source={require('../sprites/monster/monster_eat02.png')}
                      style={styles.itemImage}
                    />
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.location}</Text>
                  </View>
                </TouchableHighlight>
              }
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatlist: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  listItem: {

    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: {
    fontSize: 15,
  },
  itemImage: {
    width: 50,
    height: 50
  }
})

const mapState = ({pets}) => ({pets})

const mapDispatch = { }

const PetsContainer = connect(mapState, mapDispatch)(Pets);

export default PetsContainer

