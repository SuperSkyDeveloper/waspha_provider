import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  Text,
  VendorHeader,
  DeliveryCircleItem,
  OptionListItem,
  OrderBox,
  Button,
  BackHandlerModel,
  Loader,
} from '../../components';
import styles from './StoreProfileStyles';
import {Colors, Images, Fonts, AppStyles, Metrics} from './../../theme';
import {STORE_ACTION_TYPE, strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modal';
import _ from 'lodash';
import style from '../../components/PhoneInput/style';
import util from '../../util';

export default function StoreProfileView(props) {
  const {
    isSwitchActive,
    handleSwitchBtn,
    setValue,
    delivery,
    pickup,
    isLoading,
    storeProfile,
    riders,
    BackHandler,
    isBackHandler,
    backHandlerModal,
  } = props;

  const OPTION_LIST = [
    {
      id: 1,
      title: strings.ORDER,
      icon: Images.LatestOrderIcon,
      notificationCounter: util.checkIsEmpty(
        storeProfile.unread_counts && storeProfile.unread_counts.orders,
      ),
      action: () => {
        Actions.orderRequest();
      },
    },
    {
      id: 2,
      title: strings.LATEST_ORDERS,
      icon: Images.OrderBlueIcon,
      notificationCounter: util.checkIsEmpty(
        storeProfile.unread_counts && storeProfile.unread_counts.latest_orders,
      ),
      action: () => {
        Actions.latestOrders({incomingActiveTabIndex: 0});
      },
    },
    {
      id: 3,
      title: strings.DASHBOARD,
      icon: Images.DashboardBlueIcon,
      notificationCounter: util.checkIsEmpty(
        storeProfile.unread_counts && storeProfile.unread_counts.dashboard,
      ),
      action: () => {
        Actions.vendorDashboard();
      },
    },

    // {
    //   id: 5,
    //   title: strings.ACCEPTED,
    //   subTitle: _.upperCase(strings.ORDER),
    //   bgColor: Colors.deliveryMode.offline,
    //   icon: Images.AcceptIcon,
    //   notificationCounter: util.checkIsEmpty(
    //     storeProfile.unread_counts &&
    //       storeProfile.unread_counts.accepted_orders,
    //   ),
    //   action: () => {
    //     Actions.acceptedOrders();
    //   },
    // },
  ];

  const ORDER = [
    {
      id: 1,
      title: strings.ACCEPTED,
      subTitle: _.upperCase(strings.ORDER),
      bgColor: Colors.deliveryMode.offline,
      image: Images.AcceptIcon,
      notificationCounter: util.checkIsEmpty(
        storeProfile.unread_counts &&
          storeProfile.unread_counts.accepted_orders,
      ),
      action: () => {
        Actions.acceptedOrders();
      },
    },
    {
      id: 2,
      title: strings.WASPHA,
      subTitle: strings.BOX,
      bgColor: Colors.deliveryMode.waspha,
      image: Images.BikeIcon,
      notificationCounter: util.checkIsEmpty(
        storeProfile.unread_counts && storeProfile.unread_counts.waspha_box,
      ),
      action: () => {
        Actions.wasphaOptions();
      },
    },
  ];

  return (
    <>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <Loader loading={isLoading} />
        </View>
      )}
      {!isLoading && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <VendorHeader
            isWriteReviewVisible={true}
            isSwitchVisible={true}
            isNotificationVisible={true}
            isSwitchActive={isSwitchActive}
            handleSwitchBtn={handleSwitchBtn}
            data={storeProfile}
          />
          <View style={styles.dashboardSec}>
            {/* delivery sec start*/}
            <View
              style={[
                styles.deliverySec,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              <DeliveryCircleItem
                title={strings.DELIVERY}
                image={Images.BikeRiderIcon}
                onChange={handleSwitchBtn}
                value={storeProfile.delivery && !_.isEmpty(riders)}
                type={STORE_ACTION_TYPE.CHANGE_DELIVERY}
              />
              <View style={AppStyles.mRight15}></View>
              <DeliveryCircleItem
                title={strings.PICK_UP}
                image={Images.PickUpDeliveryIcon}
                onChange={handleSwitchBtn}
                value={storeProfile.pickup}
                type={STORE_ACTION_TYPE.CHANGE_PICKUP}
              />
            </View>
            {/* delivery sec end*/}
            {/* option section */}
            <View style={styles.optionSec}>
              <FlatList
                data={OPTION_LIST}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return <OptionListItem item={item} />;
                }}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <FlatList
              data={ORDER}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.OrderSec}
              renderItem={({item, index}) => {
                return <OrderBox item={item} index={index} />;
              }}
            />
          </View>
        </ScrollView>
      )}
      {isBackHandler && (
        <BackHandlerModel
          isModalOpen={isBackHandler}
          closeModal={setValue}
          BackHandler={BackHandler}
          backHandlerModal={backHandlerModal}
        />
      )}
    </>
  );
}
