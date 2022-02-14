import React from 'react';
import PropTypes from 'prop-types';
import RiderListingView from './RiderListingView';
import {connect} from 'react-redux';
import {getRidersList} from '../../helpers/generalHelper';
import {
  assingDriverRequest,
  deleteDriverRequest,
  storeDriversRequest,
} from '../../actions/DriverActions';
import general from '../../reducers/general';
import {Actions} from 'react-native-router-flux';
import {DRIVER_TYPES} from '../../constants';

class RiderListingController extends React.Component {
  constructor() {
    super();
    this.state = {
      isSwitchActive: false,
      ridersList: [],
      isLoading: true,
      isAssignModalShow: false,
      driverId: null,
      assignLoader: false,
      deleteRiderLoader: false,
    };
  }
  static propTypes = {
    isDeliveryGuyForm: PropTypes.bool,
    isDeleteBtnShow: PropTypes.bool,
    isOnline: PropTypes.bool,
    isForAssign: PropTypes.isForAssign,
    isDeletableDriver: PropTypes.bool,
  };
  static defaultProps = {
    isDeliveryGuyForm: false,
    isDeleteBtnShow: false,
    isOnline: false,
    isForAssign: false,
    isDeletableDriver: false,
  };

  handleSwitchBtn = () => {
    this.setState({
      isSwitchActive: !this.state.isSwitchActive,
    });
  };

  componentDidMount() {
    this.initial();
  }

  handleDeleteDriver = (driverId) => {
    // start loader
    this.setState({
      deleteRiderLoader: true,
    });

    const payload = {
      id: driverId,
    };

    this.props.deleteDriverRequest(payload, (status) => {
      // stop loader
      this.setState({
        deleteRiderLoader: false,
      });
      if (status) {
        this.initial();
      }
    });
  };

  initial = () => {
    // start loading

    this.setState({
      isLoading: true,
    });

    const {isOnline} = this.props;

    const payload = {
      type: isOnline ? DRIVER_TYPES.ONLINE : DRIVER_TYPES.OFFLINE,
    };
    this.props.storeDriversRequest(payload, () => {
      this.setState({
        ridersList: this.props.riders,
        isLoading: false,
      });
    });
  };

  // handle assign modal show
  handleAssignModal = (driver_Id) => {
    this.setState({
      isAssignModalShow: !this.state.isAssignModalShow,
      driverId: driver_Id,
    });
  };

  // handle  assign driver
  handleAssignDriver = () => {
    //todo use this approch because didupdate not work and try many approches

    // loading start
    this.setState({
      assignLoader: true,
    });
    const payload = {
      order_id: this.props.orderId,
      driver_id: this.state.driverId,
    };
    this.props.assingDriverRequest(payload, (status) => {
      // stop loading
      this.setState({
        assignLoader: false,
      });
      if (status) {
        // hide modal
        this.setState({
          isAssignModalShow: false,
        });

        // todo use better approch
        Actions.pop({refresh: {isScreenRefresh: true}});
        Actions.pop({refresh: {isScreenRefresh: true}});
        Actions.pop({refresh: {isScreenRefresh: true}});
        // Actions.acceptedOrders({
        //   orderId: this.props.orderId,
        // });

        Actions.latestOrders({
          incomingActiveTabIndex: 0,
        });
      }
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // when vendor complete the offline rider task

    if (prevProps.refreshListing !== this.props.refreshListing) {
      this.initial();
    }
  }

  render() {
    const {
      isSwitchActive,
      ridersList,
      isLoading,
      isAssignModalShow,
      assignLoader,
      deleteRiderLoader,
    } = this.state;
    return (
      <RiderListingView
        handleAssignDriver={this.handleAssignDriver}
        handleDeleteDriver={this.handleDeleteDriver}
        isLoading={isLoading}
        handleSwitchBtn={this.handleSwitchBtn}
        isSwitchActive={isSwitchActive}
        ridersList={ridersList}
        handleAssignModal={this.handleAssignModal}
        isAssignModalShow={isAssignModalShow}
        assignLoader={assignLoader}
        deleteRiderLoader={deleteRiderLoader}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general, driver}) => ({
  riders: driver.storeDriver,
  vehicles: general.appSettings.delivery_vehicles,
});

const actions = {
  storeDriversRequest,
  deleteDriverRequest,
  assingDriverRequest,
};

export default connect(mapStateToProps, actions)(RiderListingController);
