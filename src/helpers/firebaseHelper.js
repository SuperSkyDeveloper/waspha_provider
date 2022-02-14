import _ from 'lodash';
import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {Actions} from 'react-native-router-flux';
import {
  updateDeviceTokenRequest,
  setSelectedTab,
} from '../actions/GeneralActions';
import {isOrderRatedRequest} from '../actions/ProposalActions';
import DataHandler from '../services/DataHandler';
import Util from '../util';
import {Notifications} from 'react-native-notifications';

import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
  NOTIFICATIONS_TYPE,
  LATEST_ORDER_STATUS,
  strings,
} from '../constants';
import {updateUserData} from '../actions/UserActions';
import {Images} from '../theme';
import {CHAT_SERVER} from '../RocketChat/RCConstants';
import {storeStatusChangeSuccess} from '../actions/VendorStoreAction';
import {
  getTraditionalOrderDetailsRequest,
  getTraditionalOrderDetailsSuccess,
  isRiderFound,
  isExpressRiderFound,
} from '../actions/OrdersActions';

const LOG = false;

const updateDeviceToken = async (token) => {
  let fcmToken = '';
  if (_.isUndefined(token)) {
    fcmToken = await firebase.messaging().getToken();
  }

  console.log({fcmToken});

  if (fcmToken || token)
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        device_token: fcmToken || token,
        devicePlatform: Platform.OS,
      }),
    );

  return fcmToken || token;
};

const setChannelForAndroid = async () => {
  await Notifications.setNotificationChannel({
    channelId: NOTIFICATION_CHANNEL.id,
    name: NOTIFICATION_CHANNEL.name,
    importance: 5,
    description: NOTIFICATION_CHANNEL.name,
    enableLights: true,
    enableVibration: true,
    // groupId: 'your-group',
    // showBadge: true,
    // soundFile: 'custom_sound.mp3', // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
  });
};

const getPermissions = async () => {
  let authStatus = messaging().hasPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    try {
      authStatus = await messaging().requestPermission();
    } catch (error) {
      Util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR);
    }
  }

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const showLocalNotification = async (data) => {
  console.log({showLocalNotificationData: data});

  const {title, body, type, notification_time, id, silent} = data;
  console.log({silent});
  // if (silent === 'true') {
  //   return true;
  // }
  if (silent === 'true') {
    navigateOnNotificationTap(data);
    return true;
  }

  const someId = Math.floor(Math.random() * 10) + '';

  !_.isNil(data.extra_data) && !_.isEmpty(data.extra_data)
    ? Notifications.postLocalNotification({
        body,
        title,
        sound: 'default',
        silent: false,
        data: {isLocal: true, id: someId},
        type,
        extra_data: data.extra_data,
      })
    : Notifications.postLocalNotification({
        body,
        title,
        sound: 'default',
        silent: false,
        data: {isLocal: true, id: someId},
        type,
      });

  if (type === NOTIFICATIONS_TYPE.REVIEW_RECEIVED) {
    DataHandler.getStore().dispatch(
      updateUserData({avg_rating: JSON.parse(data.extra_data).avg_rating}),
    );
  }
};

const clearAllNotifications = () => {
  firebase.notifications().removeAllDeliveredNotifications();
};

const clearBadgeNumber = () => {
  if (!Util.isPlatformAndroid()) firebase.notifications().setBadge(0);
};

