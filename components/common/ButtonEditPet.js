import React from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

const Button1 = ({ onPress, children }) => {
  const { buttonStyle, textStyle, buttonContainer } = styles;
  return (
    <View style={buttonContainer}>
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -50,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  buttonStyle: {
    //flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F0B52D',
    borderColor: '#FFF',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button1 };
