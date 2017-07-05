import React from 'react';
import { TextInput, View, Text } from 'react-native';

const InputEditPet = ({ label, value, onChangeText, keyboardType, autoCapitalize, autoCorrect, secureTextEntry, autoFocus }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoCapitalize={'none'}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: 'black',
    paddingRight: 20,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 12,
    color: 'black',
    paddingLeft: 20,
    flex: 2
  },
  containerStyle: {
    height: 40,
    backgroundColor: 'rgba(179,179,179,0.2)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    //marginBottom: 5
  }
};

export { InputEditPet };
