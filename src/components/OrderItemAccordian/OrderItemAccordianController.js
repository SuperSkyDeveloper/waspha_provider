import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrderItemAccordianView from './OrderItemAccordianView';
import {connect} from 'react-redux';
import {PERMISSION, MODAL_TYPE} from '../../constants';
import {createProposalInternalItems} from '../../actions/ProposalActions';
import {helper, constains} from '../../s3Helper';
const reftitle = React.createRef();
const refDes = React.createRef();
const refremarks = React.createRef();

class OrderItemAccordianController extends React.Component {
  constructor() {
    super();
    this.state = {
      isImgUploadVisible: false,
      imgModalFor: '',
      productItemData: {},
      title: '',
      imageData: {},
      remark: '',
      quantity: '',
      price: '',
      tax: '',
      description: '',
      remarkImg: {},
      crossItemModal: false,
    };
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    itemType: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    toggleAccordinPress: PropTypes.func.isRequired,
    onAnyChangeField: PropTypes.func,
    handleRemovePrdItem: PropTypes.func,

    // new
    onChange: PropTypes.func,
    fromOrderPlace: PropTypes.bool,
    isChangeMode: PropTypes.bool,
  };
  static defaultProps = {
    onAnyChangeField: () => {},
    handleRemovePrdItem: () => {},
    onChange: () => {},
    fromOrderPlace: false,
    isChangeMode: false,
  };

  config = {
    createProposalForExistingItems: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.WRITE,
      price: PERMISSION.HIDE,
      quantity: PERMISSION.WRITE,
      quantityRead: PERMISSION.READ,
      requirements: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
      remarks: PERMISSION.WRITE,
      remarksImage: PERMISSION.WRITE,
      promotions: PERMISSION.READ,
    },

    createProposalForNewItems: {
      title: PERMISSION.WRITE,
      removeItem: PERMISSION.WRITE,
      price: PERMISSION.HIDE,
      quantity: PERMISSION.WRITE,
      quantityRead: PERMISSION.READ,
      description: PERMISSION.WRITE,
      descriptionImage: PERMISSION.WRITE,
      remarks: PERMISSION.HIDE,
      remarksImage: PERMISSION.HIDE,
    },

    onlyForRead: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.HIDE,
      price: PERMISSION.HIDE,
      quantityRead: PERMISSION.READ,
      quantity: PERMISSION.READ,
      requirements: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
    },

    forProposal: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.HIDE,
      price: PERMISSION.READ,
      quantity: PERMISSION.READ,
      requirements: PERMISSION.READ,
      quantityRead: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
      remarks: PERMISSION.READ,
      remarksImage: PERMISSION.READ,
    },

    updateProposal: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.WRITE,
      price: PERMISSION.READ,
      quantity: PERMISSION.READ,
      requirements: PERMISSION.READ,
      quantityRead: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
      remarks: PERMISSION.WRITE,
      remarksImage: PERMISSION.WRITE,
    },
    createTraditionalOrder: {
      title: PERMISSION.WRITE,
      removeItem: PERMISSION.WRITE,
      quantity: PERMISSION.WRITE,
      description: PERMISSION.WRITE,
      // quantityRead: PERMISSION.READ,
    },
  };

  isAllowedtoRead(perm) {
    return perm === PERMISSION.READ;
  }

  isAllowedtoWrite(perm) {
    return perm === PERMISSION.WRITE;
  }

  // handle if write true only then show placeholder
  isPlaceholderVisible = (condtion, text) => {
    return condtion ? text : '';
  };

  // handle image upload modal show or hide

  handleImgModal = (modalType) => {
    // modalType check modal for upload img or revision img
    if (
      modalType == MODAL_TYPE.PRDOUCT_IMG ||
      modalType == MODAL_TYPE.PRDOUCT_IMG_REMARKS
    ) {
      this.setState({imgModalFor: modalType});
    }
    let temp = _.cloneDeep(this.state.isImgUploadVisible);
    this.setState({isImgUploadVisible: !temp});
  };

  // handle image upload
  addItemImage = async (itemImage, itemIndex, imgModalFor) => {
    this.handleImgModal();

    let payload = {
      uri: itemImage.path,
      fileType: itemImage.mime,
    };

    let data = await helper.uploadImageOnS3(
      payload,
      constains.folderList.PRODUCTS,
    );

    if (imgModalFor === MODAL_TYPE.PRDOUCT_IMG_REMARKS) {
      // callback function

      const imageData = {
        image: data,
      };

      this.props.onChange('remarksImgData', itemIndex, imageData);
    } else {
      const imageData = {
        image: data,
      };
      this.props.onChange('productImage', itemIndex, imageData);
    }
  };

  handleCrossItem = () => {
    this.setState({
      crossItemModal: !this.state.crossItemModal,
    });
  };

  render() {
    const {isImgUploadVisible, imgModalFor, crossItemModal} = this.state;

    return (
      <OrderItemAccordianView
        crossItemModal={crossItemModal}
        handleCrossItem={this.handleCrossItem}
        imgModalFor={imgModalFor}
        isAllowedtoRead={this.isAllowedtoRead}
        isAllowedtoWrite={this.isAllowedtoWrite}
        config={this.config}
        isPlaceholderVisible={this.isPlaceholderVisible}
        handleImgModal={this.handleImgModal}
        addItemImage={this.addItemImage}
        isImgUploadVisible={isImgUploadVisible}
        reftitle={reftitle}
        refDes={refDes}
        refremarks={refremarks}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  createProposalInternalItems,
};

export default connect(mapStateToProps, actions)(OrderItemAccordianController);
