import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, RoundErrorItem} from './../../../components';
import styles from './OptionListItemStyles';
import {Fonts, Colors, Images, AppStyles} from '../../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../../util';

export default function OptionListItemView(props) {
  const {item} = props;
  return (
    <TouchableOpacity
      style={[styles.optionList, util.isRTL() && AppStyles.rowReverse]}
      activeOpacity={0.8}
      onPress={() => {
        item.action();
      }}>
      <View style={[styles.leftCol, util.isRTL() && AppStyles.rowReverse]}>
        <View style={styles.badge}>
          {!_.isNil(item.notificationCounter) && (
            <RoundErrorItem notificationCounter={item.notificationCounter} />
          )}
        </View>
        <RnImage
          resizeMode="contain"
          style={[
            styles.optionIcon,
            util.isRTL() && AppStyles.mRight0,
            util.isRTL() && AppStyles.mLeft10,
          ]}
          source={item.icon}
          tintColor={Colors.text.primary}
        />
        <Text
          size={Fonts.size.normal}
          color={Colors.text.quaternary}
          type="extraBold">
          {item.title}
        </Text>
      </View>
      <View style={styles.arrowWrap}>
        <RnImage
          source={Images.UpArrow}
          style={[styles.arrowImg, util.isRTL() && styles.leftArrow]}
        />
      </View>
    </TouchableOpacity>
  );
}
