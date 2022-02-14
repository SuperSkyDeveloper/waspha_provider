import React from 'react';
import PropTypes from 'prop-types';
import VendorCategoryItemView from './VendorCategoryItemView';
import {connect} from 'react-redux';

class VendorCategoryItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    active: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onCategoryItemPress: PropTypes.func.isRequired,
    categoryListIndex: PropTypes.number.isRequired,
  };
  static defaultProps = {
    categoryListIndex: null,
  };

  render() {
    return <VendorCategoryItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(VendorCategoryItemController);
