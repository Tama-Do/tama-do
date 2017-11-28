import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';
import { connect } from 'react-redux';
import { monsterImg } from './helpers/monsterPicker';
import { selectPet } from '../reducers/pets'

const warnings = {
  noLocation: "Please name your pet's location!",
  noPet: 'Please click a pet to select and edit its location!',
  noPetnoLocation: 'Please click a pet to select and edit its location.  Remember\
  to give your location a name!'}

class FormView extends Component {
  state = {
    form: {
      location: '',
      locationSearch: ''
    },
    warningText: ''
  }

  goToLocationForm = () => {
    this.setState({ component: 'form', selected: false })
  }

  pickAMonster = (petKey) => {
    this.props.choosePet(petKey)
  }

  handleValueChange = (values) => {
    this.setState({ form: values, warningText: '' })
  }

  render() {
    return (
      <View>
        <View>
          <GiftedForm
            style={styles.form}
            formName='locationSearch'
            clearOnClose={true}
            onValueChange={this.handleValueChange.bind(this)}
          >
            <View style={styles.row}>
              {this.props.pets.map(pet => (
                <View key={pet.key} style={styles.petIcon}>
                  <TouchableOpacity activeOpacity={0.7} key={pet.name} onPress={() => this.pickAMonster(pet.key)}>
                    <Image
                      style={styles.petImage}
                      source={pet.key === this.props.selectedPet ?
                        monsterImg[pet.type].clicked : monsterImg[pet.type].notClicked}
                    />
                  </TouchableOpacity>
                  <Text style={styles.name}>{pet.name.toUpperCase()}</Text>
                  <Text style={styles.location}>{pet.location}</Text>
                </View>
              ))}
            </View>
            <GiftedForm.TextInputWidget
              name='location'
              title='Location'
              placeholder='e.g. Grocery Store ...'
              clearButtonMode='while-editing'
            />
            <GiftedForm.SeparatorWidget />

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
                    longitude: values.locationSearch.details.geometry.location.lng,
                    location: values.location
                  }

                  if (values.location && this.props.selectedPet) {
                    database.ref(`/users/${this.props.auth.user}/pets/${this.props.selectedPet}`).update(updates)
                      .then(response => console.log("success response", response))
                      .catch(error => console.log("error is", error))
                    postSubmit()
                    this.props.navigation.goBack()
                  } else if (!values.location && !this.props.selectedPet) {
                    this.setState({ warningText: warnings['noPetnoLocation'] })
                    postSubmit()
                  } else {
                    if (!values.location) {
                      this.setState({ warningText: warnings['noLocation'] })
                    }
                    if (!this.props.selectedPet) {
                      this.setState({ warningText: warnings['noPet'] })
                    }
                    postSubmit()
                  }
                }
              }
              } />
          </GiftedForm>
        </View>
        <View style={styles.textContainer}>
          {this.state.warningText ?
              <Text style={styles.text}>{this.state.warningText}</Text> : <View />}
        </View>
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
  textContainer: {
    paddingTop: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black'
  }
});

const mapState = ({ pets, selectedPet, auth }) => ({ pets, selectedPet, auth });

const mapDispatch = (dispatch) => {
  return {
    choosePet: (pet) => {
      dispatch(selectPet(pet))
    }
  }
}

export default connect(mapState, mapDispatch)(FormView)