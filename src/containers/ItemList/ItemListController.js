import React from 'react';
import PropTypes from 'prop-types';
import ItemListView from './ItemListView';
import {connect} from 'react-redux';

class ItemListController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    itemList: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    fromTrending: PropTypes.bool,
    fromAddProduct: PropTypes.bool,
  };
  static defaultProps = {
    fromTrending: false,
    fromAddProduct: false,
  };

  render() {
    return <ItemListView {...this.props} />;
  }
}

const mapStateToProps = ({products}) => ({
  trendingProducts: products.trendingProducts.store,
});

const actions = {};

export default connect(mapStateToProps, actions)(ItemListController);
