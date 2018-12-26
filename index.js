/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {AppNavigator} from './js/Navigator'
import codePush from 'react-native-code-push'
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

codePush.sync()

let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
});
global.storage = storage;

AppRegistry.registerComponent(appName, () => AppNavigator);
