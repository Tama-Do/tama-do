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
    position: 'relative',
    top: 385,
    paddingTop: 5,
    padding: 5,
    // justifyContent: 'flex-start',
    flexDirection: 'row',
  }
};

export { CardSectionLogin };
