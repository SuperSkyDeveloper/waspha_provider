import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, _View, TouchableOpacity} from 'react-native';
import {Text, RoundErrorItem} from '../../../components';
import styles from './OrderBoxStyles';
import {Images, Fonts, Colors, AppStyles, Metrics} from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import util from '../../../util';

export default function OrderBoxView(props) {
  const {
    item,
    onPress,
    spaceBetween,
    active,
    isDisabled,
    index,
    itemKey,
    imageType,
    changeDeliveryMode,
  } = props;

  let imagePath;
  if (_.isObject(item.image)) {
    item.image[imageType]
      ? (imagePath = {uri: item.image[imageType]})
      : (imagePath = Images.ItemImagePlaceholder);
  } else if (item.image) {
    imagePath = item.image;
  } else {
    imagePath = Images.Waiting;
  }

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.8}
      style={{backgroundColor: Colors.background.primary}}
      onPress={() => {
        if (changeDeliveryMode) {
          return item.action();
        }
        onPress({[itemKey]: item.id});
      }}>
      <View style={styles.boxWrap}>
        {/* {!_.isNil(item.notificationCounter) && (
          <View style={styles.badge}>
            <RoundErrorItem notificationCounter={item.notificationCounter} />
          </View>
        )} */}
        {active && (
          <View style={styles.checkedIconStyle}>
            <RnImage source={Images.CheckedIcon} resizeMode="contain" />
          </View>
        )}

        {util.isEmpty(util.selectColorTheme(item.id)) && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0.5}}
            colors={util.selectColorTheme(item.id)}
            style={[styles.box, {marginHorizontal: spaceBetween}]}>
            {
              <View style={styles.imageWrap}>
                <RnImage
                  source={imagePath}
                  resizeMode="contain"
                  style={styles.imageStyle}
                />
              </View>
            }
            <View style={styles.textWrap}>
              <Text
                type="extraBold"
                size={Fonts.size.small}
                textAlign={util.rtlRightText()}
                color={Colors.text.secondary}
                style={AppStyles.mTop10}>
                {_.isObject(item.title) &&
                  _.upperCase(item.title[util.getLanguage()])}
                {!_.isObject(item.title) && _.upperCase(item.title)}
              </Text>
              <Text
                type="bold"
                textAlign={util.rtlRightText()}
                size={Fonts.size.xxxSmall}
                color={Colors.text.secondary}
                style={styles.subTitle}>
                {_.isObject(item.subtitle) &&
                  _.upperCase(item.subtitle[util.getLanguage()])}
                {!_.isObject(item.subtitle) && _.upperCase(item.title)}
              </Text>
            </View>
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
}
