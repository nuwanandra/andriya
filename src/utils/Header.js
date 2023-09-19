import React from 'react';
import {Text, View} from 'react-native';
import colors from '../config/colorProfile';

const Header = props => {
  return (
    <View
      id="Header"
      style={{
        backgroundColor: colors.themeColor1,
        height: 50,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: colors.themeTextColor1,
          //fontWeight: 'normal',
          fontSize: 24,
          marginLeft: 20,
        }}>
        Simple Math
      </Text>
    </View>
  );
};

export default Header;
