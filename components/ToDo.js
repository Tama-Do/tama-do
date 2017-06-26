import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation'
import AddTask from './AddTask'

class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: this.props.tasks
    }
    console.log('this.props', this.props)
  }

   render() {
        const { navigate } = this.props.navigation;
        console.log("****************", this.props)
        return (

            <View style={styles.container}>
                <FlatList
                    data={this.props.tasks}
                    removeClippedSubviews={false}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                />
                <Button
                    onPress={() => {
                        navigate('AddTask')
                    }
                    }
                    title="Add a Task"
                    color="#841584"
                />
            </View>
        )
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


const mapState = ({tasks}) => ({tasks})

const mapDispatch = { }

export default connect(mapState, mapDispatch)(ToDo)

export const TaskNavigator = StackNavigator({
    ToDo: { screen: ToDo },
    AddTask: { screen: AddTask }
})