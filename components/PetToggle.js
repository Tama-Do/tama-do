import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, FlatList, TouchableHighlight, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import PetContainer from './Pet';
import PetNotCheckedIn from './PetNotCheckedIn';

class PetToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          checkedIn: false
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name
    });

    componentDidMount () {
      const latitude = this.props.navigation.state.params.latitude;
      const longitude = this.props.navigation.state.params.longitude;
      console.log('latitude', latitude);
      console.log('longitude', longitude);
      // write function to check if user coordinates are within range of pet coordinates
      // assign boolean value to this.state.checkedIn to render the appropriate component
    }

    render() {
      return (this.state.checkedIn ?
        <PetContainer
          petKey={this.props.navigation.state.params.key}
        />
        :
        <PetNotCheckedIn
          petKey={this.props.navigation.state.params.key}
        />
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapState = ({ auth }) => ({ auth });

const mapDispatch = {  };

const PetToggleContainer = connect(mapState, mapDispatch)(PetToggle);

export default PetToggleContainer;
