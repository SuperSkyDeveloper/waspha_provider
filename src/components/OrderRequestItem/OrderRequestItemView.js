import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, DateItem, TimerCounter, HTMLView} from '..';
import styles from './OrderRequestItemStyles';
import {strings, DATE_FORMAT2, TIME_FORMAT} from '../../constants';
import {ISOToFormat} from '../../helpers/generalHelper';
import {Fonts, Colors, AppStyles, Metrics, Images} from '../../theme';
import util from '../../util';

export default function OrderRequestItemView(props) {
  const {item, handlePress, totalDuration} = props;

  const handleTimer = () => {
    if (props.totalDuration) {
      return (
        <View style={[util.isRTL() ? styles.timerWrapRTL : styles.timerWrap]}>
          <TimerCounter time={totalDuration} />
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => handlePress()}
      style={styles.container}>
      {handleTimer()}
      {!_.isNil(item.is_featured) && item.is_featured && (
        <View
          style={[
            styles.giftIconWrapStyle,
            util.isRTL() ? {left: 15} : {right: 15},
          ]}>
          <RnImage source={Images.GiftIcon} tintColor={Colors.icon.giftIcon} />
        </View>
      )}
      <View
        style={[styles.orderCodeWrap, util.isRTL() && AppStyles.rowReverse]}>
        <View
          style={[
            styles.codeDateWrap,
            {
              marginLeft: Metrics.doubleMediumBaseMargin,
            },
          ]}>
          <View style={[util.isRTL() ? {marginRight: 30} : {marginRight: 20}]}>
            <View
              style={[AppStyles.flexRow, util.isRTL() && AppStyles.rowReverse]}>
              <Text
                style={styles.textColor}
                type="semiBold"
                size={Fonts.size.small}>
                {strings.ORDER_TYPE}
                {' : '}
              </Text>
              <Text
                style={styles.textColor}
                type="semiBold"
                size={Fonts.size.small}>
                {item.type.toLowerCase() === 'pickup'
                  ? ` ${strings.PICK_UP} `
                  : ` ${strings.DELIVERY} `}
              </Text>
            </View>
            <View
              style={[
                AppStyles.flexRow,
                util.isRTL() && AppStyles.rowReverse,
                {alignItems: 'baseline'},
              ]}>
              <Text
                style={styles.textColor}
                type="semiBold"
                size={Fonts.size.small}>
                {strings.ORDER_CODE}
                {' : '}
              </Text>
              <Text
                style={styles.textColor}
                type="semiBold"
                size={Fonts.size.small}>
                {' '}
                {util.checkIsEmpty(item.id)}{' '}
              </Text>
            </View>
          </View>
          <View style={[styles.dateWrap, {marginRight: 22}]}>
            <DateItem
              date={ISOToFormat(item.order_date, DATE_FORMAT2)}
              fontSize={Fonts.size.xxxxSmall}
              color={Colors.text.grey5}
            />
          </View>
        </View>
        <View style={[styles.deliveryTimeWrap]}>
          <Text style={styles.deliveryTime} type="medium">
            {ISOToFormat(item.order_date, TIME_FORMAT)}
          </Text>
        </View>
      </View>

      <View style={styles.contentWrap}>
        {/* <Text
          textAlign={util.rtlRightText()}
          style={styles.textColor}
          size={Fonts.size.xxxSmall}>
          {util.checkIsEmpty(item.description)}
        </Text> */}
        <HTMLView
          htmlContent={util.checkIsEmpty(item.description)}
          textAlign={util.rtlRightText()}
          color={Colors.text.primary}
          size={Fonts.size.xxxSmall}
        />
      </View>
    </TouchableOpacity>
  );
}
