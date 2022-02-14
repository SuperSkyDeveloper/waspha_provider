import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import moment from 'moment';
import ProductAndCategoryFormView from './ProductAndCategoryFormView';
import {PROMO_TYPES, strings} from '../../constants';
import util from '../../util';
import {
  addProductCategoryRequest,
  addProductRequest,
  editCategoryRequest,
  editProductRequest,
  getProductsRequest,
} from '../../actions/ProductsActions';
import {helper, constains} from '../../s3Helper';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';
const refTitle = React.createRef();
const refDes = React.createRef();

const refPromotion = React.createRef();
class ProductAndCategoryFormController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleName: '',
      category: {},
      description: '',
      titleNameError: '',
      categoryError: '',
      descriptionError: '',
      uploadImagePicker: false,
      itemImage: '',
      itemImageError: '',

      titleNameAr: '',
      categoryAr: {},
      descriptionAr: '',
      titleNameErrorAr: '',
      categoryErrorAr: '',
      descriptionErrorAr: '',
      uploadImagePickerAr: false,
      itemImageAr: '',
      itemImageErrorAr: '',

      isLoading: false,
      isFeatureProduct: false,
      language: util.getLanguage(),
      isRtl: util.isRTL(),

      selectedPromoOption: null,
      discount: 0,
      discountError: '',
      giftProduct: null,
      giftProductError: '',
      eta: null,
      isDateTimePicker: false,
      featureDesc: '',
      featureDescError: '',
      menuPromotionId: null,
    };
  }

  static propTypes = {
    isEdit: PropTypes.bool,
    isCategory: PropTypes.bool,
    item: PropTypes.object,
    allCategories: PropTypes.array,
    mainCategory: PropTypes.object,
  };
  static defaultProps = {
    isEdit: false,
    isCategory: false,
    item: {},
    mainCategory: {},
    allCategories: [],
  };

  componentDidMount() {
    const {isEdit} = this.props;
    if (isEdit) {
      this.getStoreProducts();
    }
    this.initial();
    this.setDeafualtCategory();
  }

  getStoreProducts = () => {
    const {getProductsRequest, storeId} = this.props;
    const payload = {
      store_id: storeId,
    };
    getProductsRequest(payload, (response) => {
      if (response) {
        this.getPromotionProduct();
      }
    });
  };

  getPromotionProduct = () => {
    const {isEdit, item, storeProducts} = this.props;

    if (isEdit) {
      if (
        item.is_featured &&
        item.menu_promotion.type === util.PROMO_OPTIONS()[2].key
      ) {
        let giftProduct = _.find(storeProducts, function (arr) {
          return arr.id === item.menu_promotion.extra_data.product_id;
        });

        if (!_.isNil(giftProduct)) {
          this.setState({giftProduct});
        }
      }
    }
  };

  initial = () => {
    const {isEdit, item, allCategories, isCategory} = this.props;

    if (isEdit) {
      let data = {};
      data = _.find(allCategories, function (arr) {
        let finderId = isCategory ? item.parent_id : item.category_id;
        return finderId === arr.id;
      });

      if (_.isEmpty(data)) {
        data = util.NONE_CATEGORY();
      }

      this.setState({
        titleName: isCategory
          ? !_.isNil(item.name.en)
            ? item.name.en
            : ''
          : !_.isNil(item.title.en)
          ? item.title.en
          : '',
        itemImage: !_.isNil(item.image.en) ? item.image.en : '',
        description: !_.isNil(item.description.en) ? item.description.en : '',
        category: data,
        isFeatureProduct: item.is_featured,
        titleNameAr: isCategory
          ? !_.isNil(item.name.ar)
            ? item.name.ar
            : ''
          : !_.isNil(item.title.ar)
          ? item.title.ar
          : '',
        categoryAr: data,
        descriptionAr: !_.isNil(item.description.ar) ? item.description.ar : '',
        itemImageAr: !_.isNil(item.image.ar) ? item.image.ar : '',
      });

      if (item.is_featured && !_.isNil(item.menu_promotion)) {
        this.setState({
          menuPromotionId: item.menu_promotion.id,
          selectedPromoOption: item.menu_promotion.type,
          discount:
            !_.isNil(item.menu_promotion.extra_data) &&
            !_.isNil(item.menu_promotion.extra_data.discount)
              ? item.menu_promotion.extra_data.discount
              : 0,

          eta: item.menu_promotion.expiry_time,
          featureDesc:
            !_.isNil(item.menu_promotion.description) &&
            !_.isEmpty(item.menu_promotion.description)
              ? item.menu_promotion.description
              : '',
        });
      }
    }
  };

  // set main catepgory on defualt when user create a category
  setDeafualtCategory = () => {
    const {mainCategory, isEdit} = this.props;
    if (!_.isEmpty(mainCategory) && !isEdit) {
      this.setState({
        category: mainCategory,
      });
    }
  };

  setValue = (key) => {
    this.setState(key);
  };

  categoryNestSelect = (obj) => {
    this.setState(obj);
  };

  closeImagePickerModal = () => {
    this.setState({uploadImagePicker: false});
  };

  openImagePickerModal = () => {
    this.setState({uploadImagePicker: true});
  };

  addItemImage = async (itemImage) => {
    // payload
    let payload = {
      uri: itemImage.path,
      fileType: itemImage.mime,
    };

    // send req for aws s3 image upload
    let req = await helper.uploadImageOnS3(
      payload,
      constains.folderList.PRODUCTS,
    );
    if (this.state.language === 'en') {
      this.setState({itemImage: req});
    } else {
      this.setState({itemImageAr: req});
    }
    this.closeImagePickerModal();
  };

  titleNameFocus = () => {
    // this.titleNameRef.focus();
  };

  descriptionFocus = () => {
    //this.descriptionRef.focus();
  };

  featureDescFocus = () => {
    this.featureDescRef.focus();
  };

  validation = () => {
    const {
      titleName,
      category,
      description,
      itemImage,
      isFeatureProduct,
      selectedPromoOption,
      discount,
      giftProduct,
      eta,
    } = this.state;

    let valid = true;
    const {translations} = this.props;
    if (isFeatureProduct) {
      if (!_.isNil(selectedPromoOption)) {
        switch (selectedPromoOption) {
          case PROMO_TYPES.BUY_1_GET_1:
            if (_.isNil(eta)) {
              util.topAlert(
                util.isRequiredErrorMessage(
                  translations.strings['en'].EXPIRY_TIME,
                  'en',
                ),
              );
              valid = false;
            }
            break;
          case PROMO_TYPES.DISCOUNT:
            if (_.isEmpty(discount) || discount === 0) {
              this.setState({
                discountError: util.isRequiredErrorMessage(
                  translations.strings['en'].PROVIDE_DISCOUNT_PERCENTAGE,
                  'en',
                ),
              });
              valid = false;
            }
            if (_.isNil(eta)) {
              util.topAlert(
                util.isRequiredErrorMessage(
                  translations.strings['en'].EXPIRY_TIME,
                  'en',
                ),
              );
              valid = false;
            }
            break;
          case PROMO_TYPES.GIFT_PRODUCT:
            if (_.isNil(giftProduct)) {
              util.topAlert(
                util.isRequiredErrorMessage(
                  translations.strings['en'].SELECT_GIFT_PRODUCT,
                  'en',
                ),
              );
              valid = false;
            }
            if (_.isNil(eta)) {
              util.topAlert(
                util.isRequiredErrorMessage(
                  translations.strings['en'].EXPIRY_TIME,
                  'en',
                ),
              );
              valid = false;
            }
            break;
          default:
            return true;
        }
      } else {
        valid = false;
        util.topAlert(translations.strings['en'].SELECT_PROMO_OPTION, 'en');
      }
    }

    if (_.isEmpty(description)) {
      this.setState({
        descriptionError: util.isRequiredErrorMessage(
          translations.strings['en'].DESCRIPTION,
          'en',
        ),
      });
      this.descriptionFocus();
      valid = false;
    }

    if (_.isEmpty(category)) {
      this.setState({
        categoryError: util.isRequiredErrorMessage(
          translations.strings['en'].CATEGORY,
          'en',
        ),
      });
      valid = false;
    }

    if (_.isEmpty(titleName)) {
      this.setState({
        titleNameError: util.isRequiredErrorMessage(
          translations.strings['en'].TITLE,
          'en',
        ),
      });
      this.titleNameFocus();
      valid = false;
    }
    if (_.isEmpty(itemImage)) {
      this.setState({
        itemImageError: util.isRequiredErrorMessage(
          translations.strings['en'].IMAGE,
          'en',
        ),
      });
      valid = false;
    }

    if (valid) {
      this.setState({
        titleNameErrorAr: '',
        categoryErrorAr: '',
        descriptionErrorAr: '',
        itemImageErrorAr: '',
      });
    }

    return valid;
  };

  validationAR = () => {
    const {
      titleNameAr,
      categoryAr,
      descriptionAr,
      itemImageAr,
      isFeatureProduct,
      selectedPromoOption,
      discount,
      giftProduct,
      eta,
    } = this.state;
    const {translations} = this.props;

    let valid = true;

    if (isFeatureProduct) {
      if (!_.isNil(selectedPromoOption)) {
        switch (selectedPromoOption) {
          case PROMO_TYPES.BUY_1_GET_1:
            if (_.isNil(eta)) {
              // util.isRequiredErrorMessage(strings.EXPIRY_TIME)
              util.topAlert(strings.EXPIRY_TIME_IS_REQ);
              valid = false;
            }
            break;
          case PROMO_TYPES.DISCOUNT:
            if (_.isEmpty(discount) || discount === 0) {
              this.setState({
                discountError: strings.PROVIDE_DISCOUNT_PERCENTAG,
                // util.isRequiredErrorMessage(
                //   strings.PROVIDE_DISCOUNT_PERCENTAGE,
                // ),
              });
              valid = false;
            }
            if (_.isNil(eta)) {
              // util.topAlert(util.isRequiredErrorMessage(strings.EXPIRY_TIME));
              util.topAlert(strings.EXPIRY_TIME_IS_REQ);

              valid = false;
            }
            break;
          case PROMO_TYPES.GIFT_PRODUCT:
            if (_.isNil(giftProduct)) {
              // util.topAlert(
              //   util.isRequiredErrorMessage(strings.SELECT_GIFT_PRODUCT),
              // );
              util.topAlert(strings.SELECT_GIFT_PRODUCT);

              valid = false;
            }
            if (_.isNil(eta)) {
              // util.topAlert(util.isRequiredErrorMessage(strings.EXPIRY_TIME));
              util.topAlert(strings.EXPIRY_TIME_IS_REQ);

              valid = false;
            }
            break;
          default:
            return true;
        }
      } else {
        valid = false;
        util.topAlert(strings.SELECT_PROMO_OPTION);
      }
    }

    if (_.isEmpty(descriptionAr)) {
      this.setState({
        descriptionErrorAr: util.isRequiredErrorMessage(
          translations.strings['ar'].DESCRIPTION,
          'ar',
        ),
      });
      this.descriptionFocus();
      valid = false;
    }

    if (_.isEmpty(categoryAr)) {
      this.setState({
        categoryErrorAr: util.isRequiredErrorMessage(
          translations.strings['ar'].CATEGORY,
          'ar',
        ),
      });
      valid = false;
    }

    if (_.isEmpty(titleNameAr)) {
      this.setState({
        titleNameErrorAr: util.isRequiredErrorMessage(
          translations.strings['ar'].TITLE,
          'ar',
        ),
      });
      this.titleNameFocus();
      valid = false;
    }
    if (_.isEmpty(titleNameAr)) {
      this.setState({
        titleNameErrorAr: util.isRequiredErrorMessage(
          translations.strings['ar'].TITLE,
          'ar',
        ),
      });
      this.titleNameFocus();
      valid = false;
    }
    if (_.isEmpty(itemImageAr)) {
      this.setState({
        itemImageErrorAr: util.isRequiredErrorMessage(
          translations.strings['ar'].IMAGE,
          'ar',
        ),
      });
      this.titleNameFocus();
      valid = false;
    }

    if (valid) {
      this.setState({
        titleNameError: '',
        categoryError: '',
        descriptionError: '',
        itemImageError: '',
      });
    }

    return valid;
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      titleNameError: '',
      categoryError: '',
      descriptionError: '',
      itemImageError: '',
      titleNameErrorAr: '',
      categoryErrorAr: '',
      descriptionErrorAr: '',
      itemImageErrorAr: '',
    });

    // if validation pass
    if (this.validation() || this.validationAR()) {
      // start loading
      this.setState({
        isLoading: true,
      });
      const {
        titleName,
        category,
        categoryAr,
        itemImage,
        itemImageAr,
        titleNameAr,
        description,
        descriptionAr,
        isFeatureProduct,
        selectedPromoOption,
        eta,
        discount,
        giftProduct,
        language,
        featureDesc,
      } = this.state;
      // in "if" create category, and in "else" create product
      if (this.props.isCategory) {
        const payload = {
          name: {
            en: _.isEmpty(titleName) ? null : titleName,
            ar: _.isEmpty(titleNameAr) ? null : titleNameAr,
          },
          parent_id: language === 'ar' ? categoryAr.id : category.id,
          image: {
            en: _.isEmpty(itemImage) ? null : itemImage,
            ar: _.isEmpty(itemImageAr) ? null : itemImageAr,
          },
          description: {
            en: _.isEmpty(description) ? null : description,
            ar: _.isEmpty(descriptionAr) ? null : descriptionAr,
          },
        };
        this.props.addProductCategoryRequest(payload, (status) => {
          // stop loading
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.pop({refresh: {isScreenRefresh: new Date()}});
          }
        });
      } else {
        let payload = {
          title: {
            en: _.isEmpty(titleName) ? null : titleName,
            ar: _.isEmpty(titleNameAr) ? null : titleNameAr,
          },
          category_id: language === 'ar' ? categoryAr.id : category.id,
          image: {
            en: _.isEmpty(itemImage) ? null : itemImage,
            ar: _.isEmpty(itemImageAr) ? null : itemImageAr,
          },
          description: {
            en: _.isEmpty(description) ? null : description,
            ar: _.isEmpty(descriptionAr) ? null : descriptionAr,
          },
          is_featured: isFeatureProduct,
        };

        if (isFeatureProduct) {
          payload['menu_promotion'] = {
            type: selectedPromoOption,
            expiry_time: moment(eta).toISOString(),
          };

          if (selectedPromoOption === PROMO_TYPES.DISCOUNT)
            payload['menu_promotion']['extra_data'] = {
              discount,
              discount_type: 'percentage',
            };
          if (selectedPromoOption === PROMO_TYPES.GIFT_PRODUCT)
            payload['menu_promotion']['extra_data'] = {
              product_id: giftProduct.id,
              product_name: giftProduct.title,
            };

          if (!_.isEmpty(featureDesc)) {
            payload['menu_promotion']['description'] = featureDesc;
          }
        } else {
          payload['menu_promotion'] = null;
        }

        this.props.addProductRequest(payload, (status) => {
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.pop({refresh: {isScreenRefresh: new Date()}});
          }
        });
      }
    }
  };

  selectPromoOption = (item) => {
    const {selectedPromoOption} = this.state;
    const {storeProducts} = this.props;

    if (!_.isNil(selectedPromoOption) && selectedPromoOption === item) {
      //when selected box is same

      this.setState({selectedPromoOption: null});
    } else {
      this.setState({selectedPromoOption: item});

      if (item === PROMO_TYPES.GIFT_PRODUCT) {
        // Gift promo product
        Actions.itemList({
          itemList: storeProducts,
          title: strings.GIFT_PRODUCT,
          fromAddProduct: true,
          selectProduct: this.selectGiftProduct,
        });
      }
    }
  };

  selectGiftProduct = (item) => {
    this.setState({giftProduct: item});
    Actions.pop();
  };

  // if screen for edit
  handleEdit = () => {
    // clear all error msg
    this.setState({
      titleNameError: '',
      categoryError: '',
      descriptionError: '',
      itemImageError: '',
      titleNameErrorAr: '',
      categoryErrorAr: '',
      descriptionErrorAr: '',
      itemImageErrorAr: '',
    });

    // if validation pass
    if (this.validation() || this.validationAR()) {
      // start loading
      this.setState({
        isLoading: true,
      });
      const {
        titleName,
        category,
        categoryAr,
        itemImage,
        itemImageAr,
        titleNameAr,
        description,
        descriptionAr,
        isFeatureProduct,
        selectedPromoOption,
        eta,
        discount,
        giftProduct,
        language,
        featureDesc,
        menuPromotionId,
      } = this.state;
      // in "if" create category, and in "else" create product
      if (this.props.isCategory) {
        const payload = {
          id: this.props.item.id,
          name: {
            en: _.isEmpty(titleName) ? null : titleName,
            ar: _.isEmpty(titleNameAr) ? null : titleNameAr,
          },
          parent_id: language === 'ar' ? categoryAr.id : category.id,
          image: {
            en: _.isEmpty(itemImage) ? null : itemImage,
            ar: _.isEmpty(itemImageAr) ? null : itemImageAr,
          },
          description: {
            en: _.isEmpty(description) ? null : description,
            ar: _.isEmpty(descriptionAr) ? null : descriptionAr,
          },
        };
        this.props.editCategoryRequest(payload, (status) => {
          // stop loading
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.pop({refresh: {isScreenRefresh: new Date()}});
          }
        });
      } else {
        let payload = {
          id: this.props.item.id,
          title: {
            en: _.isEmpty(titleName) ? null : titleName,
            ar: _.isEmpty(titleNameAr) ? null : titleNameAr,
          },
          category_id: language === 'ar' ? categoryAr.id : category.id,
          image: {
            en: _.isEmpty(itemImage) ? null : itemImage,
            ar: _.isEmpty(itemImageAr) ? null : itemImageAr,
          },
          description: {
            en: _.isEmpty(description) ? null : description,
            ar: _.isEmpty(descriptionAr) ? null : descriptionAr,
          },
          is_featured: isFeatureProduct,
        };

        if (isFeatureProduct) {
          payload['menu_promotion'] = {
            type: selectedPromoOption,
            expiry_time: moment(eta).toISOString(),
          };

          if (!_.isNil(menuPromotionId)) {
            payload['menu_promotion']['id'] = menuPromotionId;
          }

          if (selectedPromoOption === PROMO_TYPES.DISCOUNT)
            payload['menu_promotion']['extra_data'] = {
              discount,
              discount_type: 'percentage',
            };
          if (selectedPromoOption === PROMO_TYPES.GIFT_PRODUCT)
            payload['menu_promotion']['extra_data'] = {
              product_id: giftProduct.id,
              product_name: giftProduct.title,
            };

          if (!_.isEmpty(featureDesc)) {
            payload['menu_promotion']['description'] = featureDesc;
          }
        } else {
          payload['menu_promotion'] = null;
        }

        this.props.editProductRequest(payload, (status) => {
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.pop({refresh: {isScreenRefresh: new Date()}});
          }
        });
      }
    }
  };

  setSelectedDropDownValue = (value) => {
    this.setState({
      eta: value.toString(),
    });
  };

  submitBtnTitle = () => {
    if (this.props.isEdit) {
      return strings.SAVE_CHANGES;
    } else {
      return strings.SUBMIT;
    }
  };

  handleChangeLanguage = (lang) => {
    this.setState(
      {
        language: lang,
      },
      () => {
        if (lang == 'en') {
          this.setState({
            isRtl: false,
          });
        } else {
          this.setState({
            isRtl: true,
          });
        }
      },
    );
  };

  render() {
    const {
      titleNameError,
      categoryError,
      descriptionError,
      titleName,
      category,
      description,
      uploadImagePicker,
      itemImageError,
      itemImage,
      isLoading,
      isFeatureProduct,
      language,
      isRtl,

      titleNameAr,
      categoryAr,
      descriptionAr,
      titleNameErrorAr,
      categoryErrorAr,
      descriptionErrorAr,
      uploadImagePickerAr,
      itemImageAr,
      itemImageErrorAr,

      selectedPromoOption,
      discount,
      discountError,
      giftProduct,
      giftProductError,
      eta,
      isDateTimePicker,
      featureDesc,
      featureDescError,
    } = this.state;
    return (
      <ProductAndCategoryFormView
        titleNameAr={titleNameAr}
        categoryAr={categoryAr}
        descriptionAr={descriptionAr}
        titleNameErrorAr={titleNameErrorAr}
        categoryErrorAr={categoryErrorAr}
        descriptionErrorAr={descriptionErrorAr}
        uploadImagePickerAr={uploadImagePickerAr}
        itemImageAr={itemImageAr}
        itemImageErrorAr={itemImageErrorAr}
        isRtl={isRtl}
        language={language}
        isFeatureProduct={isFeatureProduct}
        itemImage={itemImage}
        selectedPromoOption={selectedPromoOption}
        isLoading={isLoading}
        itemImageError={itemImageError}
        titleName={titleName}
        category={category}
        description={description}
        titleNameError={titleNameError}
        categoryError={categoryError}
        descriptionError={descriptionError}
        uploadImagePicker={uploadImagePicker}
        selectedPromoOption={selectedPromoOption}
        discount={discount}
        discountError={discountError}
        giftProduct={giftProduct}
        giftProductError={giftProductError}
        eta={eta}
        isDateTimePicker={isDateTimePicker}
        featureDesc={featureDesc}
        featureDescError={featureDescError}
        selectPromoOption={this.selectPromoOption}
        handleChangeLanguage={this.handleChangeLanguage}
        submitBtnTitle={this.submitBtnTitle}
        handleEdit={this.handleEdit}
        categoryNestSelect={this.categoryNestSelect}
        closeImagePickerModal={this.closeImagePickerModal}
        openImagePickerModal={this.openImagePickerModal}
        handleSubmit={this.handleSubmit}
        addItemImage={this.addItemImage}
        titleNameFocus={this.titleNameFocus}
        descriptionFocus={this.descriptionFocus}
        handleChangeLanguage={this.handleChangeLanguage}
        setValue={(data) => this.setValue(data)}
        setSelectedDropDownValue={this.setSelectedDropDownValue}
        refTitle={refTitle}
        refDes={refDes}
        refPromotion={refPromotion}
        titleNameRef={(ref) => {
          this.titleNameRef = ref;
        }}
        descriptionRef={(ref) => {
          this.descriptionRef = ref;
        }}
        featureDescRef={(ref) => {
          this.featureDescRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({products, general, vendorStore}) => ({
  allCategories: products.allCategories,
  translations: general.translationLocales,
  storeProducts: products.allProducts.products,
  storeId: vendorStore.storeProfile.id,
});

const actions = {
  addProductCategoryRequest,
  addProductRequest,
  editProductRequest,
  editCategoryRequest,
  getProductsRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(ProductAndCategoryFormController);
