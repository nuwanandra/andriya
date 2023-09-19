import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import RNFS from 'react-native-fs';
import MyDressStoreFunc from '../functions/MyDressStoreFunc';

import {MultipleImageViewer} from '../utils/MultipleImageViewer ';

const Test = () => {
  const [imagePath, setImagePath] = useState('file://');
  const myDressStoreFunc = new MyDressStoreFunc();

  const [data, setData] = useState(['Item 1', 'Item 2']);

  const addItem = () => {
    const newItem = `Item ${data.length + 1}`;
    setData(prevData => [...prevData, newItem]);
  };

  useEffect(() => {
    //dfdsdfsfdsfds
  }, []);

  const getImages = val => {
    const images = [
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~01.jpg',
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~02.jpg',
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~03.jpg',
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~04.jpg',
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~05~private.jpg',
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~06~private.jpg',
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~07~private.jpg',
      'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/deviceId001~set001~08~private.jpg',
    ];

    console.log(val);

    return images;
  };

  const renderItem = ({item}) => {
    console.log(item);

    return (
      <View style={{backgroundColor: '#B0DAFF', marginBottom: 20}}>
        <Text>aaa</Text>
        <MultipleImageViewer images={getImages('aaa')} />
      </View>
    );
  };

  return (
    <View>
      {/* <Image source={{uri: imagePath}} style={{width: 200, height: 200}} /> */}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Image
        source={{
          uri: 'https://picsum.photos/200/300',
        }}
        style={{width: 200, height: 200}}
      />

      <Image
        source={{
          uri: 'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/kkk.jpg',
        }}
        style={{width: 200, height: 200}}
      />

      {/* <Image source={{uri: imagePath}} style={{width: 200, height: 200}} /> */}

      <Image
        source={{uri: 'file://' + imagePath}}
        style={{width: 200, height: 200}}
      />

      <Image
        source={{uri: 'file://' + imagePath}}
        style={{width: 200, height: 200}}
      />
    </View>
  );
};

export default Test;

//const directoryPath = RNFS.DocumentDirectoryPath + '/Images';
//const downloadPath = directoryPath + '/example1.jpg';
//const downloadPathJson = directoryPath + '/example5.json';
//const saveFilePath = directoryPath + '/lll.json';
//new MyDressStoreFunc().Test();
//myDressStoreFunc.getDeviceUniqueID();
//myDressStoreFunc.cleanDirectory('/Data/Images');
//myDressStoreFunc.viewItemsInDirectory('/Data/Images');
// myDressStoreFunc.updateJsonValueInFile(
//   '/Data/Images',
//   'deviceId001.json',
//   'gmail',
//   'ddddddddddddddddddddd',
// );
// new MyDressStoreFunc().readJsonFileString_Storage(
//   '/Data/Images',
//   'deviceId001.json',
// );
//myDressStoreFunc.createDirectory('/Data/Images');
// new MyDressStoreFunc().writeContentFromAPI(
//   '/Data/Images',
//   '',
//   'getImages/deviceId001/1/1',
// );
// myDressStoreFunc.writeContentFromAPI(
//   '/Data/Images',
//   '',
//   'getImages/deviceId001/1/1',
// );

//myDressStoreFunc.sendDataToAPI('message', 'i love you');

//myDressStoreFunc.cleanDirectory('/Data/Images');
//myDressStoreFunc.viewItemsInDirectory('/Data/Images');
//myDressStoreFunc.fileExists('/Data/Images', 'modell0001.json');

