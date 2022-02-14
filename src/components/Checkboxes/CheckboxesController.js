import React from 'react';
import PropTypes from 'prop-types';
import CheckboxesView from './CheckboxesView';
import {connect} from 'react-redux';
import _ from 'lodash';

class CheckboxesController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    subCategories: PropTypes.array,
    handleSelectSubCategory: PropTypes.func.isRequired,
    selectedSubCategory: PropTypes.array.isRequired,
    categoryListIndex: PropTypes.number.isRequired,
  };
  static defaultProps = {
    subCategories: [],
  };

  render() {
    return <CheckboxesView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CheckboxesController);
