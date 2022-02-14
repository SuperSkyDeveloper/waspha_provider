import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './DateItemStyles';
import {Colors, Fonts, Images, AppStyles} from '../../theme';
import util from '../../util';

export default function DateItemView(props) {
  const {date, fontSize, color, dateTimeStyle, imageStyle} = props;
  return (
    <View
      style={[
        styles.dateWrap,
        dateTimeStyle,
        util.isRTL() && AppStyles.rowReverse,
      ]}>
      <Text
        color={color}
        size={fontSize}
        type="medium"
        textAlign={util.rtlRightText()}>
        {date}
      </Text>
      <RnImage
        style={[imageStyle, util.isRTL() && styles.imageStyleRtl]}
        source={Images.CalendarIcon}
      />
    </View>
  );
}
