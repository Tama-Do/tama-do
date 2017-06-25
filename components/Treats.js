import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class Treats extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log('this.props', this.props)
  }

  render() {
    return (
      <View style={styles.container} >
        <Text>Treats</Text>
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

export default connect(mapState, mapDispatch)(Treats)
