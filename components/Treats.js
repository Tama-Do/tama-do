import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import treatPaths from './helpers/TreatPaths';

class Treats extends Component {

  _keyExtractor (item) {
    return item.key;
  }

  capitalize (word) {
    let first = word.slice(0, 1).toUpperCase();
    return first + word.slice(1);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MY TREATS</Text>
          <Text style={styles.quantityHeader}>QUANTITY</Text>
        </View>
        <FlatList
          style={styles.flatlist}
          data={this.props.treats}
          removeClippedSubviews={false}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <View style={styles.row}>
              <Image source={treatPaths[item.type]}/>
              <Text style={styles.name}>{this.capitalize(item.type)}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    flexDirection: 'column',
    backgroundColor: '#E9E9E9',
  },
  header: {
    // flex: 1,
    alignSelf: "stretch",
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    marginLeft: 40,
    fontWeight: 'bold',
    fontSize: 13
  },
  quantityHeader: {
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 13
  },
  flatlist: {
    flex: 5,
    marginTop: 1,
    alignSelf: "stretch",
  },
  row: {
    paddingLeft: 15,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: "#E9E9E9",
  },
  name: {
    fontWeight: 'bold',
    color: '#808080'
  },
  quantity: {
    fontSize: 20,
    color: '#808080'
  }
});


const mapState = ({ treats }) => ({ treats });

const mapDispatch = {}

export default connect(mapState, mapDispatch)(Treats)
