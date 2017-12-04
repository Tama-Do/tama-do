import React from 'react';
import { TextInput, View, Text } from 'react-native';

const InputLogin = ({ label, value, onChangeText, keyboardType, autoCapitalize, autoCorrect, secureTextEntry, placeholder }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        autoCapitalize={'none'}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#FFF',
    paddingRight: 20,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    color: '#FFF',
    paddingLeft: 20,
    flex: 2
  },
  containerStyle: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  }
};

export { InputLogin };
