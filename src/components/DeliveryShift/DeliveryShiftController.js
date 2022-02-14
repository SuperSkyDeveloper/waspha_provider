import React from 'react';
import PropTypes from 'prop-types';
import DeliveryShiftView from './DeliveryShiftView';
import {connect} from 'react-redux';

class DeliveryShiftController extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    handleDeleteShift: PropTypes.func,
  };
  static defaultProps = {
    handleDeleteShift: () => {},
  };

  render() {
    return <DeliveryShiftView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(DeliveryShiftController);
