import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
  Settings,
} from 'react-native';

import {IconButton} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import CustomButton from '../utils/CustomButton';
import colors from '../config/colorProfile';

import TermsAndConditions from './TermsAndConditions';
import Home from './Home';
//import AvatarPage from './AvatarPage';
import Login from './Login';
import Gender from './Gender';
import SettingsPage from './SettingsPage';
import Game01 from './Game01';
import History from './History';

//import CallScreen1 from './CallScreen1';

//const drawer = createDrawerNavigator();
//const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = ({navigation, route}) => {
  // useEffect(() => {
  //   getData();
  // }, []);

  // const [userName, setUserName] = useState('');
  // const [gender, setGender] = useState('');

  // const getData = async () => {
  //   try {
  //     console.log('App: Load Called.');
  //     await AsyncStorage.getItem('userData').then(val => {
  //       let userOb = null;
  //       if (val != null && val != '') {
  //         userOb = JSON.parse(val);
  //         //setUser(val);
  //         setUserName(userOb.userName.trim());
  //         setGender(userOb.gender.trim());
  //         //setConfirmed(userOb.confirmed);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="My Dress Store"
        // screenOptions={{
        //   headerShown: true,
        //   headerStyle: {
        //     backgroundColor: colors.themeColor1,
        //   },
        //   headerTintColor: colors.themeTextColor1,
        //   headerTitleStyle: {
        //     fontSize: 25,
        //   },
        // }}

        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'My Dress Store') {
              iconName = 'home';
              size = focused ? 25 : 20;
              color = focused ? colors.white : '#555';
            } else if (route.name === 'History') {
              iconName = 'history';
              size = focused ? 25 : 20;
              color = focused ? colors.white : '#555';
            } else if (route.name === 'Settings') {
              iconName = 'cog';
              size = focused ? 25 : 20;
              color = focused ? colors.white : '#555';
            }

            //Alert.alert(route.Screen);

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },

          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: colors.black,
          tabBarInactiveBackgroundColor: colors.black,
        })}>
        {/* <Tab.Screen
          name="Login"
          component={Login}
          options={{drawerLabel: 'Login'}}
          //initialParams={{params: route.params}}
        /> */}

        {/* <Tab.Screen
          name="Gender"
          component={Gender}
          options={{drawerLabel: 'Gender'}}
          //initialParams={{params: route.params}}
        /> */}

        <Tab.Screen
          name="My Dress Store"
          component={Home}
          options={{
            drawerLabel: 'My Dress Store',
            header: () => null,
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: () => null,
            //headerRight: () => (
            // <IconButton
            //   icon="menu"
            //   color="red"
            //   size={30}
            //   onPress={() => console.log('Pressed')}
            // />

            // <IconButton
            //   icon={() => <FontAwesome5 name="bars" size={24} color="#fff" />}
            //   onPress={goSettings}
            // />
            //),
          }}
          //initialParams={{UserNamePara: '', GenderPara: ''}}
        />

        <Tab.Screen
          name="History"
          component={History}
          options={{
            drawerLabel: 'History',
            header: () => null,
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: () => null,
          }}
          initialParams={{UserNamePara: '', GenderPara: ''}}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            drawerLabel: 'Settings',
            header: () => null,
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: () => null,
          }}
          initialParams={{UserNamePara: '', GenderPara: ''}}
        />

        <Tab.Screen
          name="Terms And Conditions"
          component={TermsAndConditions}
          options={() => ({
            drawerLabel: 'Terms And Conditions',
            header: () => null,
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: () => null,
          })}

          //initialParams={{ItemName: user, ItemID: 4}}
        />

        {/* <Tab.Screen
          name="Game01"
          component={Game01}
          options={{drawerLabel: 'Game01'}}
          //initialParams={{ItemName: user, ItemID: 1}}
        /> */}

        {/* <drawer.Screen
          name="Terms And Conditions"
          component={TermsAndConditions}
          options={{drawerLabel: 'Terms And Conditions', header: () => null}}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backGroundColor1,
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  text: {
    fontSize: 60,
    color: colors.textColor1,
  },
});

export default App;
