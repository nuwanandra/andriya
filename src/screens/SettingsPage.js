import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useLayoutEffect} from 'react';
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
  FlatList,
} from 'react-native';

import RNFS from 'react-native-fs';
import {IconButton} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import UserDefineFunc from '../functions/UserDefineFunc ';
import {MultipleImageViewer} from '../utils/MultipleImageViewer ';
import PageNumbersNavigator from '../utils/PageNumbersNavigator';
import {RadioButton} from 'react-native-paper';
import colors from '../config/colorProfile';
import CustomButton from '../utils/CustomButton';

import MyDressStoreFunc, {ImageData} from '../functions/MyDressStoreFunc';

export default function SettingsPage({navigation, route}) {
  useEffect(() => {
    //getData2();
  }, []);

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

//import {maleImagesArray, femaleImagesArray} from '../config/AvatarImages';

// const operationCountArray = [
//   {key: '1', value: '1'},
//   {key: '2', value: '2'},
//   {key: '3', value: '3'},
//   {key: '4', value: 'Random'},
// ];

// export default function SettingsPage({navigation, route}) {
//   useEffect(() => {
//     //getData();
//     //deleteData('');
//   }, []);

//   const {UserNamePara, GenderPara} = route.params;
//   const [gender, setGender] = useState(GenderPara);
//   const [level, setLevel] = useState('2');
//   const [operationCount, setOperationCount] = useState('1');
//   const [sample, setSample] = useState('');
//   const [sampleResult, setSampleResult] = useState(0);

//   const viewSample = () => {
//     //Alert.alert('viewSample');
//     //setSample(new Date().toLocaleTimeString());

//     const sampleVal = new UserDefineFunc().generateCalculation(
//       operationCount,
//       level,
//     );

//     setSample(sampleVal);
//     //setSampleResult(eval(sampleVal));
//   };

//   const getData = async () => {
//     try {
//       console.log('SettingsPage: Load Called.');
//       await AsyncStorage.getItem('userData').then(val => {
//         let userOb = null;
//         if (val != null && val != '') {
//           userOb = JSON.parse(val);
//           setLevel(userOb.level);
//           setOperationCount(userOb.operationCount);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateData = async (name, value) => {
//     if (value === null) {
//       console.log(
//         'Login:updateData : Warning!' + {name} + ' value is empty or null',
//       );
//     } else {
//       try {
//         let user = {
//           [name]: value,
//         };

//         await AsyncStorage.mergeItem('userData', JSON.stringify(user));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const SaveData = () => {
//     if (level.length > 0) {
//       updateData('level', level);
//     }

//     if (operationCount.length > 0) {
//       updateData('operationCount', operationCount);
//     }

//     Alert.alert('Saved Successfully');
//     //navigation
//     // if (
//     //     level.length > 0 &&
//     //     operationCount.length > 0

//     // ) {

//     navigation.navigate('Simple Math', {
//       UserNamePara: UserNamePara,
//       GenderPara: GenderPara,
//     });
//     // }
//   };

//   return (
//     <SafeAreaView
//       style={{
//         paddingTop: Platform.OS === 'android' ? 0 : 0,
//       }}>
//       <StatusBar hidden={true}></StatusBar>
//       {/* <Text>
//         Settings User Name: {UserNamePara} Gender: {gender}
//       </Text> */}

//       <View id="Level">
//         <Text
//           style={{
//             fontSize: 30,
//             marginTop: 5,
//             marginLeft: 20,
//             fontWeight: 'bold',
//             color: colors.textColor1,
//           }}>
//           Choose Level
//         </Text>

//         <View
//           style={{
//             flexDirection: 'row',
//             marginLeft: 30,
//             marginTop: 10,
//           }}>
//           <RadioButton
//             value="1"
//             status={level === '1' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
//             onPress={() => setLevel('1')} //when pressed, set the value of the checked Hook to 'Apple'
//           />
//           <Text
//             onPress={() => setLevel('1')}
//             style={{fontSize: 24, color: colors.textColor1}}>
//             Simple
//           </Text>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             marginLeft: 30,
//             marginTop: 10,
//           }}>
//           <RadioButton
//             value="2"
//             status={level === '2' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
//             onPress={() => setLevel('2')} //when pressed, set the value of the checked Hook to 'Apple'
//           />
//           <Text
//             onPress={() => setLevel('2')}
//             style={{fontSize: 24, color: colors.textColor1}}>
//             Avarage
//           </Text>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             marginLeft: 30,
//             marginTop: 10,
//           }}>
//           <RadioButton
//             value="3"
//             status={level === '3' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
//             onPress={() => setLevel('3')} //when pressed, set the value of the checked Hook to 'Apple'
//           />
//           <Text
//             onPress={() => setLevel('3')}
//             style={{fontSize: 24, color: colors.textColor1}}>
//             Hard
//           </Text>
//         </View>
//       </View>

//       <View id="operationCount">
//         <Text
//           style={{
//             fontSize: 30,
//             marginLeft: 20,
//             marginTop: 10,
//             fontWeight: 'bold',
//             color: colors.textColor1,
//           }}>
//           Operation Count
//         </Text>

//         <View style={{width: '60%', marginLeft: 30, marginTop: 10}}>
//           <SelectList
//             //currentHeight={100}
//             dropdownTextStyles={{fontSize: 20, color: colors.textColor1}}
//             inputStyles={{fontSize: 20, height: 22, color: colors.textColor1}}
//             dropdownItemStyles={{fontSize: 20, height: 40}}
//             setSelected={setOperationCount}
//             data={operationCountArray}
//             save="key"
//             search={false}
//             defaultOption={operationCountArray.find(
//               item => item.key === operationCount,
//             )}
//           />
//         </View>
//       </View>

//       <View style={{flexDirection: 'row'}}>
//         <View
//           style={{width: 160, marginTop: 20, marginLeft: 30, marginRight: 20}}>
//           <CustomButton
//             radius={5}
//             title="Save"
//             onPressFunction={SaveData}></CustomButton>
//         </View>

//         <View style={{width: 160, marginTop: 20}}>
//           <CustomButton
//             radius={5}
//             title="View Sample"
//             onPressFunction={viewSample}></CustomButton>
//         </View>
//       </View>

//       {sample === '' ? null : (
//         <Text
//           style={{
//             fontSize: 50,
//             fontWeight: 'bold',
//             marginLeft: 10,
//             color: colors.textColor1,
//           }}>
//           {sample
//             .replace(/\s+/g, '')
//             .replace(/\*/g, ' x ')
//             .replace(/\//g, ' / ')
//             .replace(/\+/g, ' + ')
//             .replace(/\-/g, ' - ')}

//           {console.log(sample)}
//         </Text>
//       )}
//     </SafeAreaView>
//   );
// }
