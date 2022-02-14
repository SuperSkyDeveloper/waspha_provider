import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AccordianItemView from './AccordianItemView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';

class AccordianItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      itemImage: '',
      imageBase64: '',
      uploadImagePicker: false,
    };
  }
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number.isRequired,
    active: PropTypes.bool,
    togglePress: PropTypes.func,
    btnOneFunc: PropTypes.func,
    editAble: PropTypes.bool,
    editAbleFromVendor: PropTypes.bool,
    showPriceAndQtyOfItem: PropTypes.bool,
    onChangeField: PropTypes.func,
    modalType: PropTypes.string,
    isAccordionItemRemoveable: PropTypes.bool,
    writeRemarks: PropTypes.bool,
  };
  static defaultProps = {
    item: {},
    active: false,
    togglePress: () => {},
    btnOneFunc: () => {},
    onChangeField: () => {},
    editAble: false,
    editAbleFromVendor: false,
    showPriceAndQtyOfItem: false,
    isAccordionItemRemoveable: false,
    modalType: '',
  };

  closeImagePickerModal = () => {
    this.setState({uploadImagePicker: false});
  };

  openImagePickerModal = () => {
    this.setState({uploadImagePicker: true});
  };

  addItemImage = (itemImage, imageBase64, itemIndex, type) => {
    this.setState({itemImage, imageBase64});
    this.closeImagePickerModal();

    if (type === 'remarks') {
      // callback function
      this.props.onChangeField('remarksImg', imageBase64, itemIndex);
    } else {
      // callback function
      this.props.onChangeField('image', imageBase64, itemIndex);
    }
  };

  render() {
    const {uploadImagePicker, imageBase64, itemImage} = this.state;
    const {showPriceAndQtyOfItem} = this.props;
    return (
      <AccordianItemView
        uploadImagePicker={uploadImagePicker}
        itemImage={itemImage}
        imageBase64={imageBase64}
        closeImagePickerModal={this.closeImagePickerModal}
        openImagePickerModal={this.openImagePickerModal}
        addItemImage={this.addItemImage}
        showPriceAndQtyOfItem={this.addItemImage}
        showPriceAndQtyOfItem={showPriceAndQtyOfItem}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(AccordianItemController);
