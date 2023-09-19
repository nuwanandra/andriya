/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/App';
//import App from './src/screens/Test';
//import App from './src/screens/GoogleLoginTest';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
