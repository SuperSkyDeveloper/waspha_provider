import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  AppState,
} from 'react-native';
import {
  Text,
  DateItem,
  CustomNavbar,
  Button,
  RemoveItemModal,
  AccordianItem,
  OrderBox,
  OptionsModal,
  DeliveryItemDetails,
  RejectModal,
  OrderItemAccordian,
  TimerCounter,
  EmptyStateText,
  Loader,
} from '../../components';
import styles from './OrderDetailsStyles';
import {
  strings,
  DATE_FORMAT2,
  TIME_FORMAT,
  LATEST_ORDER_STATUS,
  PLACED_ORDER_TYPE,
} from '../../constants';
import {ISOToFormat} from '../../helpers/generalHelper';
import {Fonts, Colors, AppStyles, Metrics, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {ORDER_ITEM_TYPE} from '../../constants';

export default function OrderDetailsView(props) {
  const {
    item,
    removeItemModal,
    openModal,
    closeModal,
    handleIndex,
    activeIndex,
    orderStatus,
    enableUserInfoSec,
    shouldEnableContactOption,
    showCrossIconOfAccordian,
    showPriceAndQtyOfItem,
    showDeliveryMode,
    setValue,
    isChatOption,
    isDeliveryMode,
    isDeliveryDetailsModal,
    showDeliveryLocation,
    showLandmark,
    showAssignedOrderTime,
    onHandleSubmit,
    btnText,
    headerText,
    deliveryModes,
    changeDeliveryMode,
    selectedModeId,
    isOrderRequest,
    showOrderCode,
    rejectModalOpen,
    closeRejectModal,
    isRejectModal,
    changeDeliveryLoader,
    detailData,
    handleChangeDeliveryMode,
    isLoading,
    reasons,
    fromLatestOrder,
    id,
    isUserChat,
    isDeliveryChat,
    isGroupChat,
    submitChatOption,
    isOrderPickup,
    buttonLoader,
    totalDuration,
    handleTimerVisible,
    showRiderModal,
    showBtn,
    isPhoneOption,
  } = props;

  const handleTimer = () => {
    if (props.totalDuration && props.totalDuration > 0) {
      return <TimerCounter time={totalDuration} />;
    }
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={`${strings.ORDER_CODE}: ${id}`}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />

      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* check is data exist */}
          {_.isEmpty(detailData) ? (
            <EmptyStateText />
          ) : (
            <View style={styles.contentSec}>
              {handleTimerVisible(detailData.status) && (
                <View style={AppStyles.mTop15}>{handleTimer()}</View>
              )}

              {showOrderCode && (
                <View
                  style={[
                    styles.orderCodeSec,
                    styles.shadowStyle,
                    styles.spacing,
                  ]}>
                  <View style={AppStyles.mBottom5}>
                    <Text
                      size={Fonts.size.medium}
                      type="semiBold"
                      style={styles.textStyle}>
                      {strings.ORDER_CODE}: {util.checkIsEmpty(detailData.id)}
                    </Text>
                  </View>

                  <View style={AppStyles.mBottom5}>
                    <DateItem
                      date={ISOToFormat(detailData.create_at, DATE_FORMAT2)}
                      fontSize={Fonts.size.small}
                      color={Colors.text.quaternary}
                    />
                  </View>
                  {!_.isNil(detailData.is_featured) && detailData.is_featured && (
                    <View
                      style={[
                        styles.giftIconWrapStyle,
                        util.isRTL() ? {left: 10} : {right: 3},
                      ]}>
                      <RnImage source={Images.GiftIcon} />
                    </View>
                  )}
                </View>
              )}
              {enableUserInfoSec && (
                <View
                  style={[
                    styles.userDetailsSec,
                    styles.shadowStyle,
                    styles.spacing,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <View style={styles.orderTypeWrap}>
                    <Text
                      textAlign="center"
                      style={[AppStyles.mLeft10]}
                      fontSize={Fonts.size.small}
                      type="semiBold">
                      {headerText(detailData.status)}
                    </Text>

                    <View
                      style={[
                        styles.userInfoWrap,
                        util.isRTL() && AppStyles.rowReverse,
                      ]}>
                      {!_.isNil(detailData.order_type) &&
                        detailData.order_type !==
                          PLACED_ORDER_TYPE.TRADITIONAL && (
                          <View
                            style={[
                              styles.circularImageWrap,
                              util.isRTL() && AppStyles.mLeft10,
                            ]}>
                            <RnImage
                              style={styles.userProfileImage}
                              source={util.profilePlaceHolderImage(
                                detailData.user.avatar,
                              )}
                            />
                          </View>
                        )}
                      <View style={styles.userDetailsWrap}>
                        <View style={AppStyles.mBottom5}>
                          {!_.isNil(detailData.order_type) &&
                            detailData.order_type !==
                              PLACED_ORDER_TYPE.TRADITIONAL && (
                              <Text
                                type="semiBold"
                                color={Colors.text.penta}
                                fontSize={Fonts.size.small}
                                textAlign={util.rtlRightText()}>
                                {util.checkIsEmpty(
                                  detailData.user && detailData.user.name,
                                )}
                              </Text>
                            )}
                          <Text
                            type="semiBold"
                            color={Colors.text.penta}
                            fontSize={Fonts.size.small}
                            textAlign={util.rtlRightText()}>
                            {`${strings.ORDER_CODE}: ${util.checkIsEmpty(
                              detailData.id,
                            )}`}
                          </Text>
                          {!_.isNil(detailData.request_code) &&
                            !_.isNil(detailData.order_type) &&
                            detailData.order_type !==
                              PLACED_ORDER_TYPE.TRADITIONAL && (
                              <Text
                                type="semiBold"
                                color={Colors.text.penta}
                                fontSize={Fonts.size.small}
                                textAlign={util.rtlRightText()}>
                                {strings.REQUEST_CODE}:{' '}
                                {util.checkIsEmpty(detailData.request_code)}
                              </Text>
                            )}
                        </View>

                        <View style={styles.userContactWrap}>
                          <TouchableOpacity
                            disabled={
                              (!shouldEnableContactOption &&
                                _.isNil(detailData.driver)) ||
                              (!_.isNil(detailData.driver) &&
                                _.isNil(detailData.driver.contact) &&
                                _.isNil(detailData.user.contact))
                            }
                            onPress={() => {
                              _.isNil(detailData.driver)
                                ? Linking.openURL(
                                    `tel:${detailData.user.contact}`,
                                  )
                                : setValue({isPhoneOption: true});
                            }}>
                            <View
                              style={
                                shouldEnableContactOption
                                  ? [styles.contactImage, AppStyles.mRight5]
                                  : [
                                      styles.disableContactImage,
                                      AppStyles.mRight5,
                                    ]
                              }>
                              <RnImage
                                style={styles.image}
                                source={Images.PhoneIcon}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={!shouldEnableContactOption}
                            onPress={() => setValue({isChatOption: true})}
                            style={
                              shouldEnableContactOption
                                ? [styles.contactImage]
                                : [styles.disableContactImage]
                            }>
                            <RnImage
                              style={styles.image}
                              source={Images.Chat}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  {showAssignedOrderTime && (
                    <View style={styles.assignedOrderTimeWrap}>
                      <View style={styles.timeTextWrap}>
                        <Text type="semiBold" textAlign={'center'}>
                          8:05
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
              <View style={[AppStyles.mTop15, styles.spacing]}>
                {_.isEmpty(detailData.status) && (
                  <Text
                    textAlign={util.rtlRightText()}
                    type="semiBold"
                    style={[
                      styles.textStyle,
                      styles.mainheadStyle,
                      AppStyles.mBottom10,
                    ]}>
                    {strings.PRODUCT_CATEGORY}
                  </Text>
                )}
                {/* landmark sec */}
                <View
                  style={[styles.timeWrap, util.isRTL() && styles.timeWrapRtl]}>
                  {_.isEmpty(detailData.status) && (
                    <View style={styles.deliveryTimeWrap}>
                      <Text type="semiBold" style={styles.deliveryTime}>
                        {ISOToFormat(detailData.create_at, TIME_FORMAT)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {/* date sec */}
              {showDeliveryLocation && !isOrderPickup && (
                <View style={[AppStyles.mBottom20, styles.spacing]}>
                  <Text
                    textAlign={util.rtlRightText()}
                    type="semiBold"
                    style={[
                      styles.textStyle,
                      styles.subheadStyle,
                      styles.subHeadingAlign,
                    ]}>
                    {strings.DELIVERY_LOCATION}
                  </Text>
                  <View style={[styles.addressSec, styles.shadowStyle]}>
                    <Text
                      textAlign={util.rtlRightText()}
                      style={styles.placeholderTextStyle}>
                      {util.checkIsEmpty(
                        detailData.delivery_location &&
                          detailData.delivery_location.address,
                      )}
                    </Text>
                  </View>
                </View>
              )}
              {/* showLandmark sec */}
              {!_.isEmpty(detailData.landmark) &&
                showLandmark &&
                !isOrderPickup && (
                  <View style={styles.spacing}>
                    <View>
                      <Text
                        textAlign={util.rtlRightText()}
                        type="semiBold"
                        style={[styles.textStyle, styles.subheadStyle]}>
                        {strings.LANDMARK}
                      </Text>
                    </View>
                    <View style={[styles.addressSec, styles.shadowStyle]}>
                      <Text
                        style={styles.placeholderTextStyle}
                        textAlign={util.rtlRightText()}>
                        {util.checkIsEmpty(detailData.landmark)}
                      </Text>
                    </View>
                  </View>
                )}
              {/* accordin sec */}
              <View style={styles.itemListStyle}>
                <FlatList
                  data={detailData.items}
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
                        itemType={
                          fromLatestOrder
                            ? ORDER_ITEM_TYPE.forProposal
                            : ORDER_ITEM_TYPE.onlyForRead
                        }
                      />
                    );
                  }}
                />
              </View>

              {/* 
          delivery Mode
          */}
              {showDeliveryMode && !isOrderPickup && (
                <View style={styles.deliveryModeWrap}>
                  <View style={styles.deliveryModeTextWrap}>
                    <Text
                      type="semiBold"
                      style={[styles.modeTextStyle]}
                      textAlign={util.rtlRightText()}>
                      {strings.DELIVERY_MODE}
                    </Text>
                  </View>
                  <View style={[styles.deliveryModeSec]}>
                    <FlatList
                      horizontal
                      data={deliveryModes}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={[
                        styles.OrderSec,
                        AppStyles.rowReverse,
                        util.isRTL() && {marginLeft: 'auto'},
                      ]}
                      renderItem={({item, index}) => {
                        console.log({item});
                        let isDisabled = _.isUndefined(item.isPressAble)
                          ? true
                          : false;
                        let changeDeliveryMode = item.title === strings.CHANGE;

                        return (
                          <OrderBox
                            isDisabled={isDisabled}
                            changeDeliveryMode={changeDeliveryMode}
                            item={item}
                            index={index}
                            imageType={'white'}
                            spaceBetween={Metrics.smallMargin}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
              )}

              {_.isEmpty(detailData.status) && (
                <View style={[styles.btnSec, styles.spacing]}>
                  <View style={styles.btnWrap}>
                    <Button
                      color={Colors.text.secondary}
                      style={[styles.btnStyle, AppStyles.shadow5]}
                      textStyle={styles.btnTextStyle}
                      onPress={rejectModalOpen}>
                      {strings.REJECT}
                    </Button>
                  </View>
                  <View style={styles.btnWrap}>
                    <Button
                      color={Colors.text.secondary}
                      style={[styles.btnStyle, AppStyles.shadow5]}
                      textStyle={styles.btnTextStyle}
                      onPress={() => {
                        Actions.proposalCreation({
                          item: item,
                          orderDetail: detailData,
                          title: strings.PROPOSAL_CREATION,
                        });
                      }}>
                      {strings.CREATE_PROPOSAL}
                    </Button>
                  </View>
                </View>
              )}

              {showBtn &&
                !isOrderRequest &&
                !_.isEmpty(deliveryModes) &&
                _.isString(btnText(detailData.status, isOrderPickup)) && (
                  <View style={styles.statusBtnWrap}>
                    <Button
                      color={Colors.text.secondary}
                      style={[styles.btnStyle, AppStyles.shadow5]}
                      textStyle={styles.btnTextStyle}
                      indicatorColor={Colors.loader.secondary}
                      isLoading={buttonLoader}
                      disabled={buttonLoader}
                      onPress={() => {
                        onHandleSubmit(detailData.status, isOrderPickup);
                      }}>
                      {btnText(detailData.status, isOrderPickup)}
                    </Button>
                  </View>
                )}
            </View>
          )}
        </ScrollView>
      )}
      {removeItemModal && (
        <RemoveItemModal
          isModalOpen={removeItemModal}
          closeModal={setValue}
          modalType="removeItemModal"
        />
      )}

      {isChatOption && (
        <OptionsModal
          detailData={detailData}
          isModalOpen={isChatOption}
          closeModal={setValue}
          modalType="isChatOption"
          isUserChat={submitChatOption(detailData.status).isUserChat}
          isDeliveryChat={submitChatOption(detailData.status).isDeliveryChat}
          isGroupChat={submitChatOption(detailData.status).isGroupChat}
        />
      )}

      {isPhoneOption && (
        <OptionsModal
          showPhoneOptions={true}
          showHeading={false}
          detailData={detailData}
          isModalOpen={isPhoneOption}
          closeModal={setValue}
          modalType="isPhoneOption"
        />
      )}

      {isDeliveryMode && (
        <OptionsModal
          isModalOpen={isDeliveryMode}
          closeModal={setValue}
          modalType="isDeliveryMode"
          onSubmit={handleChangeDeliveryMode}
          isLoading={changeDeliveryLoader}
          callBack={changeDeliveryMode}
          selectedModeId={selectedModeId}
        />
      )}
      {isDeliveryDetailsModal && (
        <DeliveryItemDetails
          isModalOpen={isDeliveryDetailsModal}
          closeModal={setValue}
          modalType="isDeliveryDetailsModal"
          showDataList={detailData}
        />
      )}

      {isRejectModal && (
        <RejectModal
          orderId={detailData.id}
          items={reasons}
          closeModal={closeRejectModal}
        />
      )}
    </View>
  );
}
