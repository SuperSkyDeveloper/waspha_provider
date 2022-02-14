import React from 'react';
import PropTypes from 'prop-types';
import VendorHeaderView from './VendorHeaderView';
import {connect} from 'react-redux';

class VendorHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isWriteReviewVisible: PropTypes.bool,
    isAmountVisible: PropTypes.bool,
    isTodayEarningVisible: PropTypes.bool,
    isSwitchVisible: PropTypes.bool,
    isSwitchActive: PropTypes.bool,
    handleSwitchBtn: PropTypes.func,
    isNotificationVisible: PropTypes.bool,
    showBackBtn: PropTypes.bool,
    data: PropTypes.object.isRequired,
  };
  static defaultProps = {
    isWriteReviewVisible: false,
    isAmountVisible: false,
    isTodayEarningVisible: false,
    isSwitchVisible: false,
    isSwitchActive: false,
    isNotificationVisible: false,
    showBackBtn: false,
    handleSwitchBtn: () => {},
  };

  render() {
    return <VendorHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(VendorHeaderController);
