import React from 'react';
import PropTypes from 'prop-types';
import WasphaOptionsView from './WasphaOptionsView';
import {connect} from 'react-redux';
import {getTraditionalOrderDetailsSuccess} from '../../actions/OrdersActions';

class WasphaOptionsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <WasphaOptionsView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {getTraditionalOrderDetailsSuccess};

export default connect(mapStateToProps, actions)(WasphaOptionsController);
