import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './RoundErrorItemStyles';
import {Colors, Fonts} from './../../theme';

export default function RoundErrorItemView(props) {
  const {notificationCounter} = props;
  return (
    <View style={styles.badge}>
      <Text
        size={Fonts.size.xSmall}
        color={Colors.text.secondary}
        type="medium">
        {notificationCounter}
      </Text>
    </View>
  );
}
