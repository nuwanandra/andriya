import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  Modal,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
  Linking,
  Alert,
  TextInput,
} from 'react-native';

import {RadioButton} from 'react-native-paper';
import colors from '../config/colorProfile';
import CustomButton from '../utils/CustomButton';

export default function Login({navigation, route}) {
  const {UserNamePara, GenderPara} = route.params;
  const [userName, setUserName] = useState('');

  const updateData = async (name, value) => {
    //Alert.alert('settings page:updateData');
    if (value === null) {
      console.log(
        'Login:updateData : Warning!' + {name} + ' value is empty or null',
      );
    } else {
      try {
        //const currentDate = new Date();

        let user = {
          [name]: value,
        };

        await AsyncStorage.mergeItem('userData', JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSave = () => {
    //Alert.alert(userName);

    if (userName.length > 0) {
      updateData('userName', userName);

      if (GenderPara === null || GenderPara === '') {
        navigation.navigate('Gender', {
          UserNamePara: userName,
          GenderPara: GenderPara,
        });
      } else {
        navigation.navigate('Simple Math', {
          UserNamePara: userName,
          GenderPara: GenderPara,
          //AvatarPara: 0,
        });
      }
      //Alert.alert('successful', 'Successfully Updated. ' + userName);
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <StatusBar hidden={true}></StatusBar>
      <Text
        style={{
          fontSize: 22,
          alignItems: 'center',
          margin: 10,
          color: colors.textColor1,
        }}>
        Your Nickname is only used for identifying yourself. It cannot be
        changed once entered.
      </Text>

      <Text style={{fontSize: 22, margin: 10, color: colors.textColor1}}>
        Insert your Nickname:
      </Text>
      <TextInput
        id="UserName"
        maxLength={30}
        style={styles.inputBox}
        //placeholder="Will be displayed to public"
        value={userName}
        onChangeText={val => setUserName(val)}></TextInput>

      <View style={{width: '30%', flexDirection: 'column', margin: 20}}>
        <CustomButton
          title="save"
          onPressFunction={onSave}
          radius={5}></CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderColor: colors.textInputBorderColor1,
    width: '60%',
    //left: 50,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 22,
    //top: 10,
    margin: 10,
    color: colors.textColor1,
  },
});
