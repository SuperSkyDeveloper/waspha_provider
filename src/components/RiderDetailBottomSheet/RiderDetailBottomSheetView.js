import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, OptionsModal, StarRating} from '..';
import styles from './RiderDetailBottomSheetStyles';
import {Colors, Images, AppStyles, Fonts, Metrics} from '../../theme';
import {
  strings,
  DUMMY_TEXT,
  TIME_FORMAT,
  PLACED_ORDER_TYPE,
} from '../../constants';
import Button from '../Button';
import {Actions} from 'react-native-router-flux';
import {filterList, ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function RiderDetailBottomSheetView(props) {
  const {
    fromDetails,
    fromWasphaExpress,
    onCloseSheet,
    isChatOption,
    setValue,
    data,
    deliveryVehicles,
  } = props;

  let vehicleImage =
    data.driver &&
    filterList(deliveryVehicles, data.driver.vehicle_id).image.color;

  return (
    <>
      <LinearGradient
        start={{x: 0.2, y: 1.4}}
        end={{x: 1.8, y: 1.3}}
        colors={Colors.gradient.primary}
        style={[
          styles.contentSec,
          data.order_type === PLACED_ORDER_TYPE.TRADITIONAL
            ? {paddingVertical: Metrics.screenHeight / 9.2}
            : {paddingVertical: Metrics.mediumBaseMargin},
        ]}>
        <View style={[styles.card, util.isRTL() && AppStyles.rowReverse]}>
          <View style={[AppStyles.flex2, util.isRTL() && AppStyles.mLeft15]}>
            <View style={util.isRTL() && AppStyles.mLeft15}>
              <View style={styles.riderImageWrap}>
                <RnImage
                  source={util.profilePlaceHolderImage(
                    data.driver && data.driver.avatar,
                  )}
                  style={styles.riderImage}
                />
              </View>
              <View>
                <RnImage
                  source={Images.DriverCircular2}
                  style={[
                    styles.driverCircularWrap,
                    util.isRTL() && styles.driverCircularWrapRtl,
                  ]}
                />
              </View>

              <View
                style={[styles.bikeWrap, util.isRTL() && styles.bikeWrapRtl]}>
                <RnImage
                  source={{uri: vehicleImage}}
                  style={styles.bikeImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.riderNameWrap}>
              <Text
                style={[
                  styles.riderNameText,
                  util.isRTL() && AppStyles.mLeft30,
                ]}>
                {!_.isEmpty(data.driver) && data.driver.name}
              </Text>
            </View>
            <View
              style={[
                styles.riderRatingWrap,
                util.isRTL() && AppStyles.mLeft15,
              ]}>
              {/* <Rating
                isDisabled={true}
                ratingCount={5}
                imageSize={13}
                tintColor={Colors.resolutionBlue}
                readonly={true}
                startingValue={data.driver && data.driver.rating}
              /> */}

              <StarRating
                initialRating={data.driver.average_rating}
                readonly={true}
                imageSize={13}
              />
            </View>
          </View>
          <View style={styles.sheetSec2}>
            {fromWasphaExpress && (
              <View>
                <Text
                  size={Fonts.size.xSmall}
                  style={styles.timeText}
                  type="bold">
                  7 Min Away
                </Text>
                <View style={styles.contactIconsParent}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('tel:+923363423232');
                    }}
                    style={[
                      {marginRight: Metrics.smallMargin},
                      styles.contactIconWrap,
                    ]}>
                    <RnImage
                      source={Images.PhoneIcon}
                      style={styles.contactIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setValue({isChatOption: true})}
                    style={[styles.contactIconWrap]}>
                    <RnImage source={Images.Chat} style={styles.contactIcon} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Button
                    style={styles.btnWrap}
                    textStyle={styles.confirmBtnText}
                    type="bold"
                    onPress={() => {
                      Actions.pop();
                    }}>
                    {strings.CONFIRM.toUpperCase()}
                  </Button>
                </View>
              </View>
            )}
            {fromDetails && (
              <View style={util.isRTL() && AppStyles.mLeft15}>
                {data.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
                  <Text
                    size={Fonts.size.xSmall}
                    style={styles.textStyle}
                    textAlign={util.rtlRightText()}
                    type="bold">
                    {strings.ITEMS_RECEIVED}
                  </Text>
                )}

                {data.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
                  <Text
                    size={Fonts.size.xxxxSmall}
                    style={styles.textStyle}
                    textAlign={util.rtlRightText()}
                    type="medium">
                    {util.checkIsEmpty(data.driver.items_received)}
                  </Text>
                )}
                <View style={AppStyles.mTop15}>
                  <Text
                    size={Fonts.size.small}
                    textAlign={util.rtlRightText()}
                    style={styles.textStyle}
                    type="bold">
                    {strings.DELIVERY_TIME}
                  </Text>
                  <View
                    style={[
                      styles.timeWrap,
                      util.isRTL()
                        ? {marginLeft: Metrics.tripleBaseMargin}
                        : {marginRight: Metrics.tripleBaseMargin},
                    ]}>
                    <Text
                      color={Colors.text.tertiary}
                      size={Fonts.size.xxSmall}
                      type="medium"
                      style={{textAlign: 'center'}}>
                      {ISOToFormat(data.driver.delivery_time, TIME_FORMAT)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      {isChatOption && (
        <OptionsModal
          isModalOpen={isChatOption}
          closeModal={setValue}
          modalType="isChatOption"
        />
      )}
    </>
  );
}