const navigateOnNotificationTap = (
  data,
  isFreshLaunch = false,
  shouldNavigate = true,
) => {
  console.log({
    navigateActionsOnNotificationTap__00: data,
  });

  // switch (data && data.type) {
  switch (data.type) {
    case NOTIFICATIONS_TYPE.RFP_RECEIVED: {
      console.log('notification_data', 1);
      const finalData = JSON.parse(data.extra_data);
      if (Actions.currentScene === 'orderDetails') {
        Actions.replace('orderDetails', {
          id: finalData.id,
          isOrderRequest: true,
          showOrderCode: true,
        });
      } else {
        Actions.orderDetails({
          id: finalData.id,
          isOrderRequest: true,
          showOrderCode: true,
        });
      }
      break;
    }
    case NOTIFICATIONS_TYPE.RFP_TIMEOUT: {
      console.log('notification_data', 2);
      break;
    }

    case NOTIFICATIONS_TYPE.RFP_CANCELLED: {
      if (Actions.currentScene === 'notification') {
        Actions.replace('notification');
      } else {
        Actions.notification();
      }
      break;
    }

    case NOTIFICATIONS_TYPE.CHAT_NOTIFICATION:
      console.log('Chat Noti');
      const parsedData = JSON.parse(data.extra_data);
      let RcNames = parsedData.name.split('--');

      let userImage = `${CHAT_SERVER}/avatar/${parsedData.senderName}`;

      chatPersonName = _.capitalize(parsedData.senderName).split('_')[0];

      Actions.rocketChatContainer({
        fromChatNotification: true,
        fromListChannelName: parsedData.name,
        chattingWithPersonName:
          RcNames.length > 3
            ? `${strings.WASPHA} @ Order ID ${RcNames[1]}`
            : chatPersonName,
        // isChatActive:isActive,
        userAvatar: RcNames.length > 3 ? Images.WasphaIcon : userImage,
      });

      break;

    case NOTIFICATIONS_TYPE.PROPOSAL_ACCEPTED:
      {
        console.log('notification_data', 3);

        const finalData = JSON.parse(data.extra_data);
        if (Actions.currentScene === 'orderDetails') {
          Actions.replace('orderDetails', {
            showDeliveryMode: true,
            enableVehicleIcon: false,
            showCrossIconOfAccordian: true,
            enableUserInfoSec: true,
            shouldEnableContactOption: true,
            showPriceAndQtyOfItem: true,
            fromLatestOrder: true,
            item: {id: finalData.id},
            id: finalData.id,
            isUserChat: true,
            orderStatus: LATEST_ORDER_STATUS.ACCEPTED,
            showBtn: finalData.delivery_mode_id === 3 ? false : true,
          });
        } else {
          Actions.orderDetails({
            showDeliveryMode: true,
            enableVehicleIcon: false,
            showCrossIconOfAccordian: true,
            enableUserInfoSec: true,
            shouldEnableContactOption: true,
            showPriceAndQtyOfItem: true,
            fromLatestOrder: true,
            item: {id: finalData.id},
            id: finalData.id,
            isUserChat: true,
            orderStatus: LATEST_ORDER_STATUS.ACCEPTED,
            showBtn: finalData.delivery_mode_id === 3 ? false : true,
          });
        }
      }
      break;

    case NOTIFICATIONS_TYPE.PROPOSAL_REJECTED: {
      const finalData = JSON.parse(data.extra_data);

      if (Actions.currentScene === 'latestOrders') {
        Actions.replace('latestOrders', {
          incomingActiveTabIndex: 2,
        });
      } else {
        Actions.latestOrders({
          incomingActiveTabIndex: 2,
        });
      }

      console.log('notification_data', 4);
      break;
    }
    case NOTIFICATIONS_TYPE.PROPOSAL_REVISED: {
      const finalData = JSON.parse(data.extra_data);
      console.log('notification_data', 5);
      if (Actions.currentScene === 'proposalCenterDetails') {
        Actions.replace('proposalCenterDetails', {
          id: finalData.id,
          title: strings.PROPOSAL_CENTER,
        });
      } else {
        Actions.proposalCenterDetails({
          id: finalData.id,
          title: strings.PROPOSAL_CENTER,
        });
      }

      break;
    }
    case NOTIFICATIONS_TYPE.ORDER_DELIVERED_BY_DRIVER: {
      const finalData = JSON.parse(data.extra_data);
      console.log('notification_data', 6);
      Actions.rateMyService({
        data: JSON.parse(data.extra_data),
      });
      break;
    }
    case NOTIFICATIONS_TYPE.PAYMENT_RECEIVED_VIA_ONLINE_METHOD: {
      const finalData = JSON.parse(data.extra_data);
      console.log('notification_data', 7);
      break;
    }
    case NOTIFICATIONS_TYPE.SCHEDULED_DELIVERY_TIMING_IS_COMING: {
      const finalData = JSON.parse(data.extra_data);
      console.log('notification_data', 8);
      Actions.latestOrders();
      break;
    }
    case NOTIFICATIONS_TYPE.REVIEW_RECEIVED: {
      // DataHandler.getStore().dispatch(
      //   updateUserData({avg_rating: JSON.parse(data.extra_data).avg_rating}),
      // );
      if (Actions.currentScene === 'vendorReviews') {
        Actions.replace('vendorReviews');
      } else {
        Actions.vendorReviews();
      }
      break;
    }
    case NOTIFICATIONS_TYPE.MESSAGE_FROM_ADMIN: {
      if (!DataHandler.getStore().getState().user.data.is_approved) {
        console.log('JDHDHDH');

        return Actions.replace('_waiting', {fromNotification: Date.now()}); //drawer child have '_' before it, in navigator file it is "waiting"
      } else if (Actions.currentScene === 'notification') {
        Actions.replace('notification', {fromSameScreen: true});
      } else {
        Actions.notification();
      }
      break;
    }

    case NOTIFICATIONS_TYPE.ACCOUNT_APPROVED: {
      DataHandler.getStore().dispatch(updateUserData({is_approved: true}));

      if (Actions.currentScene === 'notification') {
        Actions.replace('notification', {
          accountApproved: true,
          fromSameScreen: true,
        });
      } else {
        Actions.notification({accountApproved: true});
      }
      break;
    }
    case NOTIFICATIONS_TYPE.PROPOSAL_EXPIRED: {
      const finalData = JSON.parse(data.extra_data);
      console.log('notification_data', 10);
      if (Actions.currentScene === 'proposalCenter') {
        Actions.replace('proposalCenter');
      } else {
        Actions.proposalCenter();
      }
      break;
    }

    case NOTIFICATIONS_TYPE.ONLINE_STATUS_UPDATE: {
      const finalData = JSON.parse(data.extra_data);
      DataHandler.getStore().dispatch(
        storeStatusChangeSuccess({is_online: finalData.is_online}),
      );
      break;
    }

    case NOTIFICATIONS_TYPE.ORDER_COMPLETED: {
      const dataIds = JSON.parse(data.extra_data);
      const orderId = dataIds.proposal_id;

      console.log('notification_data', 11);

      DataHandler.getStore().dispatch(
        isOrderRatedRequest({order_id: orderId}, (response) => {
          if (response.status && !response.data.is_rated) {
            Actions.rateMyService({
              data: JSON.parse(data.extra_data),
            });
          } else {
            if (Actions.currentScene === 'notification') {
              return Actions.replace('notification');
            } else {
              return Actions.notification();
            }
          }
        }),
      );

      break;
    }

    case NOTIFICATIONS_TYPE.NO_DRIVER_FOUND:
      DataHandler.getStore().dispatch(isRiderFound(false));
      // DataHandler.getStore().dispatch(getTraditionalOrderDetailsSuccess({}));

      break;

    case NOTIFICATIONS_TYPE.NO_EXPRESS_DRIVER_FOUND:
      {
        console.log('notification_data', 3);

        const finalData = JSON.parse(data.extra_data);
        if (Actions.currentScene === 'orderDetails') {
          Actions.replace('orderDetails', {
            showDeliveryMode: true,
            enableVehicleIcon: false,
            showCrossIconOfAccordian: true,
            enableUserInfoSec: true,
            shouldEnableContactOption: true,
            showPriceAndQtyOfItem: true,
            fromLatestOrder: true,
            item: {id: finalData.id},
            id: finalData.id,
            isUserChat: true,
            orderStatus: LATEST_ORDER_STATUS.ACCEPTED,
            showBtn: false,
          });
        } else {
          Actions.orderDetails({
            showDeliveryMode: true,
            enableVehicleIcon: false,
            showCrossIconOfAccordian: true,
            enableUserInfoSec: true,
            shouldEnableContactOption: true,
            showPriceAndQtyOfItem: true,
            fromLatestOrder: true,
            item: {id: finalData.id},
            id: finalData.id,
            isUserChat: true,
            orderStatus: LATEST_ORDER_STATUS.ACCEPTED,
            showBtn: false,
          });
        }
      }
      break;

    case NOTIFICATIONS_TYPE.EXPRESS_DRIVER_ORDER_REJECTED:
      {
        console.log('notification_data', 3);

        const finalData = JSON.parse(data.extra_data);
        if (Actions.currentScene === 'orderDetails') {
          Actions.replace('orderDetails', {
            showDeliveryMode: true,
            enableVehicleIcon: false,
            showCrossIconOfAccordian: true,
            enableUserInfoSec: true,
            shouldEnableContactOption: true,
            showPriceAndQtyOfItem: true,
            fromLatestOrder: true,
            item: {id: finalData.id},
            id: finalData.id,
            isUserChat: true,
            orderStatus: LATEST_ORDER_STATUS.ACCEPTED,
            showBtn: false,
          });
        } else {
          Actions.orderDetails({
            showDeliveryMode: true,
            enableVehicleIcon: false,
            showCrossIconOfAccordian: true,
            enableUserInfoSec: true,
            shouldEnableContactOption: true,
            showPriceAndQtyOfItem: true,
            fromLatestOrder: true,
            item: {id: finalData.id},
            id: finalData.id,
            isUserChat: true,
            orderStatus: LATEST_ORDER_STATUS.ACCEPTED,
            showBtn: false,
          });
        }
      }
      break;

    case NOTIFICATIONS_TYPE.EXPRESS_DRIVER_FOUND:
      {
        if (Actions.currentScene === 'latestOrders') {
          return Actions.replace('latestOrders', {
            incomingActiveTabIndex: 0,
          });
        } else {
          return Actions.latestOrders({
            incomingActiveTabIndex: 0,
          });
        }
      }
      break;

    case NOTIFICATIONS_TYPE.DRIVER_FOUND: {
      const dataIds = JSON.parse(data.extra_data);
      const id = dataIds.id;

      DataHandler.getStore().dispatch(
        getTraditionalOrderDetailsRequest({id}, (res) => {
          if (res) {
            DataHandler.getStore().dispatch(isRiderFound(true));

            if (Actions.currentScene === 'wasphaExpress') {
              return Actions.replace('wasphaExpress', {
                isShowBSheet: true,
              });
            } else {
              return Actions.wasphaExpress({
                isShowBSheet: true,
              });
            }
          }
        }),
      );

      break;
    }

    case NOTIFICATIONS_TYPE.DRIVER_ORDER_REJECTED: {
      const dataIds = JSON.parse(data.extra_data);
      const id = dataIds.id;

      if (
        Actions.currentScene === 'traditionalOrderDetails' ||
        Actions.currentScene === 'latestOrders'
      ) {
        return Actions.replace('traditionalOrderDetails', {id});
      } else {
        return Actions.traditionalOrderDetails({id});
      }

      break;
    }

    case NOTIFICATIONS_TYPE.LOYALTY_POINTS_UPDATED:
      DataHandler.getStore().dispatch(
        updateUserData({
          loyalty_points: JSON.parse(data.extra_data).loyalty_points,
        }),
      );

      break;

    default: {
      console.log('notification_data', 12);
      Actions.replace('notification');
    }
  }
};

export {
  getPermissions,
  clearBadgeNumber,
  updateDeviceToken,
  setChannelForAndroid,
  showLocalNotification,
  clearAllNotifications,
  navigateOnNotificationTap,
};
