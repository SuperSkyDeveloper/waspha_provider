import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './ProposalCenterDetailsStyles';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';
import {
  Text,
  CustomNavbar,
  OrderBox,
  DateItem,
  OrderItemAccordian,
  Button,
  Loader,
  HTMLView,
} from '../../components';
import {
  strings,
  DATE_FORMAT2,
  TIME_FORMAT2,
  ORDER_ITEM_TYPE,
  TIME_FORMAT,
} from '../../constants';
import {
  filterList,
  ISOToFormat,
  manageReviseItem,
} from '../../helpers/generalHelper';
import util from '../../util';
import {PROPOSAL_CENTER} from '../../constants';
import {Actions} from 'react-native-router-flux';

export default function ProposalCenterDetailsView(props) {
  const {
    title,
    handleIndex,
    activeIndex,
    detailData,
    isLoading,
    deliveryModes,
    deliveryVehicles,
    isPickup,
    id,
    isRevision,
    currencyCode,
  } = props;

  let totalAmountLength =
    util.decimalPlaces(detailData.estimate_bill).length >= 6;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={title}
        titleColor={Colors.text.secondary}
        subTitle={`${strings.ORDER_CODE}: ${id}`}
        subTitleColor={Colors.text.secondary}
        color={Colors.text.primary}
        hasBack={true}
        hasBottomRadius={true}
      />
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && !_.isNil(detailData) && !_.isEmpty(detailData) && (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.align}>
          {detailData.type === PROPOSAL_CENTER.DELIVERY && (
            <>
              <View style={styles.expiryDateTimeWrap}>
                <View>
                  <Text
                    style={AppStyles.mLeft5}
                    size={Fonts.size.xSmall}
                    color={Colors.text.hexa}
                    textAlign={util.rtlRightText()}>
                    {strings.EXPIRY_DATE}
                  </Text>
                  <DateItem
                    date={util.checkIsEmpty(
                      ISOToFormat(detailData.expiry_time, DATE_FORMAT2),
                    )}
                    fontSize={Fonts.size.xSmall}
                    dateTimeStyle={styles.dateStyle}
                    imageStyle={styles.dateIconStyle}
                    color={Colors.text.primary}
                  />
                </View>

                <View style={styles.expiryTimeSec}>
                  <View style={[styles.expiryTimeStyle1, AppStyles.mLeft5]}>
                    <Text
                      type="semiBold"
                      size={Fonts.size.small}
                      color={Colors.text.primary}>
                      {util.capitalizeFirstLetter(detailData.type)}
                    </Text>
                  </View>
                  <Text
                    style={AppStyles.mLeft5}
                    size={Fonts.size.xSmall}
                    color={Colors.text.hexa}
                    textAlign={util.rtlRightText()}>
                    {strings.EXPIRY_TIME}
                  </Text>
                  <View style={styles.expiryTimeStyle}>
                    <Text textAlign={'center'}>
                      {ISOToFormat(detailData.expiry_time, TIME_FORMAT)}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text
                  type="medium"
                  style={[styles.textStyle, styles.subheadStyle]}
                  textAlign={util.rtlRightText()}>
                  {strings.DELIVERY_LOCATION}
                </Text>
                <View style={[AppStyles.mBottom20]}>
                  <View style={[styles.addressSec, styles.shadowStyle]}>
                    {/* <Text style={styles.placeholderTextStyle}>
                      {detailData.delivery_location.address}
                    </Text> */}
                    <HTMLView
                      htmlContent={detailData.delivery_location.address}
                      textAlign={util.rtlRightText()}
                      size={Fonts.size.xxxSmall}
                      color={Colors.text.primary}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
          {detailData.type === PROPOSAL_CENTER.PICKUP && (
            <View style={[styles.align, AppStyles.mTop20, AppStyles.mBottom10]}>
              <Text
                type="semiBold"
                style={styles.pickupTimeTextStyle}
                textAlign={util.rtlRightText()}>
                {`${strings.PICK_UP_TIME}`}
              </Text>
              <View style={styles.timeWrap}>
                <Text
                  type="medium"
                  style={[AppStyles.mTop10]}
                  size={Fonts.size.small}
                  color={Colors.text.primary}
                  textAlign={util.rtlRightText()}>
                  {ISOToFormat(detailData.expiry_time, TIME_FORMAT2)} Min
                </Text>
                <View style={styles.pickupTimeStyle}>
                  <Text
                    type="semiBold"
                    size={Fonts.size.small}
                    color={Colors.text.primary}>
                    {detailData.type}
                  </Text>
                </View>
              </View>
              <View style={styles.horizontalLine}></View>
            </View>
          )}
          {!isPickup && (
            <View>
              <View style={[styles.deliveryModeWrap, AppStyles.mBottom30]}>
                <View>
                  <Text
                    type="medium"
                    style={[styles.modeTextStyle, styles.textStyle]}
                    textAlign={util.rtlRightText()}>
                    {strings.DELIVERY_MODE}
                  </Text>
                </View>
                <View
                  style={[
                    AppStyles.mLeft10,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <OrderBox
                    item={filterList(
                      deliveryModes,
                      detailData.delivery_mode_id,
                    )}
                    index={2}
                    fromProposalCreation={false}
                    isDeliveryMode={true}
                    spaceBetween={Metrics.smallMargin}
                    imageType={'white'}
                  />
                </View>
              </View>
              <View style={styles.deliveryModeWrap}>
                <View>
                  <Text
                    type="medium"
                    style={[styles.modeTextStyle, styles.textStyle]}
                    textAlign={util.rtlRightText()}>
                    {strings.DELIVERY_VEHICLE}
                  </Text>
                </View>
                <View
                  style={[
                    AppStyles.mLeft10,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <OrderBox
                    index={0}
                    item={filterList(
                      deliveryVehicles,
                      detailData.delivery_vehicle_id,
                    )}
                    fromProposalCreation={true}
                    spaceBetween={Metrics.smallMargin}
                    imageType={'white'}
                  />
                </View>
              </View>
            </View>
          )}
          <View style={styles.itemListStyle}>
            {/* accordin sec */}
            <FlatList
              data={manageReviseItem(detailData)}
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
                    itemType={ORDER_ITEM_TYPE.forProposal}
                  />
                );
              }}
            />
          </View>

          <View
            style={[
              styles.estimatedBillWrap,
              util.isRTL() && AppStyles.rowReverse,
            ]}>
            <View style={styles.estimateBillTextStyle}>
              <Text
                type="semiBold"
                textAlign={'center'}
                color={Colors.text.secondary}
                size={Fonts.size.xLarge}>{`${strings.ESTIMATE} 
${strings.BILL}`}</Text>
            </View>
            <View style={styles.espPriceTextStyle}>
              <View style={styles.espTextSecStyle}>
                <Text
                  size={Fonts.size.normal}
                  type="semiBold"
                  color={Colors.text.secondary}>
                  {currencyCode}
                </Text>
              </View>
              <View style={styles.priceStyle}>
                <Text
                  size={
                    totalAmountLength ? Fonts.size.xLarge : Fonts.size.xxLarge
                  }
                  type="semiBold"
                  color={Colors.text.quaternary}>
                  {_.isNil(detailData.total)
                    ? detailData.estimate_bill.toFixed(2)
                    : detailData.total.toFixed(2)}

                  {totalAmountLength}
                </Text>
              </View>
            </View>
          </View>

          {isRevision && (
            <Button
              color={Colors.text.primary}
              textStyle={styles.btnTextStyle}
              style={[AppStyles.flex, AppStyles.mBottom25]}
              background={Colors.button.primary}
              color={Colors.text.secondary}
              size={Fonts.size.normal}
              onPress={() => {
                Actions.proposalCreation({
                  orderDetail: detailData,
                  isRevision,
                  itemType: ORDER_ITEM_TYPE.updateProposal,
                });
              }}
              // isLoading={isLoading}
              indicatorColor={Colors.text.secondary}
              // disabled={isLoading}
              type="medium">
              {strings.UPDATE_PROPOSAL}
            </Button>
          )}
        </ScrollView>
      )}
    </View>
  );
}
