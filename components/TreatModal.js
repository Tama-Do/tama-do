import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';

import treatPaths from './helpers/treatPaths';

class TreatModal extends Component {
  constructor(props) {
    super(props);
  }

  _renderButton = (onPress) => {
    if (!this.props.showDraggable && this.props.checkedIn) {
      return (
        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity onPress={onPress}>
            <View style={modalStyles.button}>
              <Text style={modalStyles.buttonText}>Feed Me!</Text>
            </View>
          </TouchableOpacity>
        </View>

      )
    }
  };

  _renderModalContent = () => (
    <View style={modalStyles.modalContent}>
      {this.props.treats.map(treat =>
        <View key={treat.key} style={modalStyles.treats}>
          <TouchableOpacity
            onPress={() => this.props.setTreat(treat)}>
            <Image style={modalStyles.treatIcon} source={treatPaths[treat.type]} />
          </TouchableOpacity>
          <View style={modalStyles.quantityContainer}>
            <Text style={modalStyles.quantity}>{treat.quantity}</Text>
          </View>
        </View>
      )}
      <View style={modalStyles.buttonContainer}>
        <TouchableOpacity onPress={() => this.props.toggleModal(false)}>
          <View style={modalStyles.closeButton}>
            <Text style={modalStyles.buttonX}>X</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>);



  render() {
    return (
      <View>
        {this._renderButton(() => this.props.toggleModal(true))}
        <Modal
          isVisible={this.props.isModalVisible}
          style={modalStyles.bottomModal}
          backdropOpacity={0.2}
        >
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

export default TreatModal;

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-start'
  },
  button: {
    padding: 12,
    paddingRight: 130,
    paddingLeft: 130,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#F0B52D',
    borderColor: '#EAA00C',
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#F0B52D',
    padding: 6,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 25,
    height: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonX: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10
  },
  modalContent: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  treats: {
    flex: 1,
    flexDirection: 'row',
  },
  treatIcon: {
    width: 70,
    height: 70
  },
  quantityContainer: {
    marginRight: 10,
    marginLeft: -8
  },
  quantity: {
    color: '#808080',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
