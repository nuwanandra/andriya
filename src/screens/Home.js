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
  RefreshControl,
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

//import {maleImagesArray, femaleImagesArray} from '../config/AvatarImages';

export default function Home({navigation, route}) {
  useEffect(() => {
    getData2();

    //deleteData2(''); //delete all
    //deleteData2('Data/MasterData');
    //ViewFileData();
  }, []);

  //const {UserNamePara, GenderPara} = route.params;
  //const [userName, setUserName] = useState('');
  //const [gender, setGender] = useState('');
  //const [level, setLevel] = useState('2');
  //const [operationCount, setOperationCount] = useState('4');
  //const [deviceId,setDeviceId]= useState('');
  const myDressStoreFunc = new MyDressStoreFunc();
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().substring(0, 10),
  );

  const [items, setItems] = useState([]);
  //const [refreshing, setRefreshing] = useState(false);
  const [enableManualRefresh, setEnableManualRefresh] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [deviceIdUS, setDeviceIdUS] = useState('');

  //const [totalPages, setTotalPages] = useState(1);
  //const [itemsPerPage, setItemsPerPage] = useState(2);
  const [itemsPerRefresh, setItemsPerRefresh] = useState(1);
  // const [startIndex, setStartIndex] = useState(0);

  const [coins, setCoins] = useState(0);
  const [itemVal, setItemVal] = useState(30);
  const [deviceIdJsonStr, setDeviceIdJsonStr] = useState('');
  //const [masterLinesArray, setMasterLinesArray] = useState([]);
  const [orderByUS, setOrderByUS] = useState('date'); //rating

  //let newData = [];

  const fetchData = async (startIndex, orderBy) => {
    // Simulating an asynchronous data fetching operation
    //setTimeout(() => {
    //const newData = []; // New data obtained from an API or other source
    //Alert.alert(startIndex.toString());
    await processLargeFile(startIndex, orderBy); //Update Linked ItemData Array.
    //setData(newData);
    //setItems([...items, ...newData]);
    //setRefreshing(false);
    //}, 2000);
  };

  const handleScroll = event => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;

    // Perform actions based on the scroll position
    //console.log('Scroll offset:', contentOffset.y);
    //console.log('Content height:', contentSize.height);
    //console.log('Viewport height:', layoutMeasurement.height);

    if (enableManualRefresh) {
      if (contentSize.height - contentOffset.y < 1000) {
        setEnableManualRefresh(false);
        console.log('Manual refresh called');
        //onRefresh();
        fetchData(items.length, orderByUS);
      }
    }
  };

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   fetchData(items.length);
  // };

  const decreaseCoins = async () => {
    const coinsOnHand = coins - itemVal;
    setCoins(coinsOnHand);
    console.log('11111', deviceIdUS);
    await setGetCoins(deviceIdUS, true, coinsOnHand);
  };

  const getCoins = () => {
    //const coinsOnHand = coins - itemVal;
    //setCoins(coinsOnHand);
    //console.log('11111', coinsOnHand);
    //setGetCoins(deviceIdUS, true, coinsOnHand);
    return coins;
  };

  // const handlePageChange = async pageNumber => {
  //   setCurrentPage(pageNumber);
  //   // Perform any additional actions upon page change
  //   //Alert.alert(pageNumber.toString());

  //   const deviceId = await myDressStoreFunc.getDeviceUniqueID();

  //   console.log(pageNumber, '|', itemsPerPage);

  //   await processLargeFile('');
  // };

  const getData2 = async () => {
    try {
      //console.log('Home: Load Called.');
      Alert.alert('Home: Load Called.');

      const deviceId = await myDressStoreFunc.getDeviceUniqueID();
      setDeviceIdUS(deviceId);

      let isExists = await myDressStoreFunc.fileExists(
        '/Data/Devices',
        deviceId + '.json',
      );

      //console.log(isExists);

      if (isExists == false) {
        //console.log('111');
        await myDressStoreFunc.createDirectory('/Data/Devices');

        await myDressStoreFunc.writeContentFromAPI(
          '/Data/Devices',
          deviceId + '.json',
          'createDevice/' + deviceId,
        );
      }

      //copy default files to storage
      //await myDressStoreFunc.copyFileFromAssets('Data', 'defaultPrivate.png');

      //read deviceJasonFile
      const kkk = await myDressStoreFunc
        .readJsonFileString_Storage(
          '/Data/Devices',
          deviceId + '.json',
          'confirmed',
        )
        .then(result => {
          setDeviceIdJsonStr(result);
        });

      //Read confirmed from .json file
      //const confirmed = JSON.parse(deviceIdJsonStr).confirmed;
      //console.log('3333', kkk);
      const confirmed = await myDressStoreFunc.getJsonValueFromFile(
        '/Data/Devices',
        deviceId + '.json',
        'confirmed',
      );

      if (confirmed) {
      } else {
        //Alert.alert(deviceId);
        navigation.navigate('Terms And Conditions', {
          deviceIdPara: deviceId,
        });
      }

      //Download MasterData File in Background
      isExists = await myDressStoreFunc.fileExists(
        '/Data/MasterData',
        dateTime + '.txt',
      );

      if (isExists == false) {
        await myDressStoreFunc.cleanDirectory('/Data/MasterData');
        await myDressStoreFunc.createDirectory('/Data/MasterData');
        await myDressStoreFunc.downloadFile(
          '/Data/MasterData',
          dateTime + '.txt',
          'getMasterFile/deviceMaster.txt',
        );
      }

      //set master data txt file to array object => usestate
      // const readStream = await myDressStoreFunc.readJsonFileString_Storage(
      //   '/Data/MasterData',
      //   dateTime + '.txt',
      // );
      // const masterLinesArrayData = readStream
      //   .split('\n')
      //   .filter(n => n.trim() !== '');

      // setMasterLinesArray(
      //   createObjectFromMasterDataArray(masterLinesArrayData),
      // );

      //console.log('6666', masterLinesArray[2]);

      //Read Master Data File
      //await processLargeFile('');

      //test add paid item
      // await myDressStoreFunc.updateJsonValueInFile(
      //   '/Data/Devices',
      //   deviceId + '.json',
      //   'paidItems',
      //   'deviceId001~set002~07~private.jpg',
      // );

      //call fetchData first time
      await fetchData(0, orderByUS);

      //update coins
      //await setGetCoins(deviceId, true, 1000);
      await setGetCoins(deviceId, false, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const createObjectFromMasterDataArray = array => {
    //4|deviceId002.json|deviceId002\set002|2022-01-10|True|888998
    let retArray = [];
    array.forEach(line => {
      const valArray = line.split('|').map(n => n.trim());

      let object = {date: valArray[3], rating: valArray[5], line: line};
      //let object = {date: valArray[3], rating: '', line: ''};
      retArray.push(object);
    });

    //console.log(retArray[0].line);

    return retArray;
  };

  const setGetCoins = async (deviceId, updateJason, CoinVal) => {
    if (updateJason) {
      //update jason file
      console.log('set ', CoinVal);
      const coins = await myDressStoreFunc.updateJsonValueInFile(
        '/Data/Devices',
        deviceId + '.json',
        'coins',
        CoinVal,
      );
      setCoins(CoinVal);
    } else {
      const coins = await myDressStoreFunc
        .getJsonValueFromFile('/Data/Devices', deviceId + '.json', 'coins')
        .then(coinsRet => {
          //console.log('6666', coinsRet);
          setCoins(coinsRet);
        });
    }
  };

  const processLargeFile = async (startIndex, orderBy) => {
    try {
      //let newData = [];

      const deviceId = await myDressStoreFunc.getDeviceUniqueID();
      const dirName = '/Data/MasterData';
      const fileName = dateTime + '.txt';

      let dirPath =
        myDressStoreFunc.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
      let filePath = dirPath + '/' + fileName;
      let retVal = '';

      //setItems([]);

      //create directory /Data/Images
      await myDressStoreFunc.createDirectory('/Data/Images');

      const readStream = await RNFS.readFile(filePath, 'utf8');

      //const allRecords = readStream.split('\n').filter(n => n.trim() !== '');

      //Alert.alert(orderBy.toString());

      const allRecords = createObjectFromMasterDataArray(
        readStream.split('\n').filter(n => n.trim() !== ''),
      )
        .sort((a, b) => (a[orderBy] < b[orderBy] ? 1 : -1))
        .map(n => n.line);

      // const start = startIndex;
      // const endIndex = start + itemsPerRefresh;
      // Alert.alert(start.toString());
      // const lines = allRecords.slice(start, endIndex);

      // setStartIndex(endIndex);

      const endIndex = startIndex + itemsPerRefresh;
      //Alert.alert(start.toString());
      const lines = allRecords.slice(startIndex, endIndex);

      // setStartIndex(endIndex);

      // const allRecords = masterLinesArray
      //   .sort((a, b) => (a[orderBy] < b[orderBy] ? 1 : -1))
      //   .map(n => n.line);

      //const allRecords = masterLinesArray.map(n => n.line);

      //const allRecords = masterLinesArray.sort();
      //console.log('777777777777777', allRecords[0]);

      //setTotalPages(Math.ceil(allRecords.length / ItemsPerPagePara));
      //setCurrentPage(pageNoPara);

      // const start = startIndex - 1;
      // const endIndex = startIndex + itemsPerRefresh - 1;

      // setStartIndex(
      //   allRecords.length < endIndex + 1 ? allRecords.length : endIndex + 1,
      // );

      // const lines = allRecords.slice(
      //   (pageNoPara - 1) * ItemsPerPagePara,
      //   (pageNoPara - 1) * ItemsPerPagePara + ItemsPerPagePara,
      // );

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        //process Line
        try {
          if (line.trim().length > 0) {
            //4|deviceId002.json|deviceId002\set002|2022-01-10|True|888998
            const valArray = line.split('|').map(n => n.trim());
            const jsonFileName = valArray[1];
            const setFolderName = valArray[2];
            console.log(line);
            //download ImageData File
            let imageDataFileExists = await myDressStoreFunc.fileExists(
              '/Data/Images',
              valArray[1],
            );

            //console.log('44444444', items);

            if (imageDataFileExists == false) {
              await myDressStoreFunc.downloadFile(
                '/Data/Images',
                valArray[1],
                'getImageData/' + deviceId + '/' + valArray[1],
              );
            }

            //get imageArray related to setNo and
            const imageArrayStr =
              await myDressStoreFunc.readImageArrayString_Storage(
                '/Data/Images',
                setFolderName,
                valArray[1],
              );

            //Download Image set
            await myDressStoreFunc.downloadImages(imageArrayStr, deviceId);

            // setItems([
            //   ...items,
            //   {
            //     name: line.trim(),
            //     value: imageArrayStr,
            //     deviceId: deviceId,
            //     date: valArray[3],
            //     ratings: valArray[5],
            //   },
            // ]);

            // newData.push({
            //   name: line.trim(),
            //   value: imageArrayStr,
            //   deviceId: deviceId,
            //   date: valArray[3],
            //   ratings: valArray[5],
            // });

            setItems(item => [
              ...item,
              {
                name: line.trim(),
                value: imageArrayStr,
                deviceId: deviceId,
                date: valArray[3],
                ratings: valArray[5],
              },
            ]);

            // Alert.alert('aaa');
            //setItems(item => [...item, {name: line.trim()}]);
          }

          //setItems([...items, ...newData]);
          //console.log(newData.length.toString());
          setEnableManualRefresh(true);

          //return newData;
        } catch (error) {
          console.log('processLargeFile: ', error);
        }
      }

      console.log('File processing complete');
    } catch {}
  };

  const deleteData2 = async DirName => {
    await myDressStoreFunc.cleanDirectory(DirName); //Empty will refer MobileApp1 folder or Clean All
    console.log('Successful.', DirName + ' Folder Cleaned with it self.');
  };

  const ViewFileData = async () => {
    // myDressStoreFunc.readJsonFileString_Storage(
    //   '/Data/Devices',
    //   (await myDressStoreFunc.getDeviceUniqueID()) + '.json',
    // );
    myDressStoreFunc.readJsonFileString_Storage(
      '/Data/MasterData',
      dateTime + '.txt',
    );
    //myDressStoreFunc.viewItemsInDirectory('/Data/Images');
  };

  // const getData = async () => {
  //   try {
  //     console.log('Home: Load Called.');
  //     await AsyncStorage.getItem('userData').then(val => {
  //       let userOb = null;
  //       if (val != null && val != '') {
  //         userOb = JSON.parse(val);
  //         //setUser(val);
  //         setUserName(userOb.userName.trim());
  //         setGender(userOb.gender.trim());
  //         setLevel(userOb.level);
  //         setOperationCount(userOb.operationCount);

  //         //setConfirmed(userOb.confirmed);
  //       } else {
  //         userOb = {
  //           userName: '',
  //           gender: '',
  //           //operandArray: ['x', '/', '-', '+'],
  //           operationCount: '4', //1,2,3,4=Random
  //           level: '2', // [1=Simple,2=Average,3=Hard]
  //           dateFirstOpen: new Date().toLocaleDateString(),
  //           confirmed: false,
  //         };

  //         //setUser(JSON.stringify(userOb));
  //       }

  //       if (userOb.confirmed === false) {
  //         AsyncStorage.setItem('userData', JSON.stringify(userOb));
  //         navigation.navigate('Terms And Conditions', {
  //           UserNamePara: '',
  //           GenderPara: '',
  //         });
  //       } else if (userOb.userName.trim().length === 0) {
  //         navigation.navigate('Login', {
  //           UserNamePara: userName,
  //           GenderPara: gender,
  //         });
  //       } else if (userOb.gender.trim().length === 0) {
  //         navigation.navigate('Gender', {
  //           UserNamePara: userName,
  //           GenderPara: gender,
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteData = async itemName => {
  //   try {
  //     if (itemName.trim().length > 0) {
  //       await AsyncStorage.removeItem(itemName);
  //     } else {
  //       await AsyncStorage.clear();
  //     }

  //     Alert.alert('Successful', 'AsyncStorage Cleared.');
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

  const goSettings = () => {
    //Alert.alert('Clicked');
    // navigation.navigate('Settings', {
    //   UserNamePara: userName,
    //   GenderPara: gender,
    // });
  };

  const startGame = () => {
    //Alert.alert('Clicked');
    // navigation.navigate('Game01', {
    //   UserNamePara: userName,
    //   GenderPara: gender,
    //   levelPara: level,
    //   operationCountPara: operationCount,
    // });
  };

  const getImageUrlArray = (imgPathStr, deviceId) => {
    //3|deviceId003.json|deviceId001\set001|2023-01-10|True
    let imagesOut = [];
    console.log(deviceId);

    try {
      //const imagePathArray = imgPathStr.split(',').map(n => n.trim());

      imgPathStr.forEach(image => {
        //console.log(image);
        //val = myDressStoreFunc.getImageData(image, deviceId).apiUrl;
        val = myDressStoreFunc.getImageData(image, deviceId).filePathStorage;
        imagesOut.push('file://' + val);
      });
    } catch (error) {
      console.log(error);
      //return [];
    }

    //return [];
    // const images = [
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~01.jpg',
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~02.jpg',
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~03.jpg',
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~04.jpg',
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~05~private.jpg',
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~06~private.jpg',
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~07~private.jpg',
    //   'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~08~private.jpg',
    // ];

    // const images = [
    //   'file:///data/user/0/com.andriya.elifejason/files/MobileApp1/Images/deviceId001/set001/deviceId001~set001~07~private.jpg',
    // ];

    //console.log(imagesOut);
    return imagesOut;
  };

  const buyCoins = async val => {
    Alert.alert('buyCoins');
  };

  const setOrderByFunc = async name => {
    //Alert.alert('1111');

    setOrderByUS(name);
    //setStartIndex(0);
    //newData = [];
    //setItems(item => []);
    setItems([]);

    //await getData2();
    await fetchData(0, name);

    // setTimeout(() => {
    //   fetchData(true);
    // }, 1000);

    //handlePageChange(1);
    //items.sort((a, b) => (a[name] < b[name] ? 1 : -1));

    //setItems([]);
    //handlePageChange(2);
    //handlePageChange(1);

    //setMasterLinesArray([]);
    //setItems([]);

    //await handlePageChange(1);

    //order by master

    // const allRecords = masterLinesArray.sort((a, b) =>
    //   a[name] < b[name] ? 1 : -1,
    // );

    // const allRecords = masterLinesArray.sort((a, b) =>
    //   a[name] < b[name] ? 1 : -1,
    // );
    // setMasterLinesArray(allRecords);
    //setCurrentPage(1);
    //getData2();
  };

  const renderItem = ({item}) => {
    //console.log(item);

    if (item === 'header' && currentPage === 1) {
      return (
        <View style={{height: 84, backgroundColor: colors.black}}>
          <Text
            style={{
              fontSize: 18,
              color: colors.textColor1,
              marginLeft: 5,
            }}>
            Girls in different professions are working here. New album will be
            uploaded daily.
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: colors.buttonColor1,
              borderRadius: 5,
              marginLeft: 5,
              width: 260,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, color: colors.textColor1}}>
              Try 50% discount. Today Only
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (item === 'footer') {
      return (
        <View style={{height: 200, backgroundColor: colors.black}}>
          <Text style={{fontSize: 18, color: colors.textColor1}}>footer</Text>
        </View>
      );
    } else {
      return (
        <View style={{backgroundColor: '#B0DAFF', marginBottom: 20}}>
          <Text>{item.name}</Text>
          <MultipleImageViewer
            images={getImageUrlArray(item.value, item.deviceId)}
            deviceId={item.deviceId}
            deviceIdJsonStr={deviceIdJsonStr}
            getCoinsFunc={getCoins}
            decreaseCoinsFunc={decreaseCoins}
          />
        </View>
      );
    }
  };

  return (
    <View style={{backgroundColor: colors.themeColor1}}>
      <View id="header" style={{height: 80}}>
        <View
          id="headerText"
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Image
            source={require('../assets/HeaderText.png')}
            style={{width: 150, height: 30}}
            resizeMode="contain" // Set the desired resize mode (e.g., cover, contain, stretch)
          />

          <TouchableOpacity
            onPress={() => buyCoins('')}
            style={{
              width: 150,
              //alignItems: 'center',
              //zIndex: 2,
              position: 'absolute',
              right: 0,
              //display: isImageOk(image) ? 'none' : 'flex',
            }}>
            <View
              id="coins"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.buttonColor1,
                borderRadius: 10,
                height: 35,
                width: 150,
              }}>
              <Image
                source={require('../assets/coins.png')}
                style={{width: 15, height: 20, marginRight: 3}}
                resizeMode="contain" // Set the desired resize mode (e.g., cover, contain, stretch)
              />
              <Text style={{fontSize: 18, color: colors.textColor1}}>
                Coins: {coins}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View id="filter" style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={{fontSize: 18, color: colors.textColor1, marginLeft: 5}}>
            Order By:
          </Text>
          <TouchableOpacity
            onPress={() => setOrderByFunc('rating')}
            style={{
              backgroundColor: colors.buttonColor1,
              borderRadius: 5,
              marginLeft: 5,
              width: 80,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: colors.textColor1}}>
              Ratings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOrderByFunc('date')}
            style={{
              backgroundColor: colors.buttonColor1,
              borderRadius: 5,
              marginLeft: 5,
              width: 65,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: colors.textColor1}}>Latest</Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <TouchableOpacity>
            <Text style={{fontSize: 18, color: colors.textColor1}}>Login</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View>
          <Text style={{fontSize: 18, color: colors.textColor1}}>
            Try 50% discount. Today Only.
          </Text>
        </View> */}
        {/* <View style={{alignItems: 'flex-end'}}>
          <PageNumbersNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </View> */}
      </View>

      <FlatList
        style={{}}
        keyExtractor={(item, index) => index.toString()}
        data={['header', ...items, 'footer']}
        renderItem={renderItem}
        onScroll={handleScroll}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />

      {/* <View
        id="footer"
        style={{
          backgroundColor: 'green',
          height: 80,
          //marginBottom: 0,
          //position: 'absolute',
        }}></View> */}
    </View>

    // <SafeAreaView
    //   style={{
    //     //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //     alignItems: 'center',
    //     paddingTop: Platform.OS === 'android' ? 0 : 0,
    //   }}>
    //   <StatusBar hidden={true}></StatusBar>

    //   {/* <View
    //     id="Header"
    //     style={{
    //       backgroundColor: colors.themeColor1,
    //       flexDirection: 'row',
    //       height: 60,
    //       //justifyContent: 'left',
    //       alignItems: 'center',
    //       width: '100%',
    //     }}>
    //     <Text
    //       style={{
    //         color: colors.themeTextColor1,
    //         //fontWeight: 'normal',
    //         fontSize: 24,
    //         marginLeft: 20,
    //       }}>
    //       Simple Math
    //     </Text>

    //     <IconButton
    //       style={{position: 'absolute', right: 0}}
    //       icon={() => (
    //         <FontAwesome5
    //           name="wrench"
    //           size={24}
    //           color={colors.themeTextColor1}
    //         />
    //       )}
    //       onPress={goSettings}
    //     />
    //   </View> */}

    //   <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
    //     <Text style={{fontSize: 26, color: colors.textColor1}}>
    //       Welcome {userName}
    //     </Text>
    //     <Image
    //       source={
    //         gender === 'Male'
    //           ? require('../assets/male.png')
    //           : require('../assets/female.png')
    //       }
    //       style={{
    //         width: 60,
    //         height: 60,
    //         //borderRadius: 40,
    //         //borderWidth: 5,
    //         borderColor: colors.themeColor1,
    //         position: 'relative',
    //       }}></Image>
    //   </View>

    //   <TouchableOpacity
    //     style={{
    //       height: 250,
    //       width: 300,
    //       backgroundColor: '#454545',
    //       margin: 30,
    //       alignItems: 'center',
    //       borderRadius: 30,
    //       borderWidth: 10,
    //       borderColor: '#CFD2CF',
    //     }}
    //     onPress={startGame}>
    //     <View style={{alignItems: 'center'}}>
    //       <Text style={{fontSize: 40, marginTop: 10, color: colors.textColor2}}>
    //         Game : Mix
    //       </Text>
    //       <Text style={{fontSize: 60, color: colors.textColor2}}>+ -</Text>
    //       <Text style={{fontSize: 60, color: colors.textColor2}}> x /</Text>
    //     </View>
    //   </TouchableOpacity>

    //   <View style={{marginTop: 30, alignItems: 'center'}}>
    //     <Text
    //       style={{fontSize: 24, fontWeight: 'bold', color: colors.textColor1}}>
    //       Why Simple Math?
    //     </Text>
    //     <Text style={{fontSize: 24, color: colors.textColor1}}>
    //       {' '}
    //       Easy and simple
    //     </Text>
    //     <Text style={{fontSize: 24, color: colors.textColor1}}>
    //       {' '}
    //       Improve your memory
    //     </Text>
    //     <Text style={{fontSize: 24, color: colors.textColor1}}>
    //       {' '}
    //       Keep active your brain functions
    //     </Text>
    //     <Text style={{fontSize: 24, color: colors.textColor1}}>
    //       {' '}
    //       Use 10 minutes a day...
    //     </Text>
    //   </View>
    // </SafeAreaView>
  );
}
