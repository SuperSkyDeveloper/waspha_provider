import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './OptionsModalStyles';
import {Colors, Images, AppStyles, Metrics} from '../../theme';
import {LATEST_ORDER_STATUS, PLACED_ORDER_TYPE, strings} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';

export default function OptionsModalView(props) {
  const {
    modalType,
    closeModal,
    isModalOpen,
    activeId,
    setValue,
    callBack,
    deliveryModeOptions,
    onSubmit,
    isLoading,
    isUserChat,
    isDeliveryChat,
    isGroupChat,
    detailData,
    showPhoneOptions,
    showHeading,
  } = props;

  console.log({detailData});

  let chatOptions = [];

  if (detailData.order_type !== PLACED_ORDER_TYPE.TRADITIONAL) {
    chatOptions[0] = {
      id: 0,
      name: strings.USER,
      image: Images.UserIcon,
      status: isUserChat,
      rcUserName: !_.isNil(detailData.user) && detailData.user.rc_username,
      userName: !_.isNil(detailData.user) && detailData.user.name,
      userAvatar: !_.isNil(detailData.user) && detailData.user.avatar,
    };
  }

  if (detailData.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
    chatOptions[0] = {
      id: 1,
      name: strings.DELIVERY_GUY,
      image: Images.DeliveryGuyIcon,
      status: isDeliveryChat,
      rcUserName: !_.isNil(detailData.driver) && detailData.driver.rc_username,
      userName: !_.isNil(detailData.driver) && detailData.driver.name,
      userAvatar: !_.isNil(detailData.driver) && detailData.driver.avatar,
    };
  }

  if (
    detailData.status === 'assigned_online' ||
    (detailData.status === 'assigned_waspha' &&
      detailData.order_type === PLACED_ORDER_TYPE.NORMAL)
  ) {
    (chatOptions[1] = {
      id: 1,
      name: strings.DELIVERY_GUY,
      image: Images.DeliveryGuyIcon,
      status: isDeliveryChat,
      rcUserName: !_.isNil(detailData.driver) && detailData.driver.rc_username,
      userName: !_.isNil(detailData.driver) && detailData.driver.name,
      userAvatar: !_.isNil(detailData.driver) && detailData.driver.avatar,
    }),
      (chatOptions[2] = {
        id: 2,

        name: strings.GROUP_CHAT,
        image: Images.GroupChatIcon,
        status: isGroupChat,

        rcUserName: !_.isNil(detailData.user) && detailData.user.rc_username,
        rcUserName2:
          !_.isNil(detailData.driver) && detailData.driver.rc_username,
        userName: `${strings.WASPHA} @ Order ID ${detailData.id}`,
        userAvatar: Images.WasphaIcon,
      });
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.background.primary}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.09}}
          colors={Colors.gradient.primary}
          style={styles.modalStyle}>
          {showHeading && (
            <View style={styles.headTextWrap}>
              <Text type="bold" style={styles.headerText}>
                {modalType === 'isDeliveryMode'
                  ? strings.CHANGE_DELIVERY_MODE
                  : strings.CHAT_OPTION}
              </Text>
            </View>
          )}
          <View style={util.isRTL() && {alignItems: 'flex-end'}}>
            {modalType !== 'isDeliveryMode' &&
              !showPhoneOptions &&
              chatOptions.map((chatOption) => {
                console.log({
                  chatOption,
                });
                if (chatOption.status) {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        closeModal({[modalType]: false});
                        if (chatOption.id === 2) {
                          Actions.rocketChatContainer({
                            rc_username: chatOption.rcUserName,
                            rc_username2: chatOption.rcUserName2,
                            chattingWithPersonName: chatOption.userName,
                            userAvatar: chatOption.userAvatar,
                            isGroupChat: true,
                            orderId: detailData.id,
                            userRc:
                              !_.isNil(detailData.user) &&
                              detailData.user.rc_username,
                          });
                        } else {
                          Actions.rocketChatContainer({
                            rc_username: chatOption.rcUserName,
                            chattingWithPersonName: chatOption.userName,
                            userAvatar: chatOption.userAvatar,
                            orderId: detailData.id,
                            userRc:
                              !_.isNil(detailData.user) &&
                              detailData.user.rc_username,
                          });
                        }
                      }}
                      // onPress={() => {
                      //
                      // }}
                      style={[
                        styles.optionItem,
                        util.isRTL() && AppStyles.rowReverse,
                      ]}>
                      <RnImage
                        source={chatOption.image}
                        style={[
                          styles.optionIconStyle,
                          util.isRTL() && AppStyles.mLeft15,
                        ]}
                        resizeMode="contain"
                      />
                      <Text type="bold" style={styles.optionText}>
                        {chatOption.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })}

            {showPhoneOptions && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${detailData.user.contact}`);
                  }}
                  style={[styles.optionItem, {marginTop: 30}]}>
                  <Text type="bold" style={styles.optionText}>
                    {strings.CALL_CUSTOMER}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel: ${detailData.driver.contact}`);
                  }}
                  style={{
                    ...AppStyles.flexRow,
                    marginLeft: Metrics.mediumBaseMargin,
                  }}>
                  <Text type="bold" style={styles.optionText}>
                    {strings.CALL_DRIVER}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* //delivery Mode options */}
            {modalType === 'isDeliveryMode' &&
              deliveryModeOptions.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.name[util.getLanguage()]}
                    onPress={() => setValue({activeId: item.id})}
                    style={[
                      styles.optionItem,
                      util.isRTL() && AppStyles.rowReverse,
                    ]}>
                    <View
                      style={[
                        styles.radioBtn,
                        util.isRTL() && AppStyles.mLeft15,
                      ]}>
                      <View
                        style={activeId === item.id && styles.activeRadioBtn}
                      />
                    </View>
                    <Text type="bold" style={styles.optionText}>
                      {`${item.title[util.getLanguage()]} ${
                        item.subtitle[util.getLanguage()]
                      }`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          {modalType === 'isDeliveryMode' && (
            <View style={styles.btnWrap}>
              <Button
                isLoading={isLoading}
                onPress={() => {
                  // Actions.orderDetails({
                  //   showDeliveryMode: true,
                  //   enableVehicleIcon: false,
                  //   // showCrossIconOfAccordian: true,
                  //   // enableUserInfoSec: true,
                  //   // shouldEnableContactOption: true,
                  //   showPriceAndQtyOfItem: true,
                  //   fromLatestOrder: true,
                  //   item: {id: detailData.id},
                  //   id: detailData.id,
                  //   orderStatus: LATEST_ORDER_STATUS.PENDING,
                  // });
                  onSubmit(activeId);
                }}
                textStyle={styles.btnTextStyle}
                style={styles.btnStyle}>
                {strings.SUBMIT}
              </Button>
            </View>
          )}
        </LinearGradient>
      </Modal>
    </View>
  );
}
