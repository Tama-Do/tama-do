import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text,FlatList, ScrollView} from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';
import { connect } from 'react-redux';
import { monsterImg } from './helpers/monsterPicker';
import { CardEditPet, CardSectionEditPet, InputEditPet } from './common';
import { Button1 } from './common/ButtonEditPet';
import { Button2 } from './common/ButtonEditLocation';


class EditPet extends Component {
  state = {
    selected: false,
    petKey: null,
    monsterName: null
  }

  goToLocationForm = () => {
    this.setState({ component: 'form', selected: false })
    this.props.navigation.navigate('Form')
  }

  goToRenamePet = () => {
    this.props.navigation.navigate('RenamePet', this.state)
  }

  pickAMonster = (petKey) => {
    let monName = this.props.pets[petKey].name
    this.setState({ petKey, selected: true, monsterName: monName})
  }

  // nameMonster = () => {
  //   return this.state.monsterName === null ? <Text style={styles.selectedText}>SELECT PET</Text> : null
  // }

  renameButton = () => {
    return this.state.monsterName !== null ?  <Button1 onPress={() => this.goToRenamePet()}>RENAME {this.state.monsterName}</Button1> : null
  }

  locationButton = () => {
    return this.state.monsterName !== null ?  <Button2 onPress={() => this.goToLocationForm()}>ADD/CHANGE {this.state.monsterName}S LOCATION</Button2> : null
  }

  // componentDidUpdate() {
  //   this.nameMonster()
  // }


  render() {
    const { navigate } = this.props.navigation
    return (
      <View>



              <View style={styles.textContainer}>
                <Text style={styles.selectedText}>SELECT PET</Text>
              </View>




        <GiftedForm style={styles.form} formName='locationSearch'>
          <View style={styles.row}>
            {this.props.pets.map(pet => (

              <View key={pet.key} style={styles.petIcon}>
                <TouchableOpacity activeOpacity={0.7} key={pet.name} onPress={() => this.pickAMonster(pet.key)}>
                  <Image style={styles.petImage} source={this.state.selected && pet.key === this.state.petKey ? monsterImg[pet.type].clicked : monsterImg[pet.type].notClicked} />
                </TouchableOpacity>
                <Text style={styles.name}>{pet.name.toUpperCase()}</Text>
                <Text style={styles.location}>{pet.location}</Text>
              </View>
            ))}
          </View>

        </GiftedForm>

        <View style={styles.selectedTextView}>

          {this.renameButton()}
          {this.locationButton()}
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    bottom:30
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  petIcon: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  },
  petImage: {
    height: 100,
    width: 100,
    marginLeft: 10
  },
  name: {
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  location: {
    textAlign: 'center',
    fontSize: 14,
    color: '#808080',
    fontStyle: 'italic'
  },
  form: {
    backgroundColor: 'white',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  googlePlaces: {
    backgroundColor: 'white'
  },
  selectedText: {
    textAlign: 'center',
    fontSize: 24,
    //fontWeight: 'bold',
    color: 'black'
  },
  selectedTextView: {
    top: 20
  },
  container1: {
    flex: 1,
    top:10,
    backgroundColor: 'white'
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    marginTop:5,
    marginBottom: 5,
    paddingTop:10,
    paddingBottom:10,
    top:5,
    backgroundColor: '#FFF'
  },
  flatList: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#D9D9D9',
    paddingBottom: 10
  }
});


const mapState = ({ pets, auth, monsterName, petKey }) => ({ pets, auth, monsterName, petKey });

const mapDispatch = {}


export default connect(mapState, mapDispatch)(EditPet)
