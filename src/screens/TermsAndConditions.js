import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useLayoutEffect} from 'react';

import {
  Text,
  View,
  Modal,
  Linking,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import colors from '../config/colorProfile';
import CustomButton from '../utils/CustomButton';
import MyDressStoreFunc from '../functions/MyDressStoreFunc';

export default function TermsAndConditions({navigation, route}) {
  useEffect(() => {
    //getData();
    //deleteData('');
    //Alert.alert(deviceId);
  }, []);

  //const {deviceIdPara} = route.params;
  const [deviceId, setDeviceId] = useState(route.params?.deviceIdPara);
  const [confirmed, setConfirmed] = useState(false);
  //const [userName, setUserName] = useState('');
  //const [gender, setGender] = useState('');
  const myDressStoreFunc = new MyDressStoreFunc();

  // const getData = async () => {
  //   try {
  //     console.log('TearmsAndConditions: Load Called.');
  //     await AsyncStorage.getItem('userData').then(val => {
  //       if (val != null && val != '') {
  //         let userOb = JSON.parse(val);
  //         //setUser(val);
  //         setUserName(userOb.userName.trim());
  //         setGender(userOb.gender.trim());
  //         setConfirmed(userOb.confirmed);

  //         // if (userOb.confirmed === true) {
  //         //   navigation.navigate('Simple Math', {
  //         //     UserNamePara: userName,
  //         //     GenderPara: gender,
  //         //   });
  //         // }
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const updateData = async (name, value) => {
  //   if (value === null) {
  //     console.log(
  //       'Login:updateData : Warning!' + {name} + ' value is empty or null',
  //     );
  //   } else {
  //     try {
  //       let user = {
  //         [name]: value,
  //       };

  //       await AsyncStorage.mergeItem('userData', JSON.stringify(user));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const confirmFunction = async () => {
    setConfirmed(true);

    //Alert.alert(deviceId);

    await myDressStoreFunc.updateJsonValueInFile(
      'Data/Devices',
      deviceId + '.json',
      'confirmed',
      true,
    );

    await myDressStoreFunc.updateJsonValueInFile(
      'Data/Devices',
      deviceId + '.json',
      'firstUseDate',
      new Date().toISOString().substring(0, 10),
    );

    //new Date().toISOString().substring(0,10)

    //updateData('confirmed', true);

    navigation.navigate('My Dress Store', {
      deviceIdPara: deviceId,
    });

    // if (userName.length > 0 && gender.length > 0) {
    //   navigation.navigate('Simple Math', {
    //     UserNamePara: userName,
    //     GenderPara: gender,
    //     //AvatarPara: avatar,
    //   });
    // } else if (userName.length === 0) {
    //   navigation.navigate('Login', {
    //     UserNamePara: userName,
    //     GenderPara: gender,
    //   });
    // } else if (gender.length === 0) {
    //   navigation.navigate('Gender', {
    //     UserNamePara: userName,
    //     GenderPara: gender,
    //   });
    // }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <View
        id="warnView"
        style={{
          width: 300,
          height: 300,
          backgroundColor: colors.themeColor1,
          //borderRadius: 5,
        }}>
        <View
          id="warnTitle"
          style={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: colors.textColor1,
            }}>
            Information
          </Text>
        </View>

        <View id="warnContent1" style={{alignItems: 'center'}}>
          <Text style={{padding: 3, color: colors.textColor1}}>
            -I am older than 18 years.
          </Text>
          <Text style={{padding: 3, color: colors.textColor1}}>
            -The Girls are Professionals and Paid.
          </Text>
          <Text style={{padding: 3, color: colors.textColor1}}>
            -Do not share these photos.
          </Text>

          <View
            id="linking"
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              top: 40,
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.textColor1}}>
              By continuing, you agree to our
            </Text>

            <Text
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL(
                  'https://www.elifeusaco.com/andriya-eula-en.html',
                )
              }>
              Terms of Services
            </Text>

            <Text style={{color: colors.textColor1}}> and </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL(
                  'https://www.elifeusaco.com/andriya-privacy-en.html',
                )
              }>
              Privacy Policy.
            </Text>
          </View>
        </View>

        <View
          id="confirmButton"
          style={{
            bottom: -1,
            position: 'absolute',
            height: 50,
            width: '100%',
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            title={confirmed === false ? 'CONFIRM' : 'CONFIRMED'}
            //title={'CONFIRM'}
            onPressFunction={confirmFunction}
            radius={0}>
            {' '}
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
