import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import styles from './WasphaOrderListingItemStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {Text, DateItem} from '..';
import {findAssignStatus, ISOToFormat} from '../../helpers/generalHelper';
import {strings, DATE_FORMAT2} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function WasphaOrderListingItemView(props) {
  const {item} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        Actions.traditionalOrderDetails({id: item.id});
      }}
      style={styles.container}>
      <View style={styles.orderItemWrap}>
        {/* picked text and date */}
        <View style={styles.rowWrap}>
          <View style={[styles.dateWrap, util.isRTL() && styles.dateWrapRtl]}>
            <DateItem
              date={ISOToFormat(item.order_date, DATE_FORMAT2)}
              fontSize={Fonts.size.xxxxSmall}
              color={Colors.text.grey5}
            />
          </View>
        </View>

        {/*image and user description*/}
        <View
          style={[
            styles.userInfoItemWrap,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          {/* desription */}
          <View style={styles.userDetailsWrap}>
            <View
              style={[
                styles.orderCodeWrap,
                util.isRTL() && AppStyles.rowReverse,
                {alignItems: 'baseline'},
              ]}>
              <Text type="bold" style={styles.textStyle}>
                {strings.ORDER_CODE}:
              </Text>
              <Text type="bold" style={[styles.textStyle]}>
                {item.id}
              </Text>
            </View>

            <View
              style={[
                styles.orderCodeWrap,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              <Text type="bold" style={styles.textStyle}>
                {util.capitalizeFirstLetter(strings.ASSIGNED)}:{' '}
              </Text>
              <Text type="bold" style={styles.textStyle}>
                {findAssignStatus('assigned_waspha')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
