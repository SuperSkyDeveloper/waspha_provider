import React from 'react';
import _ from 'lodash';
import {BackHandler, View, Alert, AppState} from 'react-native';

import '@react-native-firebase/messaging';
import PropTypes from 'prop-types';
import StoreProfileView from './StoreProfileView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
  storeStatusChangeRequest,
  storeProfileRequest,
} from '../../actions/VendorStoreAction';
import {STORE_ACTION_TYPE} from '../../constants';
import util from '../../util';
import {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  navigateOnNotificationTap,
  clearBadgeNumber,
} from '../../helpers/firebaseHelper';

import {storeDriversRequest} from '../../actions/DriverActions';
import {checkDeviceStateRequest} from '../../actions/GeneralActions';

import {Notifications} from 'react-native-notifications';
import SocketHelper from '../../helpers/SocketHelper';

class StoreProfileController extends React.Component {
  constructor() {
    super();
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      isSwitchActive: false,
      delivery: true,
      pickup: true,
      isLoading: true,
      isBackHandler: false,
      appState: AppState.currentState,
    };
  }
  static propTypes = {};
  static defaultProps = {};
  componentDidMount() {
    this.initial();

    if (!_.isEmpty(this.props.user.access_token)) {
      AppState.addEventListener('change', this.handleAppStateChange);

      this._fcmInit();
    }
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  backHandlerModal = () => {
    return this.setState({
      isBackHandler: false,
    });
  };
  handleBackButtonClick = () => {
    if (Actions.state.index === 0) {
      this.setState({
        isBackHandler: true,
      });
      return true;
    }
    return false;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    if (
      !_.isNil(this.props.user.access_token) &&
      !_.isEmpty(this.props.user.access_token)
    ) {
      AppState.removeEventListener('change', this.handleAppStateChange);

      this.registerRemoteNotifications &&
        this.registerRemoteNotifications.remove();
      this.registerRemoteNotificationsRegistered &&
        this.registerRemoteNotificationsRegistered.remove();
      this.registerRemoteNotificationsRegistrationFailed &&
        this.registerRemoteNotificationsRegistrationFailed.remove();
      this.registerNotificationReceivedForeground &&
        this.registerNotificationReceivedForeground.remove();
      this.registerNotificationOpened &&
        this.registerNotificationOpened.remove();
      this.registerNotificationReceivedBackground &&
        this.registerNotificationReceivedBackground.remove();
    }
  }

  //
  componentWillReceiveProps(nextProps) {
    // if user delivery and pickup off then store goes offline
    if (!nextProps.storeProfile.delivery && !nextProps.storeProfile.pickup) {
      if (nextProps.storeProfile.is_online) {
        const payload = {
          is_online: false,
        };
        this.props.storeStatusChangeRequest(payload);
      }
    }
  }

  handleAppStateChange = () => {
    if (AppState.currentState === 'active') {
      console.log('<<<<<<<<<<<<<<<< ON >>>>>>>>>>>>>>>>.');

      this.changeScreenStatus(true);
    } else {
      this.changeScreenStatus(false);
    }
    this.setState({appState: AppState.currentState});
  };

  changeScreenStatus = (appState) => {
    const {checkDeviceStateRequest} = this.props;
    const payload = {
      is_device_active: appState,
    };

    checkDeviceStateRequest(payload, (res) => {});
  };

  // initial request
  initial = () => {
    this.props.storeProfileRequest({}, () => {
      this.props.storeDriversRequest({is_available: true}, () => {
        // stop loading
        this.setState({
          isLoading: false,
        });
      });
    });
  };

  _fcmInit = async () => {
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    this.registerRemoteNotifications = Notifications.registerRemoteNotifications();
    console.log('asdiksajdkkaj');

    Notifications.getInitialNotification()
      .then((notification) => {
        console.log({notification});
        if (!_.isNil(notification) && _.isNil(notification.data)) {
          console.log(
            'Initial notification was:',
            // notification ? notification.payload : 'N/A',
          );

          navigateOnNotificationTap(notification.payload);
        }
      })

      .catch((err) => {
        console.error('getInitialNotifiation() failed', err);
      });

    this.registerRemoteNotificationsRegistered = Notifications.events().registerRemoteNotificationsRegistered(
      (event) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      },
    );
    this.registerRemoteNotificationsRegistrationFailed = Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event) => {
        console.error(event);
      },
    );

    this.registerNotificationReceivedForeground = Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification);

        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          showLocalNotification(notification.payload);
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    this.registerNotificationOpened = Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification);

        navigateOnNotificationTap(notification.payload);

        completion();
      },
    );

    this.registerNotificationReceivedBackground = Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);
        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          showLocalNotification(notification.payload);
        }
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  // handle store online and offline
  handleSwitchBtn = (actionType) => {
    let payload;

    // handle change store status
    if (actionType === STORE_ACTION_TYPE.CHANGE_STATUS) {
      const temp = _.cloneDeep(this.props.storeProfile.is_online);

      payload = {
        is_online: !temp,
      };
    }
    // handle change delivery statue
    if (actionType === STORE_ACTION_TYPE.CHANGE_DELIVERY) {
      const temp = _.cloneDeep(this.props.storeProfile.delivery);

      payload = {
        delivery: !temp,
      };
    }
    // handle change pickup statue
    if (actionType === STORE_ACTION_TYPE.CHANGE_PICKUP) {
      const temp = _.cloneDeep(this.props.storeProfile.pickup);

      payload = {
        pickup: !temp,
      };
    }

    this.props.storeStatusChangeRequest(payload);
  };

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    const {
      isSwitchActive,
      delivery,
      pickup,
      isBackHandler,
      isLoading,
    } = this.state;

    return (
      <StoreProfileView
        {...this.props}
        isLoading={isLoading}
        isSwitchActive={isSwitchActive}
        setValue={this.setValue}
        delivery={delivery}
        pickup={pickup}
        handleSwitchBtn={this.handleSwitchBtn}
        BackHandler={() => BackHandler.exitApp()}
        backHandlerModal={this.backHandlerModal}
        isBackHandler={isBackHandler}
      />
    );
  }
}

const mapStateToProps = ({vendorStore, user, driver}) => ({
  storeProfile: vendorStore.storeProfile,
  user: user.data,
  riders: driver.storeDriver,
});

const actions = {
  storeProfileRequest,
  storeStatusChangeRequest,
  storeDriversRequest,
  checkDeviceStateRequest,
};

export default connect(mapStateToProps, actions)(StoreProfileController);
