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

export default function History({navigation, route}) {
  useEffect(() => {
    //getData2();
  }, []);

  return (
    <View>
      <Text>History</Text>
    </View>
  );
}
