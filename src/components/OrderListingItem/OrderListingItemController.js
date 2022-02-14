import React from 'react';
import PropTypes from 'prop-types';
import OrderListingItemView from './OrderListingItemView';
import {connect} from 'react-redux';
import {LATEST_ORDER_STATUS} from '../../constants';

class OrderListingItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    enableUserInfoSec: PropTypes.bool,
    enableVehicleIcon: PropTypes.bool,
    showDeliveryMode: PropTypes.bool,
    showCrossIconOfAccordian: PropTypes.bool,
    shouldEnableContactOption: PropTypes.bool,
    showPriceAndQtyOfItem: PropTypes.bool,

    // check is come from latest order screen
    fromLatestOrder: PropTypes.bool,
    isUserChat: PropTypes.bool,
  };
  static defaultProps = {
    item: {},
    enableVehicleIcon: false,
    showDeliveryMode: false,
    showCrossIconOfAccordian: true,
    enableUserInfoSec: false,
    shouldEnableContactOption: false,
    showPriceAndQtyOfItem: false,
    fromLatestOrder: false,
    isUserChat: false,
  };

  render() {
    const {
      item,
      enableUserInfoSec,
      showDeliveryMode,
      shouldEnableContactOption,
      showCrossIconOfAccordian,
      showPriceAndQtyOfItem,
      enableVehicleIcon,
    } = this.props;
    return (
      <OrderListingItemView
        enableUserInfoSec={enableUserInfoSec}
        showDeliveryMode={showDeliveryMode}
        shouldEnableContactOption={shouldEnableContactOption}
        showCrossIconOfAccordian={showCrossIconOfAccordian}
        showPriceAndQtyOfItem={showPriceAndQtyOfItem}
        enableVehicleIcon={enableVehicleIcon}
        showPriceAndQtyOfItem={showPriceAndQtyOfItem}
        listItem={item}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  deliveryVehicles: general.appSettings.delivery_vehicles,
  wasphaIconImage: general.appSettings.delivery_modes[2].image.color,
});

const actions = {};

export default connect(mapStateToProps, actions)(OrderListingItemController);
