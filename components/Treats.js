import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';

class Treats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treats: [{ type: 'Cake' }, { type: 'Cookie' }]
    }
    this._keyExtractor = this._keyExtractor.bind(this)
  }

  _keyExtractor(item) {
    return item.key;
  }

  render() {
    const treatPaths = {
      cherry: require("../sprites/treats/cherry.jpg"),
      donut: require("../sprites/treats/donut.png"),
      candy: require("../sprites/treats/candy.png")
    }
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
