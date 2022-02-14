import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CategoriesListView from './CategoriesListView';
import {connect} from 'react-redux';
import {deleteCateogryRequest} from '../../actions/ProductsActions';

class CategoriesListController extends React.Component {
  constructor() {
    super();
    this.state = {
      isDeleteModalShow: false,
      categoryId: null,
      deleteLoader: false,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    nest: PropTypes.string,
    deleteable: PropTypes.bool,
    editable: PropTypes.bool,
    isFullWidth: PropTypes.bool,
  };
  static defaultProps = {
    nest: '',
    deleteable: false,
    editable: false,
    isFullWidth: false,
  };

  componentDidMount() {}

  // handle delete confirmation modal
  handleConfirmationModal = (catId) => {
    this.setState({
      isDeleteModalShow: !this.state.isDeleteModalShow,
      categoryId: catId,
    });
  };

  // handle category delete Press
  handleDeletePress = () => {
    const payload = {
      id: this.state.categoryId,
    };

    // start loading
    this.setState({
      deleteLoader: true,
    });
    this.props.deleteCateogryRequest(payload, (status) => {
      // start loader
      this.setState({
        deleteLoader: false,
      });

      if (status) {
        // close delete confirmation loader
        this.setState({
          isDeleteModalShow: false,
        });
      }
    });
  };

  render() {
    const {isDeleteModalShow, deleteLoader} = this.state;
    return (
      <CategoriesListView
        {...this.props}
        isDeleteModalShow={isDeleteModalShow}
        handleConfirmationModal={this.handleConfirmationModal}
        handleDeletePress={this.handleDeletePress}
        deleteLoader={deleteLoader}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  deleteCateogryRequest,
};

export default connect(mapStateToProps, actions)(CategoriesListController);
