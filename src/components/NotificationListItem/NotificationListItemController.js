import React from 'react';
import PropTypes, {func} from 'prop-types';
import NotificationListItemView from './NotificationListItemView';
import {connect} from 'react-redux';
import {
  markAsReadRequest,
  vendorNotificationsRequest,
} from '../../actions/VendorStoreAction';
import {navigateOnNotificationTap} from '../../helpers/firebaseHelper';

class NotificationListItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    handleModalVisible: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  handleNotification = () => {
    // handle mark read
    this.handleMarkAsRead();
    // handle navigations
    navigateOnNotificationTap(this.props.item);
  };

  handleMarkAsRead = () => {
    const payload = {
      id: this.props.item.id,
      type: 'notifications',
    };
    this.props.markAsReadRequest(payload);
    this.props.vendorNotificationsRequest({}, () => {});
  };

  render() {
    return (
      <NotificationListItemView
        {...this.props}
        handleNotification={this.handleNotification}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  markAsReadRequest,
  vendorNotificationsRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(NotificationListItemController);
