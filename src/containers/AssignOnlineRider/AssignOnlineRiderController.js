import React from 'react';
import PropTypes from 'prop-types';
import AssignOnlineRiderView from './AssignOnlineRiderView';
import {connect} from 'react-redux';
import {
  assingDriverRequest,
  storeDriversRequest,
} from '../../actions/DriverActions';
import {Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {DRIVER_TYPES} from '../../constants';

class AssignOnlineRiderController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      onlineRiderList: [],
      assignOnlineLoader: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const payload = {
      type: DRIVER_TYPES.ONLINE,
      is_available: true,
    };
    this.props.storeDriversRequest(payload, () => {
      this.setState({
        onlineRiderList: this.props.riders,
        isLoading: false,
      });
    });
  };

  // handle online assign driver
  handleAssignDriver = (driverId) => {
    // loading start
    this.setState({
      assignOnlineLoader: true,
    });

    const payload = {
      order_id: this.props.orderId,
      driver_id: driverId,
    };
    this.props.assingDriverRequest(payload, (status) => {
      // stop loading
      this.setState({
        assignOnlineLoader: false,
      });
      if (status) {
        // send date because did update alwaye need new a props

        // todo recheck this approch, {refresh:{}} not found in accept order screen props
        Actions.pop();
        Actions.pop();
        Actions.pop();
        Actions.latestOrders({
          incomingActiveTabIndex: 0,
        });      }
    });
  };

  render() {
    const {isLoading, onlineRiderList, assignOnlineLoader} = this.state;
    return (
      <AssignOnlineRiderView
        {...this.props}
        isLoading={isLoading}
        onlineRiderList={onlineRiderList}
        handleAssignDriver={this.handleAssignDriver}
        assignOnlineLoader={assignOnlineLoader}
      />
    );
  }
}

const mapStateToProps = ({driver, vendorStore, general}) => ({
  riders: driver.storeDriver,
  storeProfile: vendorStore.storeProfile,
});

const actions = {
  storeDriversRequest,
  assingDriverRequest,
};

export default connect(mapStateToProps, actions)(AssignOnlineRiderController);
