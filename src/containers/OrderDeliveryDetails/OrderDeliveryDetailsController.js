import React from 'react';
import PropTypes from 'prop-types';
import OrderDeliveryDetailsView from './OrderDeliveryDetailsView';
import {connect} from 'react-redux';

class OrderDeliveryDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  render() {
    return <OrderDeliveryDetailsView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(OrderDeliveryDetailsController);
