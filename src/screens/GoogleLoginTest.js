import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleLoginButton = () => {
  useEffect(() => {
    // GoogleSignin.configure({
    //   // Configure your Google Sign-In credentials here
    //   // You can obtain the webClientId from the Firebase console
    //   webClientId:
    //     '',
    // });
    GoogleSignin.configure();
  }, []);

  const [gmail, setGmail] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log('User Info:', userInfo);

      //console.log(userInfo.user.email);
      setGmail(userInfo.user.email);

      // Process the user info or navigate to the desired screen
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signOut();
      console.log('User Info:', userInfo);
      // Process the user info or navigate to the desired screen
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const buyCoins = async () => {
    if (gmail === '') {
      await handleGoogleSignIn();
    }

    //Buy Coins
    console.log(gmail);

    //Save Coins
  };

  return (
    <View>
      <Button title="coins: 0" onPress={buyCoins} />
      <Button title="Sign out with Google" onPress={handleGoogleSignOut} />
    </View>
  );
};

export default GoogleLoginButton;
