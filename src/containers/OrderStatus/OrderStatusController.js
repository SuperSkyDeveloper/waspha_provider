import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrderStatusView from './OrderStatusView';
import {connect} from 'react-redux';
import {
  getDriverCords,
  getUpdatedRiderTimeAndKM,
} from '../../actions/DriverActions';
import SocketHelper from '../../helpers/SocketHelper';

let intervalForDriverLocation;

class OrderStatusController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverCordsAfterInterval: props.driverCords,
      driverTimeAndKMAfterInterval: _.isEmpty(props.driverTimeAndKm)
        ? props.data.driver.task_eta
        : props.driverTimeAndKm,
    };
  }
  static propTypes = {
    data: PropTypes.obj,
    user: PropTypes.object,
    driverCords: PropTypes.object,
    driverTimeAndKm: PropTypes.object,
  };
  static defaultProps = {
    data: {},
    user: {},
    driverCords: {},
    driverTimeAndKm: {},
  };

  componentDidMount() {
    this.initSocket();
    this.timeToRenderDriverLocation();
  }

  componentWillUnmount() {
    clearInterval(intervalForDriverLocation);
  }

  timeToRenderDriverLocation = () => {
    intervalForDriverLocation = setInterval(() => {
      console.log({
        driverCordsAfterInterval: this.state.driverCordsAfterInterval,
      });
      console.log({
        driverTimeAndKMAfterInterval: this.state.driverTimeAndKMAfterInterval,
      });
      console.log({driverCords: this.props.driverTimeAndKm});

      this.setState({
        driverCordsAfterInterval: this.props.driverCords,
        driverTimeAndKMAfterInterval: this.props.driverTimeAndKm,
      });
    }, 3000);
  };

  initSocket = () => {
    const {getDriverCords, getUpdatedRiderTimeAndKM, store, data} = this.props;
    getUpdatedRiderTimeAndKM(data.driver.task_eta);
    console.log({store});
    SocketHelper.disconnect();
    SocketHelper.connect(() => {
      console.log('vendor is connected.');
      SocketHelper.emit('business', {userID: store.id});
      // connect callback

      // event listners
      SocketHelper.onDisconnect();
      SocketHelper.stillConnected();

      SocketHelper.onTrackingInfo(getDriverCords); // Continous driver tracking
      SocketHelper.onTaskEtaUpdate(getUpdatedRiderTimeAndKM); // checks for change in rider time and km from store
    });
  };

  render() {
    const {driverCordsAfterInterval, driverTimeAndKMAfterInterval} = this.state;
    return (
      <OrderStatusView
        {...this.props}
        driverCordsAfterInterval={driverCordsAfterInterval}
        driverTimeAndKMAfterInterval={driverTimeAndKMAfterInterval}
      />
    );
  }
}

const mapStateToProps = ({general, driver, user, vendorStore}) => ({
  user: user.data,
  store: vendorStore.storeProfile,
  deliveryVehicles: general.appSettings.delivery_vehicles,
  driverCords: driver.driverCords,
  driverTimeAndKm: driver.driverTimeAndKm,
});

const actions = {getDriverCords, getUpdatedRiderTimeAndKM};

export default connect(mapStateToProps, actions)(OrderStatusController);
