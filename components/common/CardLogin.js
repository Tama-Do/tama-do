import React from 'react';
import { View } from 'react-native';

const CardLogin = (props) => {
  const { containerStyle } = styles;
  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 3,
    backgroundColor: '#66ccff',
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    elevation: 1
  }
};

export { CardLogin };
