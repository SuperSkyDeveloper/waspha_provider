import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  CustomNavbar,
  Button,
  OrderBox,
  PaymentBreakDownModal,
  RemoveItemModal,
  OrderItemAccordian,
  TextInput,
  Loader,
} from '../../components';
import styles from './ProposalCreationStyles';
import {strings, TIME_FORMAT, ORDER_ITEM_TYPE} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Fonts, Colors, AppStyles, Metrics, Images} from '../../theme';
import {getTimeShortForm, ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function ProposalCreationView(props) {
  const {
    deliveryModes,
    deliveryVehicles,
    handleIndex,
    closeModal,
    openPaymentModal,
    activeVendorItemIndex,
    onConfirm,
    title,
    removeItemModal,
    handleSubmitBnt,
    setValue,
    orderDetail,
    isLoading,
    handleProposalCreation,
    createProposalData,
    handleAddNewItems,
    handleProductItemsData,
    handleRemovePrdItem,
    handleSetPrice,
    proposalPrepTime,
    proposalPrepTimeError,
    proposalSelectionTime,
    proposalSelectionTimeError,
    handleRevisionSubmit,
    isPickup,
    isRevision,
    handleTimeOptionSheet,
    refRBSheet,
    handleProposalTimeType,
    selectionTimeType,
    activeVehicleId,
    proposalPrepTimeType,
    availbleDeliveryVehicle,
    handleAvailbleVehicle,
    isOnlineDeliveryAvailable,
    isOfflineDeliveryAvailable,
    loadingScreen,
    isChangeMode,
  } = props;

  let submitBtnFun = isRevision ? handleRevisionSubmit : handleSubmitBnt;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={title}
        titleColor={Colors.text.secondary}
        subTitle={`${strings.ORDER_CODE}: ${orderDetail.id}`}
        subTitleColor={Colors.text.secondary}
        color={Colors.text.primary}
        hasBack={true}
        hasBottomRadius={true}
      />

      {loadingScreen && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Loader loading={loadingScreen} />
        </View>
      )}

      {!loadingScreen && (
        <KeyboardAwareScrollView
          style={styles.align}
          enableOnAndroid
          scrollEnabled
          showsVerticalScrollIndicator={false}>
          <View style={styles.setPriceWrap}>
            <Button
              style={styles.setPriceBtn}
              textStyle={styles.setPriceText}
              type="semiBold"
              onPress={handleSetPrice}>
              {strings.SET_PRICE}
            </Button>
          </View>
          {!isRevision && !isChangeMode && (
            <View style={styles.deliveryTimeWrap}>
              <Text style={styles.deliveryTime} type="medium">
                {ISOToFormat(orderDetail.create_at, TIME_FORMAT)}
              </Text>
            </View>
          )}
          {!isPickup && (
            <>
              <View
                style={[
                  styles.deliveryModeWrap,
                  isChangeMode && {marginTop: 40},
                ]}>
                {(isOnlineDeliveryAvailable || isOfflineDeliveryAvailable) && (
                  <View style={styles.deliveryModeTextWrap}>
                    <Text
                      type="medium"
                      style={[styles.modeTextStyle]}
                      textAlign={util.rtlRightText()}>
                      {strings.DELIVERY_MODE}
                    </Text>
                  </View>
                )}
                {/* delivery Modes */}
                <View style={util.isRTL() && AppStyles.rowReverse}>
                  <FlatList
                    horizontal
                    data={deliveryModes}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.OrderSec}
                    renderItem={({item, index}) => {
                      if (
                        !isOnlineDeliveryAvailable &&
                        item.name === 'online'
                      ) {
                        return true;
                      }
                      if (
                        !isOfflineDeliveryAvailable &&
                        item.name === 'offline'
                      ) {
                        return true;
                      }
                      let active =
                        createProposalData.deliveryModeId === item.id;
                      return (
                        <OrderBox
                          item={item}
                          index={index}
                          fromProposalCreation={true}
                          isDeliveryMode={true}
                          active={active}
                          spaceBetween={Metrics.smallMargin}
                          // new
                          imageType={'white'}
                          itemKey={'deliveryModeId'}
                          handleProposalCreation={handleProposalCreation}
                        />
                      );
                    }}
                  />
                </View>
                {!_.isEmpty(createProposalData.activeModeIdError) && (
                  <Text
                    type="medium"
                    textAlign={util.rtlRightText()}
                    size={Fonts.size.xxxxSmall}
                    color={Colors.error.primary}
                    style={[AppStyles.mBottom20, AppStyles.mLeft20]}>
                    {createProposalData.activeModeIdError}
                  </Text>
                )}
              </View>
              {!_.isEmpty(availbleDeliveryVehicle) && (
                <View style={styles.deliveryModeWrap}>
                  <View style={styles.deliveryModeTextWrap}>
                    <Text
                      type="medium"
                      style={[styles.modeTextStyle]}
                      textAlign={util.rtlRightText()}>
                      {strings.DELIVERY_VEHICLE}
                    </Text>
                  </View>

                  {/* delivery Vehicles */}

                  <View style={util.isRTL() && AppStyles.rowReverse}>
                    <FlatList
                      horizontal
                      data={availbleDeliveryVehicle}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.OrderSec}
                      renderItem={({item, index}) => {
                        let active =
                          createProposalData.deliveryVehicleId === item.id;
                        return (
                          <OrderBox
                            item={item}
                            index={index}
                            fromProposalCreation={true}
                            active={active}
                            spaceBetween={Metrics.smallMargin}
                            // new
                            imageType={'white'}
                            itemKey={'deliveryVehicleId'}
                            handleProposalCreation={handleProposalCreation}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
              )}
            </>
          )}
          {!_.isEmpty(createProposalData.deliveryVehicleIdError) && (
            <Text
              type="medium"
              size={Fonts.size.xxxxSmall}
              color={Colors.error.primary}
              textAlign={util.rtlRightText()}
              style={[AppStyles.mBottom20, AppStyles.mLeft20]}>
              {createProposalData.deliveryVehicleIdError}
            </Text>
          )}

          {/* space */}
          {isRevision && <View style={AppStyles.mTop25} />}

          {/* WASPHA COMISSION */}

          {util.isEmpty(orderDetail.waspha_fee_ratio) && (
            <View
              style={[styles.wrapper, util.isRTL() && AppStyles.rowReverse]}>
              <Text type="medium" style={[styles.modeTextStyle]}>
                {strings.WASPHA_COMISSION}
              </Text>
              <View style={styles.inputWrap}>
                <Text
                  style={[
                    AppStyles.mTop5,
                    styles.alignLeft,
                    AppStyles.mRight10,
                  ]}
                  color={Colors.text.primary}
                  size={Fonts.size.xSmall}
                  type="semiBold">
                  {util.isValueEmpty(orderDetail.waspha_fee_ratio)}%
                </Text>
              </View>
            </View>
          )}
          {/*  Proposal Preparation Time start*/}
          {/*  todo make seperate cmp*/}

          <View
            style={[
              styles.wrapper,
              AppStyles.mTop30,
              AppStyles.mBottom15,
              util.isRTL() && AppStyles.rowReverse,
            ]}>
            <Text type="medium" style={[styles.modeTextStyle, {top: -8}]}>
              {strings.ORDER_PREPARATION_TIME}
            </Text>
            <View style={styles.inputWrap}>
              <View
                style={[
                  // AppStyles.mTop15,
                  {top: -10},
                  AppStyles.flexRow,
                  AppStyles.alignItemsCenter,
                ]}>
                <TextInput
                  value={proposalPrepTime}
                  maxLength={3}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={styles.preperationInput}
                  keyboardType={'phone-pad'}
                  onChangeText={(val) => {
                    setValue({proposalPrepTime: val});
                  }}
                />
                <TouchableOpacity
                  style={[styles.preperationInput, styles.boxWrap]}
                  onPress={() => {
                    handleTimeOptionSheet('on');
                    setValue({timeBottomSheetFor: 'proposalPrepTime'});
                  }}>
                  <RnImage
                    source={Images.DownArrowIcon}
                    style={[styles.btnImage, util.isRTL() && {right: 5}]}
                  />
                  <Text size={Fonts.size.xxSmall} type="medium">
                    {/* {util.capitalizeFirstLetter(proposalPrepTimeType.title)} */}
                    {getTimeShortForm(proposalPrepTimeType.slug)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {proposalPrepTimeError !== '' && (
            <View style={styles.deliveryRangeInputErrorStyle}>
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                textAlign={util.rtlRightText()}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                {proposalPrepTimeError}
              </Text>
            </View>
          )}
          {/*  Proposal Preparation Time End*/}
          {/* proposal selection time Start */}
          <View style={util.isRTL() && AppStyles.rowReverse}>
            <Text type="medium" style={[styles.modeTextStyle, {top: 5}]}>
              {strings.PROPOSAL_TIME_OUT}
            </Text>
            <View
              style={[styles.wrapper, util.isRTL() && {marginLeft: 'auto'}]}>
              <View style={styles.inputWrap}>
                <View
                  style={[
                    // AppStyles.mTop15,
                    {top: -20},
                    AppStyles.flexRow,
                    AppStyles.alignItemsCenter,
                  ]}>
                  <TextInput
                    value={proposalSelectionTime}
                    maxLength={3}
                    placeholderTextColor={Colors.text.quaternary}
                    inputStyle={styles.preperationInput}
                    keyboardType={'phone-pad'}
                    onChangeText={(val) => {
                      setValue({proposalSelectionTime: val});
                    }}
                  />
                  <TouchableOpacity
                    style={[styles.preperationInput, styles.boxWrap]}
                    onPress={() => {
                      handleTimeOptionSheet('on');
                      setValue({timeBottomSheetFor: 'timeOut'});
                    }}>
                    <RnImage
                      source={Images.DownArrowIcon}
                      style={[styles.btnImage, util.isRTL() && {right: 5}]}
                    />
                    <Text size={Fonts.size.xxSmall} type="medium">
                      {/* {util.capitalizeFirstLetter(selectionTimeType.title)} */}
                      {getTimeShortForm(selectionTimeType.slug)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* proposalPrepTimeError error */}
          </View>
          {proposalSelectionTimeError !== '' && (
            <View style={styles.deliveryRangeInputErrorStyle}>
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                textAlign={util.rtlRightText()}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                {proposalSelectionTimeError}
              </Text>
            </View>
          )}
          {/* proposal selection time End */}

          <View style={styles.itemListStyle}>
            {/* for product item */}
            <FlatList
              data={createProposalData.items}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeVendorItemIndex;
                return (
                  <OrderItemAccordian
                    active={active}
                    isChangeMode={isChangeMode}
                    toggleAccordinPress={handleIndex}
                    data={item}
                    onChange={handleProductItemsData}
                    handleRemovePrdItem={handleRemovePrdItem}
                    handleProposalCreation={handleProposalCreation}
                    index={index}
                    itemType={
                      isRevision && !item.fromVendor
                        ? ORDER_ITEM_TYPE.updateProposal
                        : item.fromVendor
                        ? ORDER_ITEM_TYPE.createProposalForNewItems
                        : ORDER_ITEM_TYPE.createProposalForExistingItems
                    }
                  />
                );
              }}
            />
          </View>
          {!isChangeMode && (
            <View style={AppStyles.mTop15}>
              <TouchableOpacity
                onPress={handleAddNewItems}
                style={[
                  styles.newItemWrap,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <Text style={styles.newItemText} type="semiBold">
                  {strings.ADD_NEW_ITEM}
                </Text>
                <View style={styles.circularPlusStyleWrap}>
                  <RnImage
                    source={Images.CircularPlusIcon}
                    style={styles.circularPlusStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.btnWrap}>
            <Button
              style={styles.btn1Style}
              textStyle={styles.btn1Text}
              type="semiBold"
              isLoading={isLoading}
              disabled={isLoading}
              onPress={submitBtnFun}>
              {strings.SUBMIT}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      )}
      {openPaymentModal && (
        <PaymentBreakDownModal
          isModalOpen={openPaymentModal}
          onConfirm={onConfirm}
          closeModal={closeModal}
          isRevision={isRevision}
        />
      )}
      {removeItemModal && (
        <RemoveItemModal
          isModalOpen={removeItemModal}
          closeModal={setValue}
          modalType="removeItemModal"
        />
      )}

      <RBSheet
        ref={(ref) => {
          refRBSheet(ref);
        }}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000009e',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {util.PROPOSAL_TIME_TYPE().map((item) => {
          return (
            <TouchableOpacity
              style={styles.optionWrap}
              onPress={() => {
                handleProposalTimeType(item);
              }}>
              <Text type="medium" textAlign={util.rtlRightText()}>
                {item && util.capitalizeFirstLetter(item.title)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </RBSheet>
    </View>
  );
}
