import React from 'react';
import { View, Image } from 'react-native';

const CardLogin = (props) => {
  const { containerStyle } = styles;
  return (
    <View style={styles.background}>
      <Image source={require('../../images/pink_gradient_background-02.png')}  />
      {props.children}
    </View>
  );
};

const styles = {
  background: {
    // paddingTop: 40,
    // paddingLeft: 10,
    // paddingRight: 10,
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 1
    flex: 1,
    resizeMode: 'cover'
  }
};

export { CardLogin };
