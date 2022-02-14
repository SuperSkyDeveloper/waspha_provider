import React from 'react';
import PropTypes from 'prop-types';
import WasphaOrderListingItemView from './WasphaOrderListingItemView';
import {connect} from 'react-redux';

class WasphaOrderListingItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
  };
  static defaultProps = {
    item: {},
  };

  render() {
    return <WasphaOrderListingItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(WasphaOrderListingItemController);
