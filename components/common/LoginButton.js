import React from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
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
    color: '#66ccff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  buttonStyle: {
    //flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#FFF',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
