import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {
  Text,
  Button,
  Maps,
  DateItem,
  BackButton,
  StarRating,
} from '../../components';
import styles from './OrderStatusStyles';
import {Images, AppStyles, Colors, Fonts, Metrics} from '../../theme';
import {
  DATE_FORMAT2,
  PLACED_ORDER_TYPE,
  strings,
  TIME_FORMAT,
} from '../../constants';
import util from '../../util';

import {filterList, ISOToFormat} from '../../helpers/generalHelper';

export default function OrderStatusView(props) {
  const {
    data,
    deliveryVehicles,
    driverCordsAfterInterval,
    driverTimeAndKMAfterInterval,
  } = props;
  console.log({driverCordsAfterInterval});

  let directionData = [
    {
      latitude: data.store_location.lat,
      longitude: data.store_location.lng,
    },
    {
      latitude: data.delivery_location.lat,
      longitude: data.delivery_location.lng,
    },
  ];

  if (!_.isEmpty(driverCordsAfterInterval)) {
    directionData.push({
      latitude: driverCordsAfterInterval.latitude,
      longitude: driverCordsAfterInterval.longitude,
    });
  }

  let vehicleImage =
    data &&
    data.driver &&
    filterList(deliveryVehicles, data.driver.vehicle_id).image.color;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.backWrap, util.isRTL() && styles.backWrapRtl]}>
        <BackButton
          color={Colors.text.primary}
          imageStyle={util.isRTL() && styles.rtlImage}
        />
      </View>
      <Maps
        mapHeight={300}
        riderTimeAndKM={driverTimeAndKMAfterInterval}
        directionData={directionData}
        initialRoute={directionData[0]}
        vehicleIcon={vehicleImage}
      />
      <View style={styles.contentSec}>
        <View style={[styles.card, util.isRTL() && AppStyles.rowReverse]}>
          <View style={AppStyles.flex2}>
            <View>
              <View
                style={[
                  styles.riderImageWrap,
                  util.isRTL() && styles.riderImageWrapRtl,
                ]}>
                <RnImage
                  source={util.profilePlaceHolderImage(
                    data.driver && data.driver.avatar,
                  )}
                  style={styles.riderImage}
                />
              </View>
              <View style={util.isRTL() && styles.riderImageWrapRtl}>
                <RnImage
                  source={Images.DriverCircular}
                  style={[
                    styles.driverCircularWrap,
                    util.isRTL() && styles.driverCircularWrapRtl,
                  ]}
                />
              </View>
              <View
                style={[
                  [styles.bikeWrap],
                  util.isRTL() ? {right: 45} : {left: 50},
                ]}>
                <RnImage
                  source={{uri: vehicleImage}}
                  style={[
                    styles.bikeImage,
                    util.isRTL() && styles.bikeImageRtl,
                  ]}
                />
              </View>
            </View>
            <View style={styles.riderNameWrap}>
              <Text
                style={styles.riderNameText}
                textAlign={util.rtlRightText()}>
                {util.checkIsEmpty(data.driver && data.driver.name)}
              </Text>
            </View>
            <View
              style={[
                styles.riderRatingWrap,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              {/* <Rating
                isDisabled={true}
                ratingCount={5}
                imageSize={13}
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

          <View style={styles.cardTwoSec}>
            {((!_.isNil(data.delivery_mode_id) &&
              data.delivery_mode_id === 3) ||
              data.order_type === PLACED_ORDER_TYPE.TRADITIONAL) && (
              <View style={{top: -25, alignItems: 'center'}}>
                <Text size={10} type="semiBold">
                  {strings.ESTIMATED_DELIVERY_TIME}
                </Text>
              </View>
            )}
            <View style={styles.timeWrap}>
              <Text
                style={styles.timeText}
                size={Fonts.size.xxSmall}
                type="semiBold">
                {!_.isNil(data.driver.delivery_time)
                  ? ISOToFormat(
                      data.driver && data.driver.delivery_time,
                      TIME_FORMAT,
                    )
                  : ISOToFormat(
                      data.driver && data.driver.estimated_delivery_time,
                      TIME_FORMAT,
                    )}
              </Text>
            </View>
            {!_.isNil(data.order_type) &&
              data.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
                <Text size={Fonts.size.xxSmall} type="semiBold">
                  {data.driver.items_received}
                </Text>
              )}
            {/* <View style={styles.viewDetailsBtnWrap}>
              {!_.isNil(data.order_type) &&
                data.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
                  <Button
                    style={styles.viewDetailsBtn}
                    textStyle={styles.viewDetailsTxt}
                    type="semiBold">
                    {strings.VIEW_DETAILS}
                  </Button>
                )}
            </View> */}
          </View>
        </View>
        <View style={styles.orderstatusWrap}>
          <Text style={styles.orderstatusText} type="semiBold">
            {strings.ORDER_STATUS}
          </Text>
          <Text style={styles.orderstatusText} type="semiBold">{`${
            strings.ORDER_CODE
          }: ${util.checkIsEmpty(data.id)}`}</Text>
        </View>
        <View style={styles.statusOptionWrap}>
          {data.order_flow &&
            data.order_flow.map((item, index) => {
              if (
                data.order_type === PLACED_ORDER_TYPE.TRADITIONAL &&
                (item.id === 2 || item.id === 3)
              ) {
                return;
              }
              let isLastItem = util.isLastItem(data.order_flow, index);
              let isDateAvailble = _.isNil(item.date);
              return (
                <View
                  style={[
                    styles.statusWrap,
                    util.isRTL() && styles.statusWrapRtl,
                    isLastItem && styles.noBorder,
                  ]}>
                  <View
                    style={[
                      styles.ImageTextWrap,
                      util.isRTL() && styles.ImageTextWrapRtl,
                    ]}>
                    {item.status ? (
                      <View
                        style={[
                          styles.statusOptionIconWrap,
                          util.isRTL() && styles.statusOptionIconWrapRtl,
                        ]}>
                        <RnImage
                          source={Images.Tick}
                          style={styles.tickImage}
                        />
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.statusOptionIconWrap,
                          util.isRTL() && styles.statusOptionIconRtl,
                        ]}
                      />
                    )}
                    <Text
                      style={styles.statusOptionText}
                      textAlign={util.rtlRightText()}>
                      {item.title}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.dateWrap,
                      isDateAvailble && AppStyles.pBottom20,
                      isDateAvailble && AppStyles.pTop20,
                    ]}>
                    {!isDateAvailble && (
                      <DateItem
                        date={ISOToFormat(item.date, DATE_FORMAT2)}
                        fontSize={Fonts.size.xxxxSmall}
                        dateTimeStyle={styles.dateStyle}
                        imageStyle={styles.dateIconStyle}
                      />
                    )}
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}
