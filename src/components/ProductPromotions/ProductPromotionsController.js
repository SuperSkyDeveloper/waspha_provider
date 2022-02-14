import React from 'react';
import PropTypes from 'prop-types';
import ProductPromotionsView from './ProductPromotionsView';
import {connect} from 'react-redux';
import {getProductsRequest} from '../../actions/ProductsActions';
import {strings} from '../../constants';
class ProductPromotionsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    selectOption: PropTypes.func,
    selectedOption: PropTypes.bool,
    discount: PropTypes.number,
    discountError: PropTypes.string,
    giftProduct: PropTypes.obj,
    giftProductError: PropTypes.string,
    storeProducts: PropTypes.array,
    isEdit: PropTypes.bool,
  };
  static defaultProps = {
    discount: 0,
    discountError: '',
    giftProduct: {},
    giftProductError: '',
    storeProducts: [],
    isEdit: false,
  };

  componentDidMount() {
    const {isEdit} = this.props;
    if (!isEdit) {
      this.getStoreProducts();
    }
  }

  getStoreProducts = () => {
    const {getProductsRequest, storeId} = this.props;
    const payload = {
      store_id: storeId,
    };
    getProductsRequest(payload, (response) => {
      if (response) {
      }
    });
  };

  render() {
    return <ProductPromotionsView {...this.props} />;
  }
}

const mapStateToProps = ({vendorStore}) => ({
  storeId: vendorStore.storeProfile.id,
});

const actions = {getProductsRequest};

export default connect(mapStateToProps, actions)(ProductPromotionsController);
