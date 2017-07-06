import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, FlatList, ScrollView} from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';
import { connect } from 'react-redux';
import { monsterImg } from './helpers/monsterPicker';
import { CardEditPet, CardSectionEditPet, InputEditPet } from './common';
import { Button1 } from './common/ButtonEditPet';
import AnimatedSprite from 'react-native-animated-sprite';
import { monsterPicker } from './helpers/monsterPicker';



class RenamePet extends Component {
  state = {
    selected: false,
    petKey: null,
    monsterName: null,
    animationType: 'IDLE'
  }

  onSubmit() {
    let petKey = this.props.navigation.state.params.petKey
    console.log("PETKEY", petKey)
    let petName = database.ref(`/users/${this.props.auth.user}/pets`).child(petKey)
      .update({ name: this.state.monsterName})
    this.props.navigation.goBack()
  }


  render() {
    let props = this.props.navigation.state.params
    console.log("STAAATE ", this.state)
    console.log("PROPSSS ", this.props)
    console.log("PROPSPROPSPROPS", this.props.navigation.state.params)
    // return (
    //   <CardEditPet>
    //     <View style={styles.text1Container}>
    //       <Text style={styles.text1}>RENAME {props.monsterName}</Text>
    //     </View>
    //
    //     <CardSectionEditPet>
    //       <InputEditPet
    //         label="RENAME"
    //         onChangeText={(monsterName) => this.setState({monsterName})}
    //         value={this.state.monsterName}
    //         autoCapitalize="characters"
    //       />
    //     </CardSectionEditPet>
    //   </CardEditPet>
    // )
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container}>

          <View style={styles.flatList}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>RENAME {props.monsterName}</Text>

            </View>
            <InputEditPet
              label="NEW NAME"
              autoFocus={true}
              autoCapitalize="characters"
              onChangeText={(monsterName) => this.setState({monsterName})}
              value={this.state.monsterName}
            />
          </View>

          <View>
            <Button1 onPress={() => { this.onSubmit() }}>
              SUBMIT NAME
            </Button1>
          </View>

        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  text1Container:{
    top:20
  },
  text1: {
    textAlign: 'center',
    fontSize: 32,
    fontStyle: 'italic'
  },
  container: {
    flex: 1,
    backgroundColor: 'E9E9E9'
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  flatList: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#D9D9D9',
    paddingBottom: 10
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    marginBottom: 15
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
  },
});


const mapState = ({ pets, auth }) => ({ pets, auth })

const mapDispatch = {}


export default connect(mapState, mapDispatch)(RenamePet)
