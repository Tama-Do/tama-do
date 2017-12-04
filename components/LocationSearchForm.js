import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';
import { connect } from 'react-redux';
import { monsterImg } from './helpers/monsterPicker';


class FormView extends Component {
  state = {
    selected: false,
    petKey: null,
  }

  goToLocationForm = () => {
    this.setState({ component: 'form', selected: false })
  }

  pickAMonster = (petKey) => {
    // this.setState({ petKey, selected: true })
    console.log('hi')
  }


  render() {
    return (
      <View>
        <GiftedForm style={styles.form}
          formName='locationSearch'
          clearOnClose={true}
        >
          <View style={styles.row}>
            {this.props.pets.map(pet => (

              <View key={pet.key} style={styles.petIcon}>
                <TouchableOpacity activeOpacity={0.7} key={pet.name} onPress={() => this.pickAMonster(pet.key)}>
                  {/* <Image style={styles.petImage} source={this.state.selected && pet.key === this.state.petKey ? monsterImg[pet.type].clicked : monsterImg[pet.type].notClicked} /> */}
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
                    location:
                    values.location
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
  }
});


const mapState = ({ pets, auth }) => ({ pets, auth });

const mapDispatch = {}


export default connect(mapState, mapDispatch)(FormView)
