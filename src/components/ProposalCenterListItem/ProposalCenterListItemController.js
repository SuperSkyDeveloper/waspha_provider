import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ProposalCenterListItemView from './ProposalCenterListItemView';
import {connect} from 'react-redux';

class ProposalCenterListItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDuration: 0,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  componentDidMount() {
    this.handleExpiryTime();
  }
  // Coundown timer for a given expiry date-time
  handleExpiryTime = () => {
    // You can set your own date-time
    // let expirydate = this.props.item.order_date;

    let totalTime = moment(this.props.item.order_date).add(
      this.props.item.proposal_selection_time,
      'minutes',
    );

    let expirydate = totalTime;

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

  render() {
    return (
      <ProposalCenterListItemView
        totalDuration={this.state.totalDuration}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(ProposalCenterListItemController);
