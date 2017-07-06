import React from 'react';
import { View } from 'react-native';

const CardSectionLogin = (props) =>
  (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );

const styles = {
  containerStyle: {
    //borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#66ccff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    //borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSectionLogin };
