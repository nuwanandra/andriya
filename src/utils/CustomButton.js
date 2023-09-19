import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colorProfile';

const CustomButton = props => {
  return (
    <TouchableOpacity
      //id="CustomButton"
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.buttonColor1,
        height: 50,
        borderRadius: props.radius,
      }}
      onPress={props.onPressFunction}>
      <Text
        style={{
          fontSize: 20,
          //fontWeight: 'bold',
          color: colors.buttonTextColor1,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
