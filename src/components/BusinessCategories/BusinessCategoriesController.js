import React from 'react';
import PropTypes from 'prop-types';
import BusinessCategoriesView from './BusinessCategoriesView';
import {connect} from 'react-redux';

class BusinessCategoriesController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    mainCategories: PropTypes.array.isRequired,
    selectedCategoryId: PropTypes.number,
    selectedCategoryError: PropTypes.string,
    subcategoryCategories: PropTypes.array,
    handleSelectSubCategory: PropTypes.func.isRequired,
    onCategoryItemPress: PropTypes.func.isRequired,
    selectedSubCategoryError: PropTypes.string,
    selectedSubCategory: PropTypes.number.isRequired,
    categoryListIndex: PropTypes.number.isRequired,
  };
  static defaultProps = {
    selectedCategoryId: null,
    selectedCategoryError: '',
    selectedSubCategoryError: '',
    subcategoryCategories: [],
  };

  render() {
    return <BusinessCategoriesView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(BusinessCategoriesController);
