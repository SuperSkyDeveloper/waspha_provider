import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Button, BorderRowItem} from '../../components';
import styles from './AmountDetailItemStyles';
import {Colors, Fonts, Images, AppStyles} from './../../theme';
import {strings} from '../../constants';
import _ from 'lodash';
import util from '../../util';

export default function AmountDetailItemView(props) {
  const {item, togglePress, active, index, vendorStoreEarning: data} = props;

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={() => togglePress(index)}>
          <Text
            type="bold"
            size={Fonts.size.normal}
            color={Colors.text.secondary}>
            {item.title}
          </Text>
          <RnImage
            source={Images.UpArrow}
            style={[
              active ? styles.activeArrowImg : styles.defualtArrowImg,
              styles.arrowImg,
            ]}
          />
        </TouchableOpacity>
      </View>
      {/* body start */}
      {active && (
        <>
          <View style={styles.body}>
            <View
              style={[
                AppStyles.flexRow,
                styles.rowWrap,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              <View style={{maxWidth: '55%'}}>
                <Text
                  numberOfLines={5}
                  size={Fonts.size.large}
                  type="medium"
                  color={Colors.text.quaternary}>
                  {strings.TOTAL_AMOUNT}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text size={Fonts.size.large} color={Colors.text.accent}>
                  {util.setPaymentUnit(
                    !_.isNil(data.earning) ? data.earning.total : 0,
                  )}
                </Text>
              </View>
            </View>
            <View style={AppStyles.mTop10}>
              <View style={styles.table}>
                {/* heading row start */}
                <View
                  style={[styles.row, util.isRTL() && AppStyles.rowReverse]}>
                  <View
                    style={[styles.col, !util.isRTL() && styles.borderLeft]}>
                    <Text
                      size={Fonts.size.xxxxSmall}
                      textAlign="center"
                      color={Colors.text.quaternary}>
                      {strings.ORDER_ID}
                    </Text>
                  </View>
                  <View style={styles.col}>
                    <Text
                      size={Fonts.size.xxxxSmall}
                      textAlign="center"
                      color={Colors.text.quaternary}>
                      {strings.DATE}
                    </Text>
                  </View>
                  <View style={styles.col}>
                    <Text
                      size={Fonts.size.xxxxSmall}
                      textAlign="center"
                      color={Colors.text.quaternary}>
                      {strings.TOTAL_EARNING}
                    </Text>
                  </View>
                  <View style={[styles.col, util.isRTL() && styles.borderLeft]}>
                    <Text
                      size={Fonts.size.xxxxSmall}
                      textAlign="center"
                      color={Colors.text.quaternary}>
                      {item.id===1?strings.AMOUNT_DEBIT:strings.AMOUNT_CREDIT}
                    </Text>
                  </View>
                  {/* heading row end */}
                </View>
 
                {!_.isNil(data.earning) &&
                  !_.isNil(data.earning.orders) &&
                  data.earning.orders.map((earningItems, index) => {
                    // let isFourthItem = (index + 1) % 4 !== 0;
                    let isLastItem = util.isLastItem(
                      data.earning.orders,
                      index,
                    );
                    let isForDebit = item.id === 1;
                    return (
                      <BorderRowItem
                        key={index}
                        isForDebit={isForDebit}
                        item={earningItems}
                        // isFourthItem={isFourthItem}
                        isLastItem={isLastItem}
                      />
                    );
                  })}
              </View>
            </View>
          </View>
        </>
      )}
      {/* body end */}
    </View>
  );
}
