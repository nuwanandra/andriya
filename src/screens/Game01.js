import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
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
  Animated,
  Easing,
} from 'react-native';

import UserDefineFunc from '../functions/UserDefineFunc ';
import {RadioButton} from 'react-native-paper';
import colors from '../config/colorProfile';
import CustomButton from '../utils/CustomButton';

const answerButtonDefaultcolor = '#454545';

export default function Game01({navigation, route}) {
  useEffect(() => {
    getData();
    //deleteData('');
  }, []);

  const {UserNamePara, GenderPara} = route.params;
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [level, setLevel] = useState(route.params?.levelPara);
  const [operationCount, setOperationCount] = useState(
    route.params?.operationCountPara,
  );
  const [sample, setSample] = useState('');
  const [sampleResult, setSampleResult] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [pageStatus, setPageStatus] = useState(0);
  const [answerArray, setAnswerArray] = useState([0, 0, 0, 0]);
  const [disableAnswer, setDisableAnswer] = useState(true);

  const [b1Color, setB1Color] = useState(answerButtonDefaultcolor);
  const [b2Color, setB2Color] = useState(answerButtonDefaultcolor);
  const [b3Color, setB3Color] = useState(answerButtonDefaultcolor);
  const [b4Color, setB4Color] = useState(answerButtonDefaultcolor);

  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const startAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
    });
  };

  const getData = async () => {
    try {
      console.log('Game01: Load Called.');
      await AsyncStorage.getItem('userData').then(val => {
        let userOb = null;
        if (val != null && val != '') {
          userOb = JSON.parse(val);
          //setUser(val);
          setUserName(userOb.userName.trim());
          setGender(userOb.gender.trim());
          //setOperationCount(userOb.operationCount.trim());
          //setLevel(userOb.level.trim());
          resetPage();
          viewSample();
          //setConfirmed(userOb.confirmed);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async itemName => {
    try {
      if (itemName.trim().length > 0) {
        await AsyncStorage.removeItem(itemName);
      } else {
        await AsyncStorage.clear();
      }

      Alert.alert('Successful', 'AsyncStorage Cleared.');
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (name, value) => {
    if (value === null) {
      console.log(
        'Login:updateData : Warning!' + {name} + ' value is empty or null',
      );
    } else {
      try {
        let user = {
          [name]: value,
        };

        await AsyncStorage.mergeItem('userData', JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const GoBack = () => {
    //Alert.alert('Clicked');

    navigation.navigate('Simple Math', {
      UserNamePara: userName,
      GenderPara: gender,
    });
  };

  const AnswerClick = (value, useStateColor) => {
    //Alert.alert(name.toString());

    if (pageStatus === 0) {
      //only one time=> count incressed.
      if (value === sampleResult) {
        setCorrectCount(correctCount + 1);
      } else {
        setErrorCount(errorCount + 1);
      }
    }
    setPageStatus(1);

    if (value === sampleResult) {
      useStateColor('green');
      setDisableAnswer(true);

      setTimeout(() => {
        //console.log('Next function called after a delay');
        // Call your next function here
        startAnimation();
        resetPage();
        viewSample();
      }, 500); // Delay in milliseconds (in this example, 1 second)
    } else {
      useStateColor('red');
    }
  };

  const viewSample = () => {
    //console.log(operationCount);

    const sampleText = new UserDefineFunc().generateCalculation(
      operationCount,
      level,
    );

    let sampleResult = eval(sampleText);
    setAnswerArray(new UserDefineFunc().getAnswerArray(sampleResult));
    setSample(sampleText);
    setSampleResult(sampleResult);
    setPageStatus(0);
  };

  const resetPage = () => {
    setB1Color(answerButtonDefaultcolor);
    setB2Color(answerButtonDefaultcolor);
    setB3Color(answerButtonDefaultcolor);
    setB4Color(answerButtonDefaultcolor);

    setDisableAnswer(true);
    setTimeout(() => {
      //console.log('Next function called after a delay');
      // Call your next function here
      setDisableAnswer(false);
    }, 1500); // Delay in milliseconds (in this example, 1 second)
  };

  return (
    <Animated.View
      style={{
        transform: [{rotateY: spin}],
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#454545',
        height: '100%',
      }}>
      <StatusBar hidden={true}></StatusBar>
      {/* <Text>
        Home User Name: {userName} and Gender: {gender}{' '}
      </Text> */}

      <View style={{flexDirection: 'row', position: 'absolute', top: 10}}>
        <View
          style={{
            height: 100,
            width: 160,
            //backgroundColor: 'green',
            borderRadius: 20,
            borderWidth: 5,
            borderColor: 'green',
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: colors.textColor2}}>
            {correctCount}
          </Text>
        </View>
        <View
          style={{
            height: 100,
            width: 160,
            //backgroundColor: 'green',
            borderRadius: 20,
            borderWidth: 5,
            borderColor: 'red',
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: colors.textColor2}}>
            {errorCount}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{fontSize: 50, color: colors.textColor2}}>
          {/* {sample} = {sampleResult} */}
          {sample
            .replace(/\s+/g, '')
            .replace(/\*/g, ' x ')
            .replace(/\//g, ' / ')
            .replace(/\+/g, ' + ')
            .replace(/\-/g, ' - ')}
        </Text>
      </View>

      <View style={{position: 'absolute', bottom: 2}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={disableAnswer}
            style={[styles.answerButton, {backgroundColor: b1Color}]}
            id="answerButton1"
            onPress={() => AnswerClick(answerArray[0], setB1Color)}>
            <Text style={styles.answerText}>{answerArray[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disableAnswer}
            style={[styles.answerButton, {backgroundColor: b2Color}]}
            onPress={() => AnswerClick(answerArray[1], setB2Color)}>
            <Text style={styles.answerText}>{answerArray[1]}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={disableAnswer}
            style={[styles.answerButton, {backgroundColor: b3Color}]}
            onPress={() => AnswerClick(answerArray[2], setB3Color)}>
            <Text style={styles.answerText}>{answerArray[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disableAnswer}
            style={[styles.answerButton, {backgroundColor: b4Color}]}
            onPress={() => AnswerClick(answerArray[3], setB4Color)}>
            <Text style={styles.answerText}>{answerArray[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <CustomButton title="Back" onPressFunction={GoBack}></CustomButton> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  answerButton: {
    height: 100,
    width: 160,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#CFD2CF',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  answerText: {
    fontSize: 40,
    color: colors.textColor2,
  },
});