//new MyDressStoreFunc().viewItemsInDirectory('/Data/Devices');
// new MyDressStoreFunc().readJsonFileString_Storage(
//   '/Data/Images',
//   'deviceId001.json',
// );
// new MyDressStoreFunc().getJsonValueFromFile(
//   '/Data/Devices',
//   'deviceId001.json',
//   'gmail',
// );
//console.log(new MyDressStoreFunc().getDeviceUniqueID());
//myDressStoreFunc.createDirectory('/Images/set0001');
//myDressStoreFunc.viewItemsInDirectory('/Images/set0001');
// const savePath = myDressStoreFunc.downloadFile(
//   '/Images/set0001',
//   'large.zip',
//   'getImage/deviceId001/large.zip',
// );
// setImagePath(savePath);
//console.log(savePath);
//myDressStoreFunc.viewItemsInDirectory('/Images/set0001');
//myDressStoreFunc.deleteFile('/Images/set0001', 'large.zip');
//console.log(imgPathLocal);
// RNFS.readDir(directoryPath)
//   .then(result => {
//     // Loop through the array and log the name of each file
//     result.forEach(file => {
//       console.log(file.name, file.size);
//     });
//   })
//   .catch(error => {
//     console.log(error.message);
//   });
// RNFS.unlink(downloadPathJson)
//   .then(() => {
//     console.log('File unlocked successfully!');
//   })
//   .catch(error => {
//     console.log('Error unlocking file:', error);
//   });
// RNFS.mkdir(directoryPath)
//   .then(() => {
//     console.log('Directory created successfully');
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
// fetch('https://apielifemobile1.azurewebsites.net/api/getDevice/deviceId001')
//   .then(response => response.blob())
//   .then(blob => {
//     return RNFS.writeFile(saveFilePath, blob);
//   })
//   .then(() => console.log('File written successfully'))
//   .catch(error => console.log('Error:', error));
// fetch('https://apielifemobile1.azurewebsites.net/api/getDevice/deviceId001')
//   .then(response => response.json())
//   .then(data => {
//     //console.log(data); // use data
//     //var userOb = data.gmail;
//     //console.log(data.gmail);
//     RNFS.writeFile(saveFilePath, JSON.stringify(data), 'utf8')
//       .then(() => {
//         console.log('File created successfully!------1');
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
//   })
//   .catch(error => {
//     console.error(error);
//   });
// RNFS.downloadFile({
//   fromUrl:
//     'https://apielifemobile1.azurewebsites.net/api/getDevice/deviceId001',
//   toFile: downloadPathJson,
//   overwrite: true,
// }).promise.then(() => {
//   setImagePath(`file://${downloadPathJson}`);
// });
// RNFS.exists(downloadPath)
//   .then(exists => {
//     if (exists) {
//       console.log('File exists');
//       RNFS.unlink(downloadPath)
//         .then(() => {
//           console.log('File unlocked successfully!');
//         })
//         .catch(error => {
//           console.log('Error unlocking file:', error);
//         });
//     } else {
//       console.log('File does not exist');
//       RNFS.downloadFile({
//         fromUrl:
//           'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/kkk.jpg',
//         toFile: downloadPath,
//         overwrite: true,
//       }).promise.then(() => {
//         setImagePath(`file://${downloadPath}`);
//       });
//     }
//   })
//   .catch(error => {
//     console.log(error.message);
//   });
// RNFS.readDir(directoryPath)
//   .then(result => {
//     // Loop through the array and log the name of each file
//     result.forEach(file => {
//       console.log(file.name, file.size);
//     });
//   })
//   .catch(error => {
//     console.log(error.message);
//   });
//console.log(imagePath);
// RNFS.readFile(saveFilePath, 'utf8')
//   .then(contents => {
//     console.log(contents);
//     let userOb = JSON.parse(contents);
//     console.log(userOb.paidItems);
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

