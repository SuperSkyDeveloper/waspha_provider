import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SearchProductAndCategoryView from './SearchProductAndCategoryView';
import {connect} from 'react-redux';
import {Images} from '../../theme';
import {
  getSubCategories,
  getFilteredProducts,
} from '../../helpers/generalHelper';
import {searchProductRequest} from '../../actions/ProductsActions';
import {Keyboard} from 'react-native';

class SearchProductAndCategoryController extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      searchText: '',
      searchLoader: false,
    };
  }

  static propTypes = {
    isForSearch: PropTypes.bool,
  };
  static defaultProps = {isForSearch: false};

  componentDidMount() {
    // this.setState({
    //   productLoader: false,
    //   products: [],
    //   categories: [],
    // });
  }

  // search product
  onSearchText = () => {
    // const {searchText} = this.state.;

    // if (this.state.searchText.length < 3) {
    //   this.setState({
    //     products: [],
    //     categories: [],
    //   });
    //   return true;
    // }

    if (_.isEmpty(this.state.searchText)) {
      this.setState({
        products: [],
        categories: [],
      });
      return true;
    }

    // start loading
    // this.setState({
    //   searchLoader: true,
    // });
    const payload = {
      search_text: this.state.searchText,
    };
    this.props.searchProductRequest(payload, (status) => {
      // stop loading
      this.setState({
        // searchLoader: false,
        products: [],
        categories: [],
        isClearSearchBtn: true,
      });

      if (status) {
        this.setState({
          searchLoader: false,
          products: this.props.searchResult.products,
          categories: this.props.searchResult.categories,
        });
      }
    });
  };

  handleClearSearch = () => {
    this.setState({searchText: '', isClearSearchBtn: false});
  };

  // set value in state
  setValue = (obj) => {
    this.setState(obj, this.onSearchText);
  };

  render() {
    const {
      categories,
      products,
      searchLoader,
      searchText,
      isClearSearchBtn,
    } = this.state;
    return (
      <SearchProductAndCategoryView
        isClearSearchBtn={isClearSearchBtn}
        handleClearSearch={this.handleClearSearch}
        onSearchText={this.onSearchText}
        setValue={this.setValue}
        searchText={searchText}
        searchLoader={searchLoader}
        categories={categories}
        products={products}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({products}) => ({
  searchResult: products.searchProducts,
});

const actions = {
  searchProductRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(SearchProductAndCategoryController);
