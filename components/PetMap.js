// INSTRUCTIONS:: https://gist.github.com/alliefauer/f367d0f1de8b5e7c73aa6da6d89d3c76

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

class PetMap extends Component {
  render() {

    return (
      <View style={styles.container}>
       <MapView style={styles.map}
          initialRegion = {{
            latitude: 40.712784,
            longitude: -74.005941,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0201
          }}
      />
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
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});


const mapState = ({pets}) => ({pets});

const mapDispatch = { }

export default connect(mapState, mapDispatch)(PetMap)
