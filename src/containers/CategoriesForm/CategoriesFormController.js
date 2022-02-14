import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CategoriesFormView from './CategoriesFormView';
import {connect} from 'react-redux';
import {getSubCategory} from '../../helpers/generalHelper';
import categories from '../../reducers/categories';
import {Actions} from 'react-native-router-flux';
import {getProductCategoryRequest} from '../../actions/ProductsActions';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

class CategoriesFormController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategories: [],
      unFilteredCategories: [],
      nestedCategories: [],
      searchText: '',
      isLoading: true,
      categories: [],
      showSearchCategory: false,
    };
  }

  static propTypes = {
    allCategories: PropTypes.array.isRequired,
    categoryNestSelect: PropTypes.func.isRequired,
    stateName: PropTypes.string.isRequired,
    fromArabicForm: PropTypes.bool,
    categoryItem: PropTypes.object,
  };

  static defaultProps = {
    fromArabicForm: false,
    categoryItem: {},
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    // add none in category list


    this.props.getProductCategoryRequest({}, () => {

//////////

const {categoryItem} = this.props;
let tempCategoires = _.cloneDeep(this.props.allCategories);

if (!_.isEmpty(categoryItem) && _.isNil(categoryItem.is_featured)) {
  tempCategoires = tempCategoires.filter((cat) => {
    return categoryItem.id !== cat.id;
  });
}
tempCategoires.unshift(util.NONE_CATEGORY());

///////////

      this.setState({
        categories: tempCategoires,
        isLoading: false,
      });
    });
  };

  // handle selected category
  getCategoriesNest = (selectedCategory) => {
    const {stateName} = this.props;
    this.props.categoryNestSelect({[stateName]: selectedCategory});
    return Actions.pop();
  };

  // search category
  onSearchText = (query) => {
    const {allCategories} = this.props;

    this.setState({
      showSearchCategory: true,
    });
    if (_.isEmpty(query.searchText)) {
      this.setState({categories: allCategories});
    } else {
      const filteredList = allCategories.filter((category) => {
        return renderNameStringAndImageRender(category.name)
          .toLowerCase()
          .includes(query.searchText.toLowerCase());
      });

      this.setState({
        categories: filteredList,
      });
    }
  };

  // check category have sub category
  hasChild = (parentID) => {
    const {categories} = this.state;
    const temp = getSubCategory(categories, parentID);
    return temp && temp.length > 0 ? true : false;
  };

  setValue = (obj) => {
    this.setState(obj);
  };

  // clear search
  handleClearSearch = () => {
    this.setState({
      searchText: '',
      showSearchCategory: false,
      categories: this.props.allCategories,
    });
  };

  render() {
    const {
      showCategories,
      nestedCategories,
      searchText,
      isLoading,
      categories,
      showSearchCategory,
    } = this.state;

    return (
      <CategoriesFormView
        handleClearSearch={this.handleClearSearch}
        isLoading={isLoading}
        showCategories={showCategories}
        nestedCategories={nestedCategories}
        searchText={searchText}
        onSearchText={this.onSearchText}
        getCategoriesNest={this.getCategoriesNest}
        categories={categories}
        getSubCategory={getSubCategory}
        hasChild={this.hasChild}
        setValue={this.setValue}
        showSearchCategory={showSearchCategory}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({products}) => ({
  allCategories: products.allCategories,
});

const actions = {
  getProductCategoryRequest,
};

export default connect(mapStateToProps, actions)(CategoriesFormController);
