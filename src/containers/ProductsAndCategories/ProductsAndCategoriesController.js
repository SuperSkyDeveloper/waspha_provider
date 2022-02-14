import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ProductsAndCategoriesView from './ProductsAndCategoriesView';
import {connect} from 'react-redux';
import {Images} from '../../theme';
import {
  getSubCategories,
  getFilteredProducts,
} from '../../helpers/generalHelper';
import {
  getProductsRequest,
  storeCatalogRequest,
} from '../../actions/ProductsActions';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';
class ProductsAndCategoriesController extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      showNest: '',
      productLoader: true,
    };
  }

  static propTypes = {
    item: PropTypes.object,
    nest: PropTypes.string,
  };
  static defaultProps = {item: {}, nest: ''};

  componentDidMount() {
    this.initial();
  }

  // initial
  initial = () => {
    this.setState({
      productLoader: true,
    });

    const payload = {
      category_id: this.props.item.id,
    };
    this.props.storeCatalogRequest(payload, (status) => {
      this.setState({
        productLoader: false,
      });
      if (status) {
        this.getCategories();
      }
    });
  };

  getCategories = () => {
    // item is a category
    const {item, allCategories, nest} = this.props;

    this.setState({
      categories: getSubCategories(allCategories, item.id),
    });

    if (_.isEmpty(nest)) {
      this.setState({
        showNest: renderNameStringAndImageRender(item.name),
      });
    } else {
      this.setState({
        showNest: `${nest} > ${renderNameStringAndImageRender(item.name)}`,
      });
    }

    this.getProducts(item.id);
  };

  getProducts(catId) {
    this.setState({
      products: getFilteredProducts(this.props.allProducts, catId),
    });

    return true;

    // todo remove this after testing
    const {allCategories, allProducts} = this.props;

    const subCategories = getSubCategories(this.props.allCategories, catId);
    let filterProducts = getFilteredProducts(this.props.allProducts, catId);

    this.setState({
      // products: [...filterProducts, ...this.state.products],
      products: _.unionBy(filterProducts, this.state.products, 'id'),
      // products: _.xorBy([filterProducts, this.state.products], 'id'),
    });

    // get current state, and merge new products in state

    if (subCategories.length) {
      subCategories.map((category) => {
        this.getProducts(category.id);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // initialize the initial call after add and edit product and category
    if (prevProps.isScreenRefresh !== this.props.isScreenRefresh) {
      this.initial();
    }

    // update category after delete
    if (prevProps.allProducts !== this.props.allProducts) {
      this.getProducts(this.props.item.id);
    }
    // update product after delete
    if (prevProps.allCategories !== this.props.allCategories) {
      this.getCategories();
    }
  }

  render() {
    const {categories, products, showNest, productLoader} = this.state;
    return (
      <ProductsAndCategoriesView
        categories={categories}
        products={products}
        showNest={showNest}
        productLoader={productLoader}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({products}) => ({
  allCategories: products.allCategories,
  allProducts: products.products,
});

const actions = {
  getProductsRequest,
  storeCatalogRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(ProductsAndCategoriesController);
