import React from 'react';
import PropTypes from 'prop-types';
import DashboardHeaderView from './DashboardHeaderView';
import {connect} from 'react-redux';

class DashboardHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isEarning: PropTypes.bool,
    isNotification: PropTypes.bool,
    isNotificationScreen: PropTypes.bool,
    accountApproved: PropTypes.bool,
  };
  static defaultProps = {
    isEarningScreen: false,
    isNotificationScreen: false,
    accountApproved: false,
  };

  render() {
    return <DashboardHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(DashboardHeaderController);
