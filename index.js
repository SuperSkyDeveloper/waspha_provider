/**
 * @format
 */
import React from 'react';
import _ from 'lodash';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import { I18nManager} from 'react-native';


try { 
  I18nManager.allowRTL(false);
} 
catch (e) {
  console.log(e);
}

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);
