import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import styles from './OrderListingItemStyles';
import {AppStyles, Metrics, Colors, Fonts, Images} from '../../theme';
import {Text, DateItem, HTMLView} from '..';
import {
  filterList,
  findAssignStatus,
  ISOToFormat,
} from '../../helpers/generalHelper';
import {
  strings,
  DATE_FORMAT2,
  PLACED_ORDER_TYPE,
  LATEST_ORDER_STATUS,
} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function OrderListingItemView(props) {
  const {
    item,
    enableUserInfoSec,
    shouldEnableContactOption,
    showCrossIconOfAccordian,
    showPriceAndQtyOfItem,
    showDeliveryMode,
    enableVehicleIcon,
    fromLatestOrder,
    isUserChat,
    deliveryVehicles,
    isCameFrom,
    wasphaIconImage,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        Actions.orderDetails({
          enableUserInfoSec,
          showDeliveryMode,
          showCrossIconOfAccordian,
          shouldEnableContactOption,
          showPriceAndQtyOfItem,
          orderStatus: item.status,
          item: {
            id: item.id,
          },
          id: item.id,
          fromLatestOrder: fromLatestOrder,
          isUserChat: isUserChat,
          isCameFrom: isCameFrom,
          showBtn: !(item.delivery_mode_id === 3 && item.status === 'accepted'),
        });
      }}
      style={[
        styles.container,
        item.order_type === PLACED_ORDER_TYPE.TRADITIONAL && {
          marginHorizontal: 10,
        },
      ]}>
      <View style={[styles.orderItemWrap]}>
        {/* picked text and date */}

        <View style={[styles.rowWrap]}>
          {item.delivery_mode_id == '3' && item.status === 'accepted' && (
            <RnImage
              style={[
                styles.wasphaBoxIcon,
                {tintColor: 'black', left: 10, top: -10},
              ]}
              source={{uri: wasphaIconImage}}
              resizeMode="contain"
            />
          )}
          {item.picked && (
            <View style={[styles.itemPickedStatus, !util.isRTL() && {top: -1}]}>
              <Text
                style={[styles.pickedText, !util.isRTL() && {top: 4}]}
                textAlign={util.rtlRightText()}>
                {strings.PICKED}
              </Text>
            </View>
          )}

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
          {/* image */}
          {item.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
            <View style={styles.imageCircularWrap}>
              <View
                style={[styles.imageWrap, util.isRTL() && AppStyles.mRight30]}>
                <RnImage
                  style={styles.profileImageStyle}
                  source={util.profilePlaceHolderImage(item.user.avatar)}
                />
              </View>
              {false && (
                <View style={styles.deliveryVehicleTypeWrap}>
                  <RnImage
                    style={styles.vehicleStyle}
                    source={{
                      uri: filterList(
                        deliveryVehicles,
                        item.delivery_vehicle_id,
                      ).image.color,
                    }}
                  />
                </View>
              )}
            </View>
          )}
          {/* desription */}
          <View style={styles.userDetailsWrap}>
            {item.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
              <Text
                type="bold"
                style={styles.textStyle}
                textAlign={util.rtlRightText()}>
                {item.user.name}
              </Text>
            )}
            {/* <Text
              type="bold"
              style={styles.textStyle}
              textAlign={util.rtlRightText()}>
              {item.user.name}
            </Text> */}
            <HTMLView
              htmlContent={item.user.name}
              type="bold"
              color={Colors.text.hexa}
              style={styles.textStyle}
              textAlign={util.rtlRightText()}
            />

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
            {!_.isNil(item.request_code) &&
              item.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
                <View
                  style={[
                    styles.orderCodeWrap,
                    util.isRTL() && AppStyles.rowReverse,
                    {alignItems: 'baseline'},
                  ]}>
                  <Text type="bold" style={styles.textStyle}>
                    {strings.REQUEST_CODE}:{' '}
                  </Text>
                  <Text type="bold" style={styles.textStyle}>
                    {item.request_code}
                  </Text>
                </View>
              )}
            {findAssignStatus(item.status) && (
              <View
                style={[
                  styles.orderCodeWrap,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <Text type="bold" style={styles.textStyle}>
                  {util.capitalizeFirstLetter(strings.ASSIGNED)}:{' '}
                </Text>
                <Text type="bold" style={styles.textStyle}>
                  {findAssignStatus(item.status)}
                </Text>
              </View>
            )}
            {!_.isEmpty(item.type) && (
              <View
                style={[
                  styles.orderCodeWrap,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <Text
                  type="bold"
                  style={styles.textStyle}
                  textAlign={util.rtlRightText()}>
                  {util.capitalizeFirstLetter(strings.DELIVERY_TYPE)}:{' '}
                </Text>
                <Text
                  type="bold"
                  style={styles.textStyle}
                  textAlign={util.rtlRightText()}>
                  {item.type === 'pickup' ? strings.PICK_UP : strings.DELIVERY}
                </Text>
              </View>
            )}

            {item.status === LATEST_ORDER_STATUS.ACCEPTED &&
              !_.isNil(item.is_delivery_mode_changed) &&
              item.is_delivery_mode_changed && (
                <View
                  style={[
                    styles.orderCodeWrap,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <Text
                    type="bold"
                    size={12}
                    // style={styles.textStyle}
                    style={{color: Colors.text.hexa, marginHorizontal: 2}}
                    textAlign={util.rtlRightText()}>
                    {/* {util.capitalizeFirstLetter(strings.DELIVERY_TYPE)}:{' '} */}
                    {strings.DELIVERY_MODE_CHANGED}
                    {' : '}
                  </Text>
                  <Text
                    type="bold"
                    // style={styles.textStyle}
                    style={{color: Colors.text.hexa, marginHorizontal: 2}}
                    size={11}
                    textAlign={util.rtlRightText()}>
                    {/* {item.type === 'pickup' ? strings.PICK_UP : strings.DELIVERY} */}
                    {strings.YES}
                  </Text>
                </View>
              )}

            {item.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
              <View style={styles.orderDescpWrap}>
                <HTMLView
                  htmlContent={util.checkIsEmpty(item.description)}
                  type="bold"
                  textAlign={util.rtlRightText()}
                  color={Colors.text.hexa}
                  size={Fonts.size.xxxxSmall}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
