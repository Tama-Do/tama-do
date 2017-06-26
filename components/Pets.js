import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
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

  _keyExtractor = (item) => item.name

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
        <Text style={styles.heading}>My Monsters</Text>
          <FlatList
              style={{flex: 1}}
              data={this.props.pets}
              keyExtractor={this._keyExtractor}
              removeClippedSubviews={false}
              renderItem={({ item }) =>
                <View style={styles.listItem}>
                  <Image
                    source={require('../sprites/monster/monster_eat02.png')}
                    style={styles.itemImage}
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>{item.location}</Text>
                </View>
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
  heading: {
    fontSize: 18,
    paddingBottom: 30
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

export default connect(mapState, mapDispatch)(Pets);
