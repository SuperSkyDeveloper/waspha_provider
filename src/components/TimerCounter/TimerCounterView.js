import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '..';
import styles from './TimerCounterStyles';
import {Colors} from '../../theme';
import CountDown from 'react-native-countdown-component';
import util from '../../util';

export default function TimerCounterView(props) {
  const {timeLabelColor} = props;
  return (
    <CountDown
      until={props.time}
      //duration of countdown in seconds
      timetoShow={['D', 'H', 'M', 'S']}
      //formate to show
      // onFinish={() => alert('finished')}
      //on Finish call
      digitStyle={{
        backgroundColor: 'red',
      }}
      digitTxtStyle={{color: '#fff'}}
      timeLabelStyle={{color: timeLabelColor, fontWeight: 'bold'}}
      //on Press call
      size={10}
    />
  );
}
