import React from 'react';
import PropTypes from 'prop-types';
import AcceptedOrdersView from './AcceptedOrdersView';
import {connect} from 'react-redux';
import {latestOrderRequest} from '../../actions/OrdersActions';
import {LATEST_ORDER_STATUS} from '../../constants';
import {filterOrder} from '../../services/OrderHelper';

class AcceptedOrdersController extends React.Component {
  constructor() {
    super();
    this.state = {
      enableVehicleIcon: true,
      showDeliveryMode: true,
      enableUserInfoSec: true,
      showCrossIconOfAccordian: false,
      shouldEnableContactOption: true,
      showPriceAndQtyOfItem: true,
      isLoading: true,
      acceptedOrders: [],
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    // alert('Ad');
    this.initial();
  }

  initial = () => {
    // loading start
    this.setState({
      isLoading: true,
    });
    // requesr

    const payload = {
      status: LATEST_ORDER_STATUS.ACCEPTED,
    };
    this.props.latestOrderRequest(payload, (status) => {
      this.setState({
        isLoading: false,
      });
      if (status) {
        this.setState({
          acceptedOrders: filterOrder(this.props.orders, [
            LATEST_ORDER_STATUS.ACCEPTED,
            LATEST_ORDER_STATUS.PREPARED,
          ]),
        });
      }
    });
  };

  componentWillUnmount() {
    this.setState({acceptedOrders: []});
  }

  onRefresh = () => {
    this.initial();
  };

  // refresh screen when  isScreenRefresh receive
  componentDidUpdate(prevProps) {
    if (prevProps.refreshAcceptedList !== this.props.refreshAcceptedList) {
      this.initial();
    }
  }

  render() {
    const {
      enableVehicleIcon,
      showDeliveryMode,
      showCrossIconOfAccordian,
      enableUserInfoSec,
      shouldEnableContactOption,
      showPriceAndQtyOfItem,
      acceptedOrders,
      isLoading,
    } = this.state;

    return (
      <AcceptedOrdersView
        acceptedOrders={acceptedOrders}
        enableVehicleIcon={enableVehicleIcon}
        showDeliveryMode={showDeliveryMode}
        showCrossIconOfAccordian={showCrossIconOfAccordian}
        enableUserInfoSec={enableUserInfoSec}
        shouldEnableContactOption={shouldEnableContactOption}
        showPriceAndQtyOfItem={showPriceAndQtyOfItem}
        isLoading={isLoading}
        onRefresh={this.onRefresh}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({proposal}) => ({
  orders: proposal.allProposal,
});

const actions = {
  latestOrderRequest,
};

export default connect(mapStateToProps, actions)(AcceptedOrdersController);
