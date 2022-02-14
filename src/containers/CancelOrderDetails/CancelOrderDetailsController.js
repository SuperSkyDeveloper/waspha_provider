import React from 'react';
import PropTypes from 'prop-types';
import CancelOrderDetailsView from './CancelOrderDetailsView';
import {connect} from 'react-redux';

class CancelOrderDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  render() {
    return <CancelOrderDetailsView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CancelOrderDetailsController);
