import React from 'react';
import PropTypes from 'prop-types';
import StoreMenuView from './StoreMenuView';
import {connect} from 'react-redux';
import {
  getTrendingProducts,
  getRootCategories,
} from '../../helpers/generalHelper';
import {
  getProductCategoryRequest,
  getTrendingProductRequest,
  searchProductRequest,
  storeCatalogRequest,
} from '../../actions/ProductsActions';
import {Actions} from 'react-native-router-flux';
import {Keyboard} from 'react-native';
class StoreMenuController extends React.Component {
  constructor() {
    super();
    this.state = {
      trendingProductsList: [],
      rootCategoriesList: [],
      trendingPrdLoading: true,
      mainCategoryLoading: true,
      storeDetail: {},
    };
  }
  static propTypes = {categories: PropTypes.array};
  static defaultProps = {categories: []};

  componentDidMount() {
    this.initial();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.isScreenRefresh !== this.props.isScreenRefresh) {
      this.initial();
    }
  };

  initial = () => {
    // get trending product
    this.handleTrendingProduct();

    // get main category
    this.handleMainCategory();
  };

  // get trending product
  handleTrendingProduct = () => {
    this.props.getTrendingProductRequest({}, () => {
      this.setState({
        trendingProductsList: this.props.trendingProducts.products,
        storeDetail: this.props.trendingProducts.store,
        trendingPrdLoading: false,
      });
    });
  };

  // get main category
  handleMainCategory = () => {
    const payload = {
      category_id: 0,
    };
    this.props.storeCatalogRequest(payload, () => {
      this.setState({
        rootCategoriesList: getRootCategories(this.props.categories),
        mainCategoryLoading: false,
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // update category after delete
    if (prevProps.categories !== this.props.categories) {
      this.setState({
        rootCategoriesList: getRootCategories(this.props.categories),
      });
    }
  }

  render() {
    const {
      trendingProductsList,
      trendingPrdLoading,
      rootCategoriesList,
      mainCategoryLoading,
      storeDetail,
    } = this.state;
    return (
      <StoreMenuView
        storeDetail={storeDetail}
        trendingPrdLoading={trendingPrdLoading}
        mainCategoryLoading={mainCategoryLoading}
        rootCategoriesList={rootCategoriesList}
        trendingProductsList={trendingProductsList}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({products, categories, vendorStore}) => ({
  products: products.products,
  categories: products.allCategories,
  trendingProducts: products.trendingProducts,
  searchResult: products.searchProducts,
  storeProfile: vendorStore.storeProfile,
});

const actions = {
  getTrendingProductRequest,
  getProductCategoryRequest,
  storeCatalogRequest,
};

export default connect(mapStateToProps, actions)(StoreMenuController);
