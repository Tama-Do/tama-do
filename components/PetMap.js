// INSTRUCTIONS:: https://gist.github.com/alliefauer/f367d0f1de8b5e7c73aa6da6d89d3c76

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Button } from './common/MapButton'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';
import { monsterImg } from './helpers/monsterPicker';



class PetMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords : []
    }
  }

componentDidUpdate() {
  this.map.fitToCoordinates(this.state.coords, { edgePadding: { top: 70, right: 50, bottom: 100, left: 50, animated: true }})

}

  goToLocationForm = () => {
    this.setState({ load : false })
    this.props.navigation.navigate('Form')
  }

componentWillReceiveProps(nextProps) {
  let coords = nextProps.pets.map(pet => {
      return {
        latitude: pet.latitude,
        longitude: pet.longitude
      }
    })
     this.setState({ coords })
}


  viewPet(pet) {
    this.props.navigation.navigate('Pet', pet)
  }

  render() {


    if (this.props.pets) {
  return (
      <View style={styles.container}>
        <MapView style={styles.map}
          ref={(ref) => { this.map = ref }}
          mapType="hybrid"
          showsCompass={true}>
          {this.props.pets.map(pet => {
            if (pet.latitude && pet.longitude) {
              return (<MapView.Marker
                coordinate={{
                  latitude: pet.latitude,
                  longitude: pet.longitude
                }}

                key={pet.name}
              >
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.viewPet(pet)}>
                <Image source={monsterImg[pet.type].notClicked}
                  style={{ width: 30 + pet.size / 2, height: 30 + pet.size / 2 }}
                />
              </TouchableOpacity>
              </MapView.Marker>)
            }
          })}
        </MapView>
        <Button onPress={() => this.goToLocationForm()}>
          Add or Change a Pet's Location
          </Button>
      </View>
    )

  }else {
    return (<View></View>)
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
