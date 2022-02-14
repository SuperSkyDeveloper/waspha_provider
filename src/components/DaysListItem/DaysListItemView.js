import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, RoundErrorItem} from './../../components';
import styles from './DaysListItemStyles';
import {Fonts, Colors, Images, AppStyles} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {ISOToFormat} from '../../helpers/generalHelper';
import {DATE_FORMAT3, strings} from '../../constants';
import util from '../../util';

export default function DaysListItemView(props) {
  const {item, filterValue, currencyCode} = props;

  return (
    <View style={[styles.optionList, util.isRTL() && AppStyles.rowReverse]}>
      <View style={styles.leftCol}>
        <View>
          <Text
            size={Fonts.size.large}
            color={Colors.text.quaternary}
            type="medium">
            {item.earning_day}
          </Text>
          {util.EARNING_FILTER()[2].slug != filterValue.slug && (
            <Text
              style={AppStyles.mTop5}
              size={Fonts.size.xxSmall}
              color={Colors.text.quaternary}
              type="medium">
              {ISOToFormat(item.earning_date, DATE_FORMAT3)}
            </Text>
          )}
        </View>
      </View>
      <View>
        <View style={AppStyles.flexRow}>
          <Text
            size={Fonts.size.small}
            type="extraBold"
            color={Colors.text.quaternary}>
            {currencyCode}{' '}
          </Text>
          <Text
            size={Fonts.size.xLarge}
            type="extraBold"
            color={Colors.text.primary}>
            {item.total_earning.toFixed(2)}
          </Text>
        </View>
        {false && (
          <TouchableOpacity
            style={AppStyles.selfEnd}
            onPress={() => {
              // Actions.orderDetails({
              //   id: item.order_id,
              //   // item: item,
              //   isOrderRequest: true,
              //   showOrderCode: true,
              // });
            }}>
            <Text
              size={Fonts.size.xxxxSmall}
              type="medium"
              color={Colors.text.accent}>
              {strings.ORDER_DETAILS}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
