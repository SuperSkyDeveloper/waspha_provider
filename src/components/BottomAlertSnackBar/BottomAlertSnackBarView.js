import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, Text as RNText} from 'react-native';
import {Text} from '..';
import styles from './BottomAlertSnackBarStyles';
import SnackBar from 'rn-snackbar-component';
import {Colors} from '../../theme';

export default function BottomAlertSnackBarView(props) {
  const {language, message} = props;
  console.log({message});
  return !_.isEmpty(message) ? (
    <SnackBar
      visible={true}
      message={
        <View
          style={[
            styles.container,
            {flexDirection: language === 'ar' ? 'row-reverse' : 'row'},
          ]}>
          <RNText
            style={[
              language === 'ar' ? {marginRight: 15} : {marginLeft: 15},
              {color: Colors.white},
            ]}>
            {message}
          </RNText>
        </View>
      }
      actionHandler={() => {
        console.log('snackbar button clicked!');
      }}
      autoHidingTime={0}
    />
  ) : (
    <View />
  );
}
