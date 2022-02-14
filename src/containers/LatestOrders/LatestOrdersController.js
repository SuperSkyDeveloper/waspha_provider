import React from 'react';
import PropTypes from 'prop-types';
import LatestOrdersView from './LatestOrdersView';
import {connect} from 'react-redux';
import {filterAssignProposal, filterOrder} from '../../services/OrderHelper';
import {LATEST_ORDER_STATUS} from '../../constants';
import {latestOrderRequest} from '../../actions/OrdersActions';

class LatestOrdersController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: props.incomingActiveTabIndex,
      assignedOrders: [],
      completedOrders: [],
      cancelledOrders: [],
      enableVehicleIcon: true,
      showDeliveryMode: true,
      enableUserInfoSec: true,
      showCrossIconOfAccordian: false,
      shouldEnableContactOption: true,
      showPriceAndQtyOfItem: true,
      isLoading: true,
    };
  }

  static propTypes = {
    incomingActiveTabIndex: PropTypes.number,
  };
  static defaultProps = {
    incomingActiveTabIndex: 0,
  };

  componentDidMount() {
    this.initialRequest();
  }

  initialRequest = () => {
    const {activeTabIndex} = this.state;

    // start loading
    this.setState({
      isLoading: true,
    });

    // assigned order req
    if (activeTabIndex === 0) {
      const payload = {status: LATEST_ORDER_STATUS.ASSIGNED};
      this.props.latestOrderRequest(payload, () => {
        this.setState({
          isLoading: false,
          assignedOrders: filterAssignProposal(this.props.orders),
        });
      });
    }

    // complete order req
    if (activeTabIndex === 1) {
      this.props.latestOrderRequest(
        {status: LATEST_ORDER_STATUS.COMPLETED},
        () => {
          this.setState({
            isLoading: false,
            completedOrders: filterOrder(
              this.props.orders,
              LATEST_ORDER_STATUS.COMPLETED,
            ),
          });
        },
      );
    }

    // cancelled order req
    if (activeTabIndex === 2) {
      this.props.latestOrderRequest(
        {status: LATEST_ORDER_STATUS.CANCELLED},
        () => {
          this.setState({
            isLoading: false,
            cancelledOrders: filterOrder(this.props.orders, [
              LATEST_ORDER_STATUS.CANCELLED,
              LATEST_ORDER_STATUS.REJECTED,
              LATEST_ORDER_STATUS.EXPIRED,
            ]),
          });
        },
      );
    }
  };

  // hanlde selected tabs
  handleTabIndex = (index) => {
    this.setState(
      {
        activeTabIndex: index,
      },
      () => {
        this.initialRequest();
      },
    );
  };

  shouldEnableContactOption = () => {
    if (this.state.activeTabIndex == 0) {
      return true;
    }
    return false;
  };

  showDeliveryModeOptions = () => {
    if (this.state.activeTabIndex == 0) {
      return true;
    }
    return false;
  };

  static propTypes = {};
  static defaultProps = {};

  // on to refresh
  onRefresh = (index) => {
    this.setState(
      {
        activeTabIndex: index,
      },
      () => {
        this.initialRequest();
      },
    );
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // when vendor complete the offline rider task
    if (prevProps.refreshListing !== this.props.refreshListing) {
      this.initialRequest();
    }
  }
  render() {
    const {
      activeTabIndex,
      assignedOrders,
      completedOrders,
      cancelledOrders,
      enableVehicleIcon,
      showCrossIconOfAccordian,
      enableUserInfoSec,
      showPriceAndQtyOfItem,
      isLoading,
    } = this.state;
    return (
      <LatestOrdersView
        {...this.props}
        activeTabIndex={activeTabIndex}
        handleTabIndex={this.handleTabIndex}
        assignedOrders={assignedOrders}
        completedOrders={completedOrders}
        cancelledOrders={cancelledOrders}
        enableVehicleIcon={enableVehicleIcon}
        showDeliveryMode={this.showDeliveryModeOptions()}
        showCrossIconOfAccordian={showCrossIconOfAccordian}
        enableUserInfoSec={enableUserInfoSec}
        shouldEnableContactOption={this.shouldEnableContactOption()}
        showPriceAndQtyOfItem={showPriceAndQtyOfItem}
        isLoading={isLoading}
        onRefresh={this.onRefresh}
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

export default connect(mapStateToProps, actions)(LatestOrdersController);
