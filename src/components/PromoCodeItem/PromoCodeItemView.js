import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {DateItem, Text, TimerCounter} from '..';
import styles from './PromoCodeItemStyles';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {DATE_FORMAT2, strings} from '../../constants';
import util from '../../util';
import {ISOToFormat} from '../../helpers/generalHelper';

export default function PromoCodeItemView(props) {
  const {item, user} = props;
  return (
    <LinearGradient
      start={{x: -1.8, y: 0}}
      end={{x: -0.3, y: 3}}
      colors={Colors.gradient.primary}
      style={styles.wrapper}>
      <View style={[styles.contentStyle, util.isRTL() && AppStyles.rowReverse]}>
        <View style={[styles.imageWrap, util.isRTL() && {top: -30, left: 6}]}>
          <RnImage
            source={
              item.type === 'specific' ? {uri: user.avatar} : Images.WasphaIcon
            }
            style={{width: 70, height: 70, borderRadius: 300}}
            tintColor={item.type !== 'specific' && 'white'}
          />
        </View>
        <View
          style={[
            styles.promoCodeWrap,
            util.isRTL()
              ? {
                  marginRight: item.promo_code.length > 7 ? 0 : Metrics.screenWidth/5.8,
                }
              : {marginLeft: item.promo_code.length > 7 ? 0 : Metrics.screenWidth/8},
          ]}>
          <Text
            style={{left: 8}}
            size={Fonts.size.small}
            color={Colors.text.secondary}
            type="semiBold"
            style={{textAlign: 'left'}}>
            {`${strings.PROMO_CODE} : `}
          </Text>
          <Text
            size={Fonts.size.large}
            type="bold"
            color={Colors.text.secondary}
            style={{textAlign: 'center'}}>
            {item.promo_code}
          </Text>
        </View>

        {!_.isNil(item.end_time) && item.end_time > 0 && (
          <View
            style={[
              styles.expiryTimeWrap,
              util.isRTL() && {
                top: -10,
                right: 30,
              },
            ]}>
            <TimerCounter
              time={item.end_time}
              timeLabelColor={Colors.text.secondary}
            />
          </View>
        )}
      </View>
      <View style={[styles.dateWrap, util.isRTL() && styles.dateWrapRtl]}>
        <DateItem
          date={ISOToFormat(item.start_time, DATE_FORMAT2)}
          dateTimeStyle={{paddingVertical: 8, paddingHorizontal: 12}}
          fontSize={Fonts.size.xxxxSmall}
          color={Colors.text.grey5}
        />
      </View>
      <View style={[styles.noOfUsesWrap, util.isRTL() && AppStyles.rowReverse]}>
        <Text
          size={Fonts.size.small}
          type="semiBold"
          color={Colors.text.secondary}>
          {`${strings.NUMBER_OF_USES} : `}
        </Text>
        <Text
          size={Fonts.size.large}
          type="semiBold"
          color={Colors.text.secondary}>
          {item.number_of_uses}
        </Text>
      </View>

      <View style={[styles.discountWrap, util.isRTL() && AppStyles.rowReverse]}>
        <Text
          size={Fonts.size.xSmall}
          type="semiBold"
          color={Colors.text.secondary}>
          {`${strings.DISCOUNT} : `}
        </Text>
        <Text
          size={Fonts.size.small}
          type="semiBold"
          color={Colors.text.secondary}>
          {`${item.discount} %`}
        </Text>
      </View>
    </LinearGradient>
  );
}
