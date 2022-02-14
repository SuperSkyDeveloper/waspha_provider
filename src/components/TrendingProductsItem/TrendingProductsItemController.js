import React from 'react';
import PropTypes from 'prop-types';
import TrendingProductsItemView from './TrendingProductsItemView';
import {connect} from 'react-redux';

class TrendingProductsItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    horizontal: PropTypes.bool,
    storeDetail: PropTypes.object.isRequired,
  };

  static defaultProps = {
    horizontal: false,
  };

  render() {
    return <TrendingProductsItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(TrendingProductsItemController);
