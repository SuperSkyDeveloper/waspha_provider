import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {
  Button,
  CustomNavbar,
  DateItem,
  Loader,
  OrderItemAccordian,
  Text,
} from '../../components';
import _ from 'lodash';
import {DATE_FORMAT2, ORDER_ITEM_TYPE, strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './TraditionalOrderDetailsStyles';
export default function TraditionalOrderDetailsView(props) {
  const {
    traditionalOrderDetails,
    activeIndex,
    handleIndex,
    loading,
    wasphaVehicles,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.WASPHA_ORDERS}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />

      {loading && <Loader loading={loading} />}

      {!loading && (
        <KeyboardAwareScrollView
          scrollEnabled
          //keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={AppStyles.marginHorizontalsmall}>
          <View
            style={{
              width: '100%',
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text size={Fonts.size.small} type="medium">
                {strings.ORDER_ID} : {traditionalOrderDetails.id}
              </Text>
            </View>

            <View
              style={{
                top: -11,
              }}>
              <DateItem
                date={util.getFormattedDateTime(
                  traditionalOrderDetails.order_date,
                  DATE_FORMAT2,
                )}
                fontSize={Fonts.size.xxSmall}
                color={Colors.black}
              />
            </View>
          </View>
          <View>
            <View
              style={[AppStyles.flexRow, styles.locationWrap, {marginTop: 50}]}>
              <View style={[styles.boxSec, {flex: 1}]}>
                <Text type="semiBold" style={styles.locationHeadingText}>
                  {strings.DROP_OFF_LOCATION}
                </Text>
                <Text
                  type="medium"
                  numberOfLines={1}
                  style={styles.locationText}>
                  {traditionalOrderDetails.delivery_location.address}
                </Text>
              </View>
              <View style={{top: 8}}>
                <RnImage
                  tintColor={Colors.black}
                  // style={{height: 24, width: 22}}
                  source={Images.dropOff}
                />
              </View>
            </View>
            <View
              style={[AppStyles.flexRow, styles.locationWrap, {marginTop: 20}]}>
              <View style={[styles.boxSec, {flex: 1}]}>
                <Text type="semiBold" style={styles.locationHeadingText}>
                  {strings.PICK_UP_LOCATION}
                </Text>
                <Text
                  type="medium"
                  numberOfLines={1}
                  style={styles.locationText}>
                  {traditionalOrderDetails.pickup_location.address}
                </Text>
              </View>
              <View>
                <RnImage tintColor={Colors.black} source={Images.pickUp} />
              </View>
            </View>
          </View>

          <View style={AppStyles.mTop20}>
            <FlatList
              data={traditionalOrderDetails.items}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeIndex;
                return (
                  <OrderItemAccordian
                    active={active}
                    toggleAccordinPress={handleIndex}
                    data={item}
                    index={index}
                    itemType={ORDER_ITEM_TYPE.onlyForRead}
                  />
                );
              }}
            />
          </View>

          <Button
            disabled={
              _.isEmpty(wasphaVehicles) ||
              (!_.isEmpty(wasphaVehicles) &&
                !_.isNil(traditionalOrderDetails.driver))
            }
            onPress={() => {
              Actions.wasphaExpress({
                isShowBSheet: true,
                totalCharges: traditionalOrderDetails.package_charges,
              });
            }}
            style={[
              styles.btn,
              {marginTop: 20},
              _.isEmpty(wasphaVehicles) ||
                (!_.isEmpty(wasphaVehicles) &&
                  !_.isNil(traditionalOrderDetails.driver) && {opacity: 0.5}),
            ]}>
            <Text
              type="semiBold"
              size="small"
              style={[styles.confirmTxt, {textAlign: 'center'}]}>
              {strings.CONFIRM_WASPHA_EXPRESS}
            </Text>
          </Button>

          <Button
            disabled={!_.isNil(traditionalOrderDetails.driver)}
            onPress={() => {
              Actions.cancelOrder({orderId: traditionalOrderDetails.id});
            }}
            style={[
              styles.btn,
              {marginTop: 20},
              !_.isNil(traditionalOrderDetails.driver) && {opacity: 0.7},
            ]}>
            <Text
              type="semiBold"
              size="small"
              style={[styles.confirmTxt, {textAlign: 'center'}]}>
              {strings.CANCEL_ORDER}
            </Text>
          </Button>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
