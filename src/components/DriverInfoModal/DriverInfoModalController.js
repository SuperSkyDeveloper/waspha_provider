import React from 'react';
import PropTypes from 'prop-types';
import DriverInfoModalView from './DriverInfoModalView';
import {connect} from 'react-redux';

class DriverInfoModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    handleAssignDriver: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fromWasphaExpress: PropTypes.bool,
  };
  static defaultProps = {
    fromWasphaExpress: false,
  };

  render() {
    return <DriverInfoModalView {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  deliveryVehicles: general.appSettings.delivery_vehicles,
});

const actions = {};

export default connect(mapStateToProps, actions)(DriverInfoModalController);
