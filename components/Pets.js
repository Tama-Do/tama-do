import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'

import database from '../firebase';
import { fetchPets } from '../reducers/pets';



class Pets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // ** if we are using redux, we probably don't need a stateful container
      pets: this.props.pets
    }
  }

  componentDidMount() {

    // ** If we don't use redux, we would set state on containers by directly
    // ** listening to the database

    // database.ref('/pets/0').on('value', (snapshot) => {
    //   this.setState({pets: snapshot.val()})
    //   console.log('this.state in pets', this.state)
    // })

  }

  render() {
    return (
      <View style={styles.container} >
        <Text>My Monster</Text>
        <Text>{this.props.pets.name}</Text>
        <Text>Latitude: {this.props.pets.latitude}</Text>
        <Text>Longitude: {this.props.pets.longitude}</Text>
        <Image source={require('../sprites/monster/monster_eat02.png')} />
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const mapState = ({pets}) => ({pets})

const mapDispatch = { }

export default connect(mapState, mapDispatch)(Pets);
