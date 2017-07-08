import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import treatPaths from './helpers/TreatPaths';

class Treats extends Component {

  _keyExtractor (item) {
    return item.key;
  }

  capitalize (word) {
    if (!word) {
      console.error('Word is null or undefined');
      return null;
    }
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
              <Image style={styles.treatIcon}source={treatPaths[item.type]}/>
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
    alignSelf: "stretch",
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: "#d9d9d9",
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
    borderTopWidth: 1,
    borderColor: "#d9d9d9",
    alignSelf: "stretch",
  },
  row: {
    paddingLeft: 30,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
  },
  treatIcon: {
    width: 70,
    height: 70
  },
  name: {
    fontWeight: 'bold',
    color: '#808080'
  },
  quantity: {
    fontSize: 18,
    color: '#808080'
  }
});


const mapState = ({ treats }) => ({ treats });

export default connect(mapState)(Treats);
