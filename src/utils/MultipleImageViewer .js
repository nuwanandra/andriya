import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Button, Alert} from 'react-native';
import ImageView from 'react-native-image-viewing';
import MyDressStoreFunc, {ImageData} from '../functions/MyDressStoreFunc';
import {IconButton, Text} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../config/colorProfile';

export const MultipleImageViewer = ({
  images,
  deviceId,
  deviceIdJsonStr,
  getCoinsFunc,
  decreaseCoinsFunc,
}) => {
  const myDressStoreFunc = new MyDressStoreFunc();
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  //const [coins, setCoins] = useState(getCoinsFunc());
  const [itemVal, setItemVal] = useState(30);
  const [deviceIdJsonStrUS, setDeviceIdJsonStrUS] = useState(deviceIdJsonStr);

  const openViewer = (index, showImage) => {
    setCurrentIndex(index);

    if (showImage) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    //console.log(index);
  };

  const closeViewer = () => {
    setVisible(false);
  };

  const ReloadImage = async imageUrl => {
    // Handle button press logic here
    //console.log(image);
    const segments = imageUrl.split('/'); // Split the path by "/"
    const imageName = segments[segments.length - 1];
    //console.log('333333', imageName);
    const valArray = imageName.split('~').map(n => n.trim());
    const deviceIdModel = valArray[0].trim();
    const setNo = valArray[1].trim();

    await myDressStoreFunc.deleteFile(
      '/Images/' + deviceIdModel + '/' + setNo,
      imageName,
    );

    await myDressStoreFunc.downloadFile(
      '/Images/' + deviceIdModel + '/' + setNo,
      imageName,
      'getImage/' + deviceId + '/' + imageName,
    );
  };

  const isImageOk = imageUrl => {
    // Handle button press logic here
    //console.log(image);
    const segments = imageUrl.split('/'); // Split the path by "/"
    const imageName = segments[segments.length - 1];
    let retVal = true;

    const ImageDataOb = myDressStoreFunc.getImageData(imageName, deviceId);

    const paidItems = JSON.parse(deviceIdJsonStrUS).paidItems;

    if (ImageDataOb.type === 'private' && paidItems.indexOf(imageName) < 0) {
      retVal = false;
    } else {
      retVal = true;
    }

    return retVal;
  };

  const onItemBuy = async imageUrl => {
    console.log(getCoinsFunc(), itemVal);
    if (getCoinsFunc() < itemVal) {
      Alert.alert(
        'Title',
        'You do not have enough coins. Try to buy coins with discount rate.',
      );
    } else {
      await decreaseCoinsFunc(); //In javascript function pass is Pass by Reference. this function is home page.
      //will update json files coins

      //Add image to paiditems of user data
      const segments = imageUrl.split('/'); // Split the path by "/"
      const imageName = segments[segments.length - 1];
      console.log(imageName);

      await myDressStoreFunc.updateJsonValueInFile(
        'Data/Devices',
        deviceId + '.json',
        'paidItems',
        imageName,
      );

      //show image
      const data = JSON.parse(deviceIdJsonStrUS);
      data['paidItems'].push(imageName);
      const UpdatedData = JSON.stringify(data);
      deviceIdJsonStr = UpdatedData;
      setDeviceIdJsonStrUS(UpdatedData);
      console.log(setDeviceIdJsonStrUS);
    }
  };

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            isImageOk(image) === true
              ? openViewer(index, true)
              : openViewer(index, false)
          }>
          <View>
            <Image
              blurRadius={isImageOk(image) === false ? 20 : 0}
              source={{uri: image}}
              style={{width: 200, height: 200, resizeMode: 'cover', zIndex: 1}}
            />

            <TouchableOpacity
              onPress={() => onItemBuy(image)}
              style={{
                zIndex: 2,
                position: 'absolute',
                right: 0,
                display: isImageOk(image) ? 'none' : 'flex',
              }}>
              <View
                id="coinSpend"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.transparentBackgroundColor1,
                  borderRadius: 50,
                  height: 40,
                  width: 50,
                }}>
                <Image
                  source={require('../assets/coinItem.png')}
                  style={{width: 15, height: 20}}
                  resizeMode="contain" // Set the desired resize mode (e.g., cover, contain, stretch)
                />
                <Text style={{fontSize: 20, color: 'white'}}>{itemVal}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      <ImageView
        images={images
          .filter(n => isImageOk(n))
          .map(image => ({
            uri: isImageOk(image) === true ? image : image,
          }))}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={closeViewer}
      />
    </View>
  );
};
