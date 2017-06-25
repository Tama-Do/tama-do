// INSTRUCTIONS:: https://gist.github.com/alliefauer/f367d0f1de8b5e7c73aa6da6d89d3c76

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class PetMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log('this.props', this.props)
  }

  render() {
    return (
      <View style={styles.container} >
        <Text>Map</Text>
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


const mapState = ({pets}) => ({pets});

const mapDispatch = { }

export default connect(mapState, mapDispatch)(PetMap)
