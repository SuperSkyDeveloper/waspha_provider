import React from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrderRequestItemView from './OrderRequestItemView';
import util from '../../util';
import {strings} from '../../constants';
import {alertMessage} from '../../actions/GeneralActions';
class OrderRequestItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDuration: 0,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handleNavigate = () => {
    Actions.orderDetails({
      id: this.props.item.id,
      // item: item,
      isOrderRequest: true,
      showOrderCode: true,
    });
  };

  componentDidMount() {
    this.handleExpiryTime();
  }

  // Coundown timer for a given expiry date-time
  handleExpiryTime = () => {
    // You can set your own date-time
    let expirydate = this.props.item.expiry_time;

    let diffr = moment.duration(moment(expirydate).diff(moment()));
    // Difference of the expiry date-time
    let hours = parseInt(diffr.asHours());
    let minutes = parseInt(diffr.minutes());
    let seconds = parseInt(diffr.seconds());

    // Converting in seconds
    let totalSecond = hours * 60 * 60 + minutes * 60 + seconds;

    // Settign up the duration of countdown

    this.setState({
      totalDuration: totalSecond,
    });
  };

  // handle rfp request expire or not
  handlePress = () => {
    const {alertMessage} = this.props;
    if (!_.isEmpty(this.props.item.expiry_time)) {
      if (moment().isBefore(moment(this.props.item.expiry_time))) {
        this.handleNavigate();
      } else {
        this.props.onPress();
        // util.topAlert(strings.REQUEST_TIME_OUT);
        alertMessage(strings.REQUEST_TIME_OUT);
      }
    } else {
      this.handleNavigate();
    }
  };

  static defaultProps = {};

  render() {
    const {totalDuration} = this.state;
    return (
      <OrderRequestItemView
        {...this.props}
        handlePress={this.handlePress}
        totalDuration={totalDuration}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {alertMessage};

export default connect(mapStateToProps, actions)(OrderRequestItemController);
