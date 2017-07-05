import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';
import { connect } from 'react-redux';
import { monsterImg } from './helpers/monsterPicker';


class EditPet extends Component {
        state = {
      selected: false,
      petKey: null,
    }

  goToLocationForm = () => {
    this.setState({component: 'form', selected: false})
  }

  pickAMonster = (petKey) => {
    this.setState({petKey, selected: true})
  }


    render() {
return (
    <View>
            <GiftedForm style={styles.form}
                formName='locationSearch'
            >
                  <View style={styles.row}>
      {this.props.pets.map(pet => (

        <View key={pet.key} style={{alignContent: 'center'}}>
          <TouchableHighlight key={pet.name} onPress={() => this.pickAMonster(pet.key)}>
        <Image style={styles.petImage} source={this.state.selected && pet.key === this.state.petKey ? monsterImg[pet.type].clicked : monsterImg[pet.type].notClicked}/>
        </TouchableHighlight>
        <Text  style={styles.row}>{pet.name}</Text>
        <Text style={styles.row}>{pet.location}</Text>
        </View>
        ))}
        </View>
                <GooglePlacesWidget style={styles.googlePlaces}
                    name='locationSearch'
                    placeholder='Search for location'
                />
                <GiftedForm.SubmitWidget
                    title='Submit'
                    widgetStyles={{
                        submitButton: {
                            backgroundColor: '#2185D0',
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null) => {
                        if (isValid) {
                            let updates = {
                                latitude: values.locationSearch.details.geometry.location.lat,
                                longitude: values.locationSearch.details.geometry.location.lng
                            }
                            database.ref(`/users/${this.props.auth.user}/pets/${this.state.petKey}`).update(updates)
                                .then(response => console.log("success response", response))
                                .catch(error => console.log("error is", error))

                            postSubmit()
                            this.props.navigation.goBack()
                        }
                    }
                    } />
            </GiftedForm>
            </View>
        )
}
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    paddingTop: 10,
    paddingBottom: 10
  },
  petImage: {
    height: 100,
    width: 100,
    paddingBottom: 10
  }

});


const mapState = ({ pets, auth }) => ({ pets, auth });

const mapDispatch = {}


export default connect(mapState, mapDispatch)(EditPet)
