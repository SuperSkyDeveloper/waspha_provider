import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './ReasonListItemStyles';
import {Colors, Images, Fonts} from './../../theme';

export default function ReasonListItemView(props) {
  const {item, onPress, isOptionSelect} = props;

  let isSelected = isOptionSelect ? Images.ActiveCheck : Images.UnActiveCheck;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.list}
      onPress={() => {
        onPress(item.id);
      }}>
      <RnImage source={isSelected} style={styles.checkImg} />
      <Text
        style={styles.text}
        size={Fonts.size.xxSmall}
        color={Colors.text.secondary}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}
