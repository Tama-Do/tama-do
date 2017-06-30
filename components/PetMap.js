// INSTRUCTIONS:: https://gist.github.com/alliefauer/f367d0f1de8b5e7c73aa6da6d89d3c76

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Button } from './common/Button'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';




export class PetMap extends Component {
  state = {
      component: 'map',
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

const imgs = {
  grayMonster: {
    notClicked: require('../sprites/monster/monster_celebrate01.png'),
    clicked: require('../sprites/monster/monster_celebrate_selected01.png')
  }
}

if (this.state.component === 'map') {
    console.log('props', this.props)
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 40.712784,
            longitude: -74.005941,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0201
          }}

          mapType="hybrid"
          showsUserLocation={true}
          userLocationAnnotationTitle="you are here!"
          showsCompass={true}>
          {this.props.pets.map(pet => {
            if (pet.latitude && pet.longitude) {
           return (<MapView.Marker
        coordinate={{
          latitude: pet.latitude,
          longitude: pet.longitude
        }}
        title={pet.name}
        key={pet.name}
      >
        <Image source={imgs[pet.type].notClicked}
        style={{width: Math.ceil(pet.size / 20) * 30, height: Math.ceil(pet.size / 20) * 30}}
        />
      </MapView.Marker>)
          }})}
        </MapView>
        <Button onPress={() => this.goToLocationForm()}>
          Add or Change a Pet's Location
          </Button>
      </View>
    ) 
} else {
  return (
    <View>
            <GiftedForm style={styles.form}
                formName='locationSearch'
            >
                  <View style={styles.row}>
      {this.props.pets.map(pet => (
        
        <View key={pet.key} style={{alignContent: 'center'}}>
          <TouchableHighlight key={pet.name} onPress={() => this.pickAMonster(pet.key)}>
        <Image style={styles.petImage} source={this.state.selected && pet.key === this.state.petKey ? imgs[pet.type].clicked : imgs[pet.type].notClicked}/>
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
                            this.setState({component: "map"})
                        }
                    }
                    } />
            </GiftedForm>
            </View>
        )
}
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


export default connect(mapState, mapDispatch)(PetMap)