// const deleteAllFiles = async directoryPath => {
//   const files = await RNFS.readDir(directoryPath);
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     if (file.isFile()) {
//       await RNFS.unlink(file.path);
//     }
//   }
// };

// import React, {
//   Component,
//   useState,
//   useEffect,
//   useLayoutEffect,
//   useRef,
// } from 'react';
// import {
//   View,
//   Text,
//   Animated,
//   Easing,
//   Image,
//   Button,
//   Alert,
//   Platform,
// } from 'react-native';

// import RNFS from 'react-native-fs';

// export default function Test({navigation, route}) {
//   const [imageUrl, setImageUrl] = useState('');
//   const [downloadsFolder, setDownloadsFolder] = useState('');
//   const [documentsFolder, setDocumentsFolder] = useState('');
//   const [externalDirectory, setExternalDirectory] = useState('');

//   const [downloadedFilePath, setDownloadedFilePath] = useState('');

//   const dirPath =
//     Platform.OS === 'ios'
//       ? `${RNFS.DocumentDirectoryPath}/images`
//       : `${RNFS.ExternalDirectoryPath}/images`;
//   const fileName = 'example.jpg';
//   const filePath = `${dirPath}/${fileName}`;

//   useEffect(() => {
//     //get user's file paths from react-native-fs
//     console.log('tes.js: called');
//     setDownloadsFolder(RNFS.DownloadDirectoryPath);
//     setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
//     setExternalDirectory(RNFS.ExternalStorageDirectoryPath);

//     console.log(filePath);

// RNFS.mkdir(dirPath)
//   .then(() => {
//     fetch(
//       'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/kkk.jpg',
//     )
//       .then(response => {
//         RNFS.writeFile(filePath, response._bodyBlob)
//           .then(() => console.log('File saved successfully!'))
//           .catch(error => console.log('Error saving file: ', error));
//       })
//       .catch(error => console.log('Error fetching image: ', error));
//   })
//   .catch(error => console.log('Error creating directory: ', error));

//const dirPath = RNFS.DocumentDirectoryPath + '/myDirectory';

// Read the directory contents
// RNFS.readDir(dirPath)
//   .then(files => {
//     // Log the file names
//     files.forEach(file => {
//       console.log(file.name);
//       setDownloadedFilePath(dirPath + '/' + file.name);
//     });
//   })
//   .catch(error => {
//     console.log('Error: ', error.message);
//   });

// const directoryPath = RNFS.DocumentDirectoryPath + '/Images';
// RNFS.mkdir(directoryPath)
//   .then(() => {
//     console.log('Directory created successfully');
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

//   const rootPath = RNFS.DocumentDirectoryPath;
//   RNFS.readDir(rootPath)
//     .then(result => {
//       const directoryNames = result
//         .filter(res => res.isDirectory())
//         .map(res => res.name);
//       console.log('Directory names:', directoryNames);
//     })
//     .catch(err => {
//       console.log(err.message);
//     });

// const directoryPath = RNFS.DocumentDirectoryPath + '/MbileApp1';

// RNFS.unlink(directoryPath)
//   .then(() => {
//     console.log('Directory deleted');
//   })
//   .catch(error => {
//     console.log('Error deleting directory: ', error);
//   });

// const filePath = RNFS.DocumentDirectoryPath + '/MbileApp1/example.txt';

// RNFS.writeFile(filePath, 'This is an example file', 'utf8')
//   .then(() => {
//     console.log('File created successfully!');
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

// const filePath = RNFS.DocumentDirectoryPath + '/MbileApp1/example.txt';

// RNFS.readFile(filePath, 'utf8')
//   .then(contents => {
//     console.log('File contents: ', contents);
//   })
//   .catch(error => {
//     console.log('Error reading file: ', error);
//   });

//const directoryPath = RNFS.DocumentDirectoryPath + '/myDirectory';

// RNFS.exists(directoryPath)
//   .then(exists => {
//     console.log(`Directory ${directoryPath} exists: ${exists}`);
//   })
//   .catch(error => {
//     console.log(error);
//   });
//}, []);

// fetch(
//   'https://localhost:7189/api/getImage/dadadadgkey/deviceId~set001~01.jpg',
// )
//   .then(response => response.arrayBuffer())
//   .then(blob => {
//     const url = URL.createObjectURL(blob);
//     setImageUrl(url);
//   })
//   .catch(error => console.error(error));

//   const getImageUrl = () => {
//     return 'https://apielifemobile1.azurewebsites.net/api/getImage/dadadadgkey/kkk.jpg';
//   };

//   const saveClicked = val => {
//     Alert.alert('Clicked ' + val);
//   };

//   return (
//     <View>
//       <Text>aaaaaaa</Text>

//       <Button title="Save" onPress={() => saveClicked('aaa')}></Button>
//       <Image
//         source={{
//           uri: 'https://picsum.photos/200/300',
//         }}
//         style={{width: 200, height: 200}}
//       />

//       <Image
//         source={
//           downloadedFilePath === ''
//             ? require('/storage/emulated/0/Android/data/com.andriya.elifejason/files/images/example.jpg')
//             : require('../assets/male.png')
//         }
//         style={{width: 200, height: 200}}
//       />
//     </View>
//   );
// }

// import React, {Component} from 'react';
// import {View, Animated, Easing} from 'react-native';

// class Test extends Component {
//   constructor(props) {
//     super(props);
//     this.spinValue = new Animated.Value(0);
//   }

//   componentDidMount() {
//     Animated.start(
//       Animated.timing(this.spinValue, {
//         toValue: 1,
//         duration: 3000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       }),
//     ).start(() => {
//       spinValue.setValue(0);
//     });
//   }

//   render() {
//     const spin = this.spinValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '360deg'],
//     });

//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Animated.Image
//           style={{width: 200, height: 200, transform: [{rotateY: spin}]}}
//           source={require('../assets/male.png')}
//         />
//       </View>
//     );
//   }
// }

// export default Test;

// import React, {useRef} from 'react';
// import {View, Animated, Easing, TouchableOpacity, Text} from 'react-native';

// export default function Test({navigation, route}) {
//   const spinValue = useRef(new Animated.Value(0)).current;

//   const startAnimation = () => {
//     Animated.timing(spinValue, {
//       toValue: 1,
//       duration: 400,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start(() => {
//       spinValue.setValue(0);
//     });
//   };

//   const spin = spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '180deg'],
//   });

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Animated.View style={{transform: [{rotateX: spin}]}}>
//         <TouchableOpacity onPress={startAnimation}>
//           <Text style={{fontSize: 32}}>Rotate me!</Text>
//           <View
//             style={{backgroundColor: 'pink', width: 200, height: 200}}></View>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

// import React, {useState, useEffect} from 'react';
// import {Animated, View, Text, TouchableOpacity} from 'react-native';

// export default function Test({navigation, route}) {
//   const [isShrunk, setIsShrunk] = useState(false);
//   const [animationValue, setAnimationValue] = useState(new Animated.Value(1));

//   useEffect(() => {
//     const duration = 500; // animation duration in milliseconds
//     Animated.timing(animationValue, {
//       toValue: isShrunk ? 0.5 : 1,
//       duration,
//       useNativeDriver: true,
//     }).start();
//   }, [isShrunk, animationValue]);

//   const handlePress = () => {
//     setIsShrunk(true);
//     setTimeout(() => setIsShrunk(false), 200); // delay the expansion by 1 second
//   };

//   return (
//     <Animated.View
//       style={{
//         width: 200,
//         height: 200,
//         backgroundColor: 'pink',
//         transform: [{scale: animationValue}],
//         onPress: {handlePress},
//       }}>
//       {/* <Text onPress={handlePress}>Click me to shrink and expand!</Text> */}
//       <TouchableOpacity onPress={handlePress}></TouchableOpacity>
//     </Animated.View>
//   );
// }

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Platform,
//   Modal,
//   TouchableOpacity,
//   Pressable,
//   TouchableHighlight,
//   Linking,
//   Alert,
//   TextInput,
//   Animated,
//   LayoutAnimation,
// } from 'react-native';

// import UserDefineFunc from '../functions/UserDefineFunc ';

// import {RadioButton} from 'react-native-paper';
// import colors from '../config/colorProfile';
// import CustomButton from '../utils/CustomButton';

// //import {maleImagesArray, femaleImagesArray} from '../config/AvatarImages';

// export default function Test({navigation, route}) {
//   //const {UserNamePara, GenderPara} = route.params;
//   //const [gender, setGender] = useState(GenderPara);

//   //const [maleImages, setMaleImages] = useState(new UserDefineFunc().getUserAvatar('Male'));
//   //const [femaleImages, setFemaleImages] = useState(new UserDefineFunc().getUserAvatar('Female'));

//   //const [showView, setShowView] = useState(false);

//   //   const toggleView = () => {
//   //     Animated.timing(opacity, {
//   //       toValue: showView ? 0 : 1,
//   //       duration: 2000,
//   //       useNativeDriver: true,
//   //     }).start(() => setShowView(!showView));
//   //   };

//   //const animationVal = new Animated.Value(0);

//   //const [expanded, setExpanded] = useState(false);

//   //const toggleView = () => {
//   // Animated.timing(animationVal, {
//   //   toValue: 100,
//   //   duration: 2000,
//   //   useNativeDriver: true,
//   // }).start();

//   //.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//   //setExpanded(!expanded);
//   //};

//   const [width, setWidth] = useState(300); // initial width

//   const onPress = () => {
//     // Define the animation configuration
//     const animationConfig1 = LayoutAnimation.create(
//       1000,
//       LayoutAnimation.Types.easeInEaseOut,
//       LayoutAnimation.Properties.opacity,
//     );

//     //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

//     //setWidth(width === 0 ? 1 : 0);
//     setWidth(10); // desired final width

//     // Animate the layout change
//     LayoutAnimation.configureNext(animationConfig1);

//     const animationConfig2 = LayoutAnimation.create(
//       1000,
//       LayoutAnimation.Types.easeInEaseOut,
//       LayoutAnimation.Properties.opacity,
//     );
//     setWidth(300); // desired final width

//     LayoutAnimation.configureNext(animationConfig2);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={onPress}>
//         <Text>Toggle Position</Text>
//       </TouchableOpacity>

//       <View style={[styles.box, {width: width}]} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     //width: 100,
//     height: 100,
//     backgroundColor: 'blue',
//     position: 'relative',
//   },
// });
