import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';
import styles from './DeliveryCircleItemStyles';
import {Colors, Fonts, Images, AppStyles} from './../../../theme';

export default function DeliveryCircleItemView(props) {
  const {title, image, onChange, value, type} = props;
  return (
    <TouchableOpacity
      style={AppStyles.alignItemsCenter}
      activeOpacity={1}
      onPress={() => {
        onChange(type);
      }}>
      <View
        style={[
          styles.deliveryCircle,
          !value ? styles.unSelectedInnerSec : '',
        ]}>
        <RnImage source={image} />
      </View>
      <Text
        style={styles.mtop2}
        size={Fonts.size.xxxxSmall}
        color={value ? Colors.text.accent : Colors.text.quaternary}
        type="semiBold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
