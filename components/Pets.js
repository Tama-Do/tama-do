import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import database from '../firebase';
import { fetchPets } from '../reducers/pets';
import { Pet } from './Pet'
import { monsterImg } from './helpers/monsterPicker';
// import Icon from 'react-native-vector-icons/Ionicons';
// const myIcon = (<Icon name="ios-person" size={30} color="#900" />)
import { Entypo } from '@expo/vector-icons';
import { EditPet } from './EditPet';

class Pets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // ** if we are using redux, we probably don't need a stateful container
      pets: this.props.pets
    }
    this.viewPet = this.viewPet.bind(this)
  }

  _keyExtractor = (item) => item.key

  componentDidMount() {

    // ** If we don't use redux, we would set state on containers by directly
    // ** listening to the database

    // database.ref('/pets/0').on('value', (snapshot) => {
    //   this.setState({pets: snapshot.val()})
    // })

  }

  viewPet(pet) {
    this.props.navigation.navigate('Pet', pet)
  }
  editPets() {
    this.props.navigation.navigate('EditPet')
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
                <TouchableOpacity
                  onPress={() => this.viewPet(item)}
                  underlayColor="white"
                  activeOpacity={0.8}
                >
                  <View style={styles.listItem}>
                    <View style={styles.listContent}>
                      <Image
                        source={monsterImg[item.type].notClicked}
                        style={styles.image}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.name}>{item.name.toUpperCase()}</Text>
                        <Text style={styles.location}>{item.location}</Text>
                      </View>
                    </View>
                    <View style={styles.icon}>
                      <Entypo name="chevron-right" size={32} color="#808080" />
                    </View>

                  </View>
                </TouchableOpacity>
              }
          />
          <View style={styles.text1Container}>
            <TouchableOpacity onPress={() => {this.editPets()}}>
              <Text style={styles.text1}>
                Edit Pet Names and Locations
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatlist: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  listItem: {
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#d9d9d9",
    marginBottom: 10
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 0
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 0,
    paddingLeft: 0
  },
  location: {
    fontSize: 16,
    color: '#808080',
    fontStyle: 'italic'
  },
  textContainer: {
    marginLeft: 30,
  },
  icon: {
    paddingRight: 25
  },
  text1: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    //fontWeight: 'bold',
    fontStyle: 'italic'
  },
  text1Container:{
    height: 40
  }
})

const mapState = ({pets}) => ({pets})

const mapDispatch = { }

const PetsContainer = connect(mapState, mapDispatch)(Pets);

export default PetsContainer
