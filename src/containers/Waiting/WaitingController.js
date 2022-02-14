import React from 'react';
import _ from 'lodash';
import {BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import WaitingView from './WaitingView';
import {connect} from 'react-redux';

import {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  navigateOnNotificationTap,
  clearBadgeNumber,
} from '../../helpers/firebaseHelper';

import {
  getStoreProfileRequest,
  userSignOutRequest,
} from '../../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import {storeStatusChangeRequest} from '../../actions/VendorStoreAction';
import util from '../../util';
import {Notifications} from 'react-native-notifications';

class WaitingController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshLoader: false,
      logoutLoader: false,
      isNotification: props.fromNotification ? true : false,
    };
  }
  static propTypes = {fromNotification: PropTypes.bool};
  static defaultProps = {fromNotification: false};

  componentDidMount() {
    if (!_.isEmpty(this.props.user.access_token)) {
      this._fcmInit();
    }
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prev', prevState.isNotification);

    console.log('current', this.state.isNotification);
    if (
      prevState.isNotification !== this.state.isNotification &&
      this.state.isNotification
    ) {
      this.handleRefreshProfile();
    }
  }

  componentWillUnmount() {
    if (!_.isEmpty(this.props.user.access_token)) {
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

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  handleLogout = () => {
    this.setState({
      logoutLoader: true,
    });
    const payload = {
      // is_online: false,
    };
    this.props.userSignOutRequest(payload, (status) => {
      this.setState({
        logoutLoader: false,
      });
      if (status) {
        Actions.replace('login');
      }
    });
  };

  // handle refresh
  handleRefreshProfile = () => {
    this.setState({
      refreshLoader: true,
      isNotification: false,
    });
    this.props.getStoreProfileRequest({}, (status) => {
      this.setState({
        refreshLoader: false,
      });

      if (status && this.props.user.is_approved) {
        let payload = {
          delivery: false,
        };
        this.props.storeStatusChangeRequest(payload);
        Actions.reset('drawerMenu');
      }
    });
  };

  render() {
    const {refreshLoader, logoutLoader} = this.state;
    return (
      <WaitingView
        {...this.props}
        logoutLoader={logoutLoader}
        refreshLoader={refreshLoader}
        handleLogout={this.handleLogout}
        handleRefreshProfile={this.handleRefreshProfile}
      />
    );
  }
}

const mapStateToProps = ({user, vendorStore}) => ({
  user: user.data,
  storeProfile: vendorStore.storeProfile,
});

const actions = {
  userSignOutRequest,
  getStoreProfileRequest,
  storeStatusChangeRequest,
};

export default connect(mapStateToProps, actions)(WaitingController);
