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
  Image,
} from 'react-native';

import UserDefineFunc from '../functions/UserDefineFunc ';

import {RadioButton} from 'react-native-paper';
import colors from '../config/colorProfile';
import CustomButton from '../utils/CustomButton';

//import {maleImagesArray, femaleImagesArray} from '../config/AvatarImages';

export default function Gender({navigation, route}) {
  const {UserNamePara, GenderPara} = route.params;
  const [gender, setGender] = useState(GenderPara);

  //const [maleImages, setMaleImages] = useState(new UserDefineFunc().getUserAvatar('Male'));
  //const [femaleImages, setFemaleImages] = useState(new UserDefineFunc().getUserAvatar('Female'));

  const updateData = async (name, value) => {
    //Alert.alert('settings page:updateData');
    if (value === null) {
      console.log(
        'Gender:updateData : Warning!' + {name} + ' value is empty or null',
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
    if (gender.length > 0) {
      updateData('gender', gender);

      //let avatar =
      //  gender === 'Male' ? maleImages[0].name : femaleImages[0].name;
      //updateData('avatar', avatar);
      console.log(UserNamePara);
      console.log(gender);
      navigation.navigate('Simple Math', {
        UserNamePara: UserNamePara,
        GenderPara: gender,
        //AvatarPara: avatar,
      });
    } else {
      Alert.alert('Please Choose Gender.');
    }
  };

  const onGenderSelect = genderP => {
    setGender(genderP);
    //Alert.alert(gender);
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <StatusBar hidden={true}></StatusBar>
      <Text style={{fontSize: 22, margin: 10, color: colors.textColor1}}>
        Select your Gender carefully. It can not be changed later.
      </Text>

      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            margin: 10,
            fontWeight: 'bold',
            color: colors.textColor1,
          }}>
          Choose Your Gender:
        </Text>

        <View style={{flexDirection: 'row', margin: 30}}>
          <View>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => onGenderSelect('Male')}>
              <Image
                source={require('../assets/male.png')}
                style={{width: 100, height: 100}}></Image>

              <Text style={{fontSize: 30, color: colors.textColor1}}>Male</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginLeft: 100}}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => onGenderSelect('Female')}>
              <Image
                source={require('../assets/female.png')}
                style={{width: 100, height: 100}}></Image>

              <Text style={{fontSize: 30, color: colors.textColor1}}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {gender === '' ? null : (
          <Text
            style={{
              fontSize: 30,
              margin: 10,
              fontWeight: 'bold',
              color: colors.textColor1,
            }}>
            You are a {gender}.
          </Text>
        )}
      </View>

      <View style={{width: '30%', flexDirection: 'column', margin: 30}}>
        <CustomButton
          title="Save"
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
    width: '80%',
    //left: 50,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    top: 5,
  },
});
