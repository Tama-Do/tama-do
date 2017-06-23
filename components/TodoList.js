import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from "firebase";


export default class TodoList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            todos : ['go to grocery store', 'ample hills']
        }
    }

    _keyExtractor = (item) => item.name


    render() {
        console.log("****************", this.props.todos)
        return(

            <View style={styles.container}>
                <FlatList
            
                    data={this.props.todos}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                />
            </View>
        )
    }


}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})