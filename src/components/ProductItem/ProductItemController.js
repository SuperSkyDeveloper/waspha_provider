import React from 'react';
import PropTypes from 'prop-types';
import ProductItemView from './ProductItemView';
import {connect} from 'react-redux';
import {deleteProductRequest} from '../../actions/ProductsActions';

class ProductItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      isDeleteModalShow: false,
      productId: null,
      deletePrdLoader: false,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    isEdit: PropTypes.bool,
    deleteable: PropTypes.bool,
    editable: PropTypes.bool,
    fromAddProduct: PropTypes.bool,
    selectProduct: PropTypes.func,
  };
  static defaultProps = {
    isEdit: false,
    deleteable: false,
    editable: false,
    handleDeleteProduct: () => {},
    fromAddProduct: false,
    selectProduct: () => {},
  };

  // handle delete confirmation modal
  handleConfirmationModal = (prdId) => {
    this.setState({
      isDeleteModalShow: !this.state.isDeleteModalShow,
      productId: prdId,
    });
  };

  // handle delete Press
  handleDeletePress = () => {
    //  start loading
    this.setState({
      deletePrdLoader: true,
    });

    const payload = {
      id: this.state.productId,
    };
    this.props.deleteProductRequest(payload, (status) => {
      //  start loading
      this.setState({
        deletePrdLoader: false,
      });

      if (status) {
        // hide modal
        this.setState({
          isDeleteModalShow: false,
        });
      }
    });
  };

  render() {
    const {isDeleteModalShow, deletePrdLoader} = this.state;
    return (
      <ProductItemView
        {...this.props}
        handleDeletePress={this.handleDeletePress}
        isDeleteModalShow={isDeleteModalShow}
        deletePrdLoader={deletePrdLoader}
        handleConfirmationModal={this.handleConfirmationModal}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {deleteProductRequest};

export default connect(mapStateToProps, actions)(ProductItemController);
