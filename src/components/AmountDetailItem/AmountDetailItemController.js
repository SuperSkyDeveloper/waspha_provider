import React from 'react';
import PropTypes from 'prop-types';
import AmountDetailItemView from './AmountDetailItemView';
import {connect} from 'react-redux';

class AmountDetailItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    togglePress: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  render() {
    return <AmountDetailItemView {...this.props} />;
  }
}

const mapStateToProps = ({vendorStore}) => ({
  vendorStoreEarning: vendorStore.vendorStoreEarning,
});

const actions = {};

export default connect(mapStateToProps, actions)(AmountDetailItemController);
