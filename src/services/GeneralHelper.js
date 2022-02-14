import {StatusBar, Platform} from 'react-native';

export const customStatusBar = () => {
  StatusBar.setBarStyle('light-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }
};

//  notification actions on tap
