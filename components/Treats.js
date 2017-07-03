import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import treatPaths from './helpers/TreatPaths';

class Treats extends Component {

  _keyExtractor (item) {
    return item.key;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>My Treats</Text>
        <FlatList
          data={this.props.treats}
          removeClippedSubviews={false}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <View style={styles.row}>
              <Image source={treatPaths[item.type]}/>
              <Text>{item.type}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </View>
          }
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
    paddingTop: 40
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});


const mapState = ({ treats }) => ({ treats });

const mapDispatch = {}

export default connect(mapState, mapDispatch)(Treats)
