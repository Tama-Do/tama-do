import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

class Treats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treats: this.props.treats
    }
  }

  _keyExtractor = (item) => item.type

  render() {
    return (
      <View style={styles.container} >
        <FlatList
            style={styles.flatlist}
            data={this.props.treats}
            removeClippedSubviews={false}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => <Text style={styles.item}>{item.type}</Text>}
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
  flatlist: {
    marginTop: 30,
    alignSelf: "stretch",
  },
});


const mapState = ({treats}) => ({treats});

const mapDispatch = { }

export default connect(mapState, mapDispatch)(Treats)
