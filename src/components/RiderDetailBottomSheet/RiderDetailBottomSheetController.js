import React from 'react';
import PropTypes from 'prop-types';
import RiderDetailBottomSheetView from './RiderDetailBottomSheetView';
import {connect} from 'react-redux';

class RiderDetailBottomSheetController extends React.Component {
  constructor() {
    super();
    this.state = {
      isChatOption: false,
    };
  }
  static propTypes = {
    fromDetails: PropTypes.bool,
    fromWasphaExpress: PropTypes.bool,
    onCloseSheet: PropTypes.func,
    data: PropTypes.object,
  };
  static defaultProps = {
    fromDetails: false,
    fromWasphaExpress: false,

    onCloseSheet: () => {},
  };

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    const {isChatOption} = this.state;
    return (
      <RiderDetailBottomSheetView
        isChatOption={isChatOption}
        setValue={(data) => this.setValue(data)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  deliveryVehicles: general.appSettings.delivery_vehicles,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(RiderDetailBottomSheetController);
