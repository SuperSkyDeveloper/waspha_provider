import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './BorderRowItemStyles';
import {AppStyles, Colors, Fonts} from './../../theme';
import {ISOToFormat} from '../../helpers/generalHelper';
import {DATE_FORMAT5} from '../../constants';
import util from '../../util';

export default function BorderRowItemView(props) {
  const {item, isForDebit,  isLastItem} = props;    //isFourthItem
  return (
    <View style={[styles.row, util.isRTL() && AppStyles.rowReverse]}>
      <View
        style={[
          styles.col,
          isLastItem && styles.bottomBorder,
          util.isRTL() && {borderRightWidth: 1},
        ]}>
        <Text size={Fonts.size.xxxxxSmall} color={Colors.text.quaternary}>
          {item.order_id}
        </Text>
      </View>
      <View style={[styles.col, isLastItem && styles.bottomBorder]}>
        <Text size={Fonts.size.xxxxxSmall} color={Colors.text.quaternary}>
          {ISOToFormat(item.order_date, DATE_FORMAT5)}
        </Text>
      </View>
      <View style={[styles.col, isLastItem && styles.bottomBorder]}>
        <Text size={Fonts.size.xxxxxSmall} color={Colors.text.quaternary}>
          {util.decimalPlaces(item.total_earning)}
        </Text>
      </View>
      <View
        style={[
          styles.col,
          isLastItem && styles.bottomBorder,
          styles.rightBorder,
          util.isRTL() && {borderRightWidth: 0},
        ]}>
        <Text size={Fonts.size.xxxxSmall} color={Colors.text.quaternary}>
          {/* {isFourthItem && isForDebit */}
                    {isForDebit 

            ? util.decimalPlaces(item.debit_amount)
            : util.decimalPlaces(item.credit_amount)}
        </Text>
      </View>
    </View>
  );
}
