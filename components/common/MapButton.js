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
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
buttonContainer: {
    position: 'absolute',
    left: 0, 
    right: 0, 
    bottom: 15, 
    justifyContent: 'center', 
    alignItems: 'stretch'
  },  
  buttonStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(234, 124, 139, .9)',
    borderColor: '#E16177',
    marginLeft: 10,
    marginRight: 10

  }
};

export { Button };
