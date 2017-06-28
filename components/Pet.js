import React, { Component } from 'react';
import {View, Text } from 'react-native'

export default class Pet extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name
  });

    render() {
        return (
            <View>
                <Text>This is the virtual Pet Page</Text>
            </View>
        );
    }
}
