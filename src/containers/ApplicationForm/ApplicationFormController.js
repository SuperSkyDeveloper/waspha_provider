import React from 'react';
import moment, {duration} from 'moment';
import PropTypes from 'prop-types';
import ApplicationFormView from './ApplicationFormView';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import _ from 'lodash';
import {
  DATE_FORMAT2,
  SCHEDULE,
  SCHEDULE_DEFAULT_TIME,
  strings,
  TIME_FORMAT,
  TIME_FORMAT3,
} from '../../constants';
import {
  ISOToFormat,
  filterMainCategory,
  filterSubCategory,
  toISOString,
  subCategoriesList,
} from '../../helpers/generalHelper';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import DocumentPicker from 'react-native-document-picker';
import {
  businessRegistrationRequest,
  editBusinessProfileRequest,
  updateUserData,
} from '../../actions/UserActions';
import {filterSelectedSchedule} from '../../helpers/vendorOnBoardHelper';
import {filterSelectedCategory} from '../../helpers/generalHelper';

import {helper, constains} from '../../s3Helper';
import {storeProfileRequest} from '../../actions/VendorStoreAction';
import {alertMessage} from '../../actions/GeneralActions';
const refBusiness = React.createRef();
const refBusinessAR = React.createRef();

class ApplicationFormController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentData: [],
      documentError: '',
      scheduleOptIndex: 1,
      selectDayIndex: 0,
      phone: '',
      phoneError: '',
      businessName: '',
      businessError: '',
      address: '',
      addressError: '',
      deliveryRangeValue: '',
      deliveryRangeError: '',
      mainCategories: '',
      selectedCategoryId: '',
      selectedCategoryError: '',
      subcategoryCategories: '',
      selectedSubCategory: [],
      selectedSubCategoryError: '',
      isLoading: false,

      scheduleError: '',
      isHelpModalVisible: false,
      isDocumentError: false,

      schedule: util.SCHEDULE(),
      isTimeModalVisible: false,
      shiftIndex: null,
      dayIndex: null,
      timeModalFor: null,

      proposalPrepTime: '',
      preperationTimeType: util.PROPOSAL_TIME_TYPE()[0].slug,
      proposalPrepTimeError: '',
      proposalSelectionTime: '',
      selectionTimeType: util.PROPOSAL_TIME_TYPE()[0].slug,
      proposalSelectionTimeError: '',

      showReqCategoryModal: false,
      requestedCategory: '',
      requestedCategoryError: '',
      timeBottomSheetFor: '',

      businessCategories: [],
      activeIndex: null,
      moreCategoryBtnDisable: false,
      storeProfileLoading: props.isForEdit,
      documentLoader: false,
      businessLogo: '',
      businessLogoError: '',
      isImgUploadVisible: false,

      businessNameAr: '',
      visibleDocModal: false,
      selectedDocIndex: 0,
    };
  }

  async componentDidMount() {
    await this.initial();

    await this.handleMoreCategory();

    if (this.props.isForEdit) {
      // send data to req
      this.editStoreProfile();
    }
  }

  handleUpdate = () => {
    const {storeProfile} = this.props;

    let location = {
      formatted_address: storeProfile.location.address,
      latitude:
        storeProfile.location &&
        storeProfile.location.lat &&
        storeProfile.location.lat,
      longitude:
        storeProfile.location &&
        storeProfile.location.lng &&
        storeProfile.location.lng,
    };
    this.setState({
      businessName: storeProfile.name.en,
      businessNameAr: storeProfile.name.ar,
      businessLogo: storeProfile.image,
      phone: storeProfile.phone,
      deliveryRangeValue: storeProfile.delivery_range,
      selectedSubCategory: storeProfile.categories,
      documentData: storeProfile.documents,
      address: location,
      schedule: _.isObject(storeProfile.timings)
        ? this.handleEditSchedule(storeProfile && storeProfile.timings)
        : util.SCHEDULE(),
      scheduleOptIndex: _.isObject(storeProfile.timings) ? 0 : 1,
      proposalPrepTime: storeProfile.proposal_prep_time,
      proposalSelectionTime: storeProfile.proposal_selection_time,
    });
  };

  // here get all main category and save into state
  initial = () => {
    const {allCategories} = this.props;

    this.setState({
      mainCategories: filterMainCategory(allCategories),
    });
  };

  editStoreProfile = () => {
    // stop loading
    this.setState({
      storeProfileLoading: true,
    });

    // if profile data not exit then send req for data
    if (_.isEmpty(this.props.storeProfile)) {
      this.props.storeProfileRequest({}, (status) => {
        // stop loading
        this.setState({
          storeProfileLoading: false,
        });

        if (status) {
          this.handleUpdateCategory();
          this.handleUpdate();
        }
      });
    } else {
      this.setState({
        storeProfileLoading: false,
      });
      this.handleUpdateCategory();
      this.handleUpdate();
    }
  };

  businessNameFocus = () => {
    this.businessNameRef.focus();
  };

  // manipulate schedule data for set state
  handleEditSchedule = (timings) => {
    let data = Object.entries(timings);
    let temp = _.cloneDeep(util.SCHEDULE());
    util.SCHEDULE().forEach((item, index) => {
      if (data[index] && item.day == data[index][0]) {
        temp[index].status = true;
        temp[index].shift = data[index][1];
      }
    });

    return temp;
  };

  phoneFocus = () => {
    // this.phoneRef.focus();
  };

  deliveryRangeFocus = () => {
    this.deliveryRangeRef.focus();
  };

  validation = () => {
    const {
      businessName,
      phone,
      address,
      deliveryRangeValue,
      selectedCategoryId,
      documentData,
      selectedSubCategory,
      proposalPrepTime,
      proposalSelectionTime,
      schedule,
      scheduleOptIndex,
      requestedCategory,
      businessCategories,
      businessLogo,
    } = this.state;

    let error = true;

    if (_.isEmpty(businessLogo)) {
      this.setState({
        businessLogoError: strings.IMAGE_IS_REQ,
        //util.isRequiredErrorMessage(strings.IMAGE),
      });
      error = false;
    }

    // delivery Range
    if (!util.isEmpty(deliveryRangeValue)) {
      this.setState({
        deliveryRangeError: strings.PLEASE_DEFINE_YOUR_DELIVERY_RANGE,
      });
      // this.deliveryRangeFocus();
      error = false;
    }
    // address
    if (_.isEmpty(address)) {
      this.setState({
        addressError: strings.PLEASE_ENTER_BUSINESS_ADDRESS,
      });
      // this.addressFocus();
      error = false;
    }

    // phone
    if (!this.props.isForEdit) {
      if (_.isEmpty(phone.number)) {
        this.setState({
          phoneError: strings.PLEASE_ENTER_BUSINESS_PHONE_NUMBER,
        });
        // this.phoneFocus();
        error = false;
      } else if (!util.isNumber(phone.number) || !phone.isNumberValid) {
        this.setState({
          phoneError: strings.ENTER_VALID_NUMBER,
        });
        // this.phoneFocus();
        error = false;
      }
    }

    // businessName
    if (_.isEmpty(businessName)) {
      this.setState({
        businessNameError: strings.PLEASE_ENTER_VALID_BUSINESS_NAME,
      });
      // this.businessNameFocus();
      error = false;
    }

    // main category

    if (
      _.isEmpty(filterSelectedCategory(businessCategories, 'mainCategories'))
    ) {
      this.setState({
        selectedCategoryError: strings.PLEASE_SELECT_BUSINESS_CATEGORY,
      });
      error = false;
    }
    //  sub category
    if (
      _.isEmpty(filterSelectedCategory(businessCategories, 'subcategories'))
    ) {
      this.setState({
        selectedSubCategoryError:
          strings.PLEASE_SELECT_BUSINESS_CATEGORY_CATEGORY,
      });
      error = false;
    }

    //  document
    if (_.isEmpty(documentData)) {
      this.setState({
        documentError: strings.PLEASE_UPLOAD_ANY_LEGAL_DOCUMENT,
      });
      error = false;
    }

    //  proposalPrepTime
    if (!util.isEmpty(proposalPrepTime)) {
      this.setState({
        proposalPrepTimeError: strings.PLEASE_ADD_PROPOSAL_PREPERATION_TIME,
      });
      error = false;
    }
    //  proposalSelectionTimeError
    if (!util.isEmpty(proposalSelectionTime)) {
      this.setState({
        proposalSelectionTimeError: strings.PLEASE_ADD_PROPOSAL_SELECTION_TIME,
      });
      error = false;
    }

    if (scheduleOptIndex === 0 && !filterSelectedSchedule(schedule).length) {
      this.setState({
        scheduleError: strings.PLEASE_ADD_BUSINESS_TIMINGS,
      });
      error = false;
    }

    return error;
  };

  onRadioButtonPress = (index) => {
    this.setState({
      scheduleOptIndex: index,
    });
  };

  // handle select more categories and subtract the current category inthe new categories
  handleMoreCategory = () => {
    const {allCategories, alertMessage} = this.props;
    const {businessCategories} = this.state;
    let tempMainCategories = _.cloneDeep(businessCategories);
    const lastIndex = businessCategories.length - 1;
    let tempObj = {};
    console.log({lastIndex});

    // console.log({targetCategories});
    // console.log({targetCategory});
    if (_.isEmpty(businessCategories)) {
      tempObj = {
        mainCategories: filterMainCategory(allCategories),
        subcategories: [],
      };
    } else {
      let targetCategories = _.cloneDeep(businessCategories);
      let targetCategory = targetCategories[lastIndex];
      // find select category index
      let selectedIndex = _.findIndex(targetCategory.mainCategories, {
        isSelected: true,
      });

      // if there is not select any catogory then show error
      if (selectedIndex < 0) {
        // return util.topAlert(strings.PLEASE_SELECT_CATEGORY_FIRST);
        return alertMessage(strings.PLEASE_SELECT_CATEGORY_FIRST);
      }

      targetCategory.mainCategories.splice(selectedIndex, 1);
      targetCategory.subcategories = [];
      tempObj = targetCategory;
    }

    tempMainCategories.push(tempObj);

    this.setState({
      businessCategories: tempMainCategories,
    });
  };

  // handle active category and show related subcategory and
  // remove all previous selected sub category when click on category
  onCategoryItemPress = (mainCatId, mainCategoryIndex, categoryListIndex) => {
    console.log({mainCatId});
    console.log({mainCategoryIndex});

    console.log({categoryListIndex});

    const {allCategories} = this.props;
    const {businessCategories} = this.state;
    const tempMainCategories = _.cloneDeep(businessCategories);

    // if business category end then btn disble
    this.setState({
      moreCategoryBtnDisable:
        this.state.businessCategories[this.state.businessCategories.length - 1]
          .mainCategories.length === 1,
    });

    // find the list index
    let targetCategory = tempMainCategories[categoryListIndex];
    // find the previous isSelected index
    let selectedIndex = _.findIndex(targetCategory.mainCategories, {
      isSelected: true,
    });
    // change  the isSelected value tofalse
    if (selectedIndex >= 0) {
      tempMainCategories[categoryListIndex].mainCategories[
        selectedIndex
      ].isSelected = false;
    }

    // if user click on again selected category then remove all next category

    if (tempMainCategories.length - 1 > categoryListIndex) {
      tempMainCategories.splice(
        categoryListIndex + 1,
        tempMainCategories.length - categoryListIndex,
      );
    }

    // here set new selected value
    tempMainCategories[categoryListIndex].mainCategories[
      mainCategoryIndex
    ].isSelected = !tempMainCategories[categoryListIndex].mainCategories[
      mainCategoryIndex
    ].isSelected;

    // find sub Category and set in the tempMainCategories
    tempMainCategories[categoryListIndex].subcategories = filterSubCategory(
      allCategories,
      mainCatId,
    );
    this.setState({
      businessCategories: tempMainCategories,
    });
    return true;
  };

  // handle  select sub cateories and set into state
  handleSelectSubCategory = (subcategoryId, categoryListIndex) => {
    const {businessCategories} = this.state;
    const tempCategories = _.cloneDeep(businessCategories);

    // find selected subcategory index
    let subcategoryIndex = _.findIndex(
      tempCategories[categoryListIndex].subcategories,
      ['id', subcategoryId],
    );

    // set value
    tempCategories[categoryListIndex].subcategories[
      subcategoryIndex
    ].isSelected = !tempCategories[categoryListIndex].subcategories[
      subcategoryIndex
    ].isSelected;

    this.setState({
      businessCategories: tempCategories,
    });

    return true;
  };

  // handle remove doucment
  handleRemoveDocument = (index) => {
    const temp = _.cloneDeep(this.state.documentData);
    temp.splice(index, 1);
    this.setState({
      documentData: temp,
    });
  };

  // handle submit btn
  handleSubmit = () => {
    // clear all error msg
    this.setState({
      phoneError: '',
      businessNameError: '',
      addressError: '',
      deliveryRangeError: '',
      selectedCategoryError: '',
      documentError: '',
      selectedSubCategoryError: '',
      scheduleError: '',
      proposalPrepTimeError: '',
      proposalSelectionTimeError: '',
      requestedCategoryError: '',
      businessLogoError: '',
    });
    // if validation pass

    if (this.validation()) {
      // start loading

      this.setState({
        isLoading: true,
      });

      const {
        businessName,
        phone,
        deliveryRangeValue,
        selectedCategoryId,
        selectedSubCategory,
        scheduleOptIndex,
        documentData,
        address,
        schedule,
        proposalPrepTime,
        proposalSelectionTime,
        requestedCategory,
        preperationTimeType,
        selectionTimeType,
        businessCategories,
        businessLogo,
        businessNameAr,
      } = this.state;

      const payload = {
        business_name: {en: businessName, ar: businessNameAr},
        phone: phone,
        delivery_range: deliveryRangeValue,
        categories: filterSelectedCategory(
          businessCategories,
          'mainCategories',
        ),
        subcategories: filterSelectedCategory(
          businessCategories,
          'subcategories',
        ),
        image: businessLogo,
        location: {
          address: address.formatted_address,
          lat: address.latitude,
          lng: address.longitude,
        },
        timings: {
          custom:
            scheduleOptIndex === 0 ? filterSelectedSchedule(schedule) : false,
        },
        document: documentData,
        proposal_selection_time: util.convertToMinutes(
          proposalSelectionTime,
          selectionTimeType.type,
        ),
        proposal_prep_time: util.convertToMinutes(
          proposalPrepTime,
          preperationTimeType.type,
        ),
        requested_category: requestedCategory,
      };

      // handle send req for edit or save
      if (this.props.isForEdit) {
        // send request
        this.props.editBusinessProfileRequest(payload, (status) => {
          this.props.storeProfileRequest({}, (status) => {});
          this.props.updateUserData({is_form_submitted: true});

          // stop loading
          this.setState({
            isLoading: false,
          });

          if (status) {
            Actions.pop();
          }
        });
      } else {
        // send request
        this.props.businessRegistrationRequest(payload, (status) => {
          this.props.updateUserData({is_form_submitted: true});

          // stop loading
          this.setState({
            isLoading: false,
          });

          if (status) {
            Actions.waiting();
          }
        });
      }
    }
  };
  // set value in state

  setValue = (key) => {
    this.setState(key);
  };

  // document picker
  handleDocumentUpload = async () => {
    this.setState({
      documentLoader: true,
    });
    let data = _.cloneDeep(this.state.documentData);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then((images) => {
        images.forEach(async (item) => {
          let req = await helper.uploadImageOnS3(
            {
              uri: item.path,
              fileType: item.mime,
            },
            constains.folderList.STORES,
          );
          data.push(req);
          this.setState({
            documentLoader: false,
            documentData: data,
            isDocumentError: false,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return true;
    // Pick a single file
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      // console.log(
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size,
      // );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        this.setState({
          isDocumentError: true,
        });
        // throw err;
      }
    }
  };

  static propTypes = {
    isForEdit: PropTypes.bool,
  };
  static defaultProps = {
    isForEdit: false,
  };

  // handle help modal
  handleHelpModal = () => {
    const temp = _.cloneDeep(this.state.isHelpModalVisible);

    this.setValue({
      isHelpModalVisible: !temp,
    });
  };

  // handle Select Day
  handleSelectDay = (dayIndex) => {
    let temp = _.cloneDeep(this.state.schedule);
    // status true or false
    temp[dayIndex].status = !temp[dayIndex].status;

    this.setState({
      schedule: temp,
    });
  };

  // handle change shifts value
  handleScheduleShift = (dayIndex, shiftIndex, key) => {
    let temp = _.cloneDeep(this.state.schedule);
    let data = key;
    // todo change has on property
    let seperateKey = Object.keys(key);
    // check is key "to and "from time is less, than add 15 minute in from""
    if (seperateKey[0] === 'to') {
      let toTime = moment(key.to);
      let fromTime = moment(temp[dayIndex].shift[shiftIndex].from);
      let result = toTime.isAfter(fromTime);
      if (!result) {
        data = {
          ...key,

          to: toISOString(moment(fromTime).add(15, 'minutes'), TIME_FORMAT3),
        };
      }
    }

    temp[dayIndex].shift[shiftIndex] = {
      ...temp[dayIndex].shift[shiftIndex],
      ...data,
    };

    this.setState({
      schedule: temp,
      isTimeModalVisible: false,
    });
  };

  // handle add new shift
  handleAddNewShift = (dayIndex) => {
    const newShift = {
      to: SCHEDULE_DEFAULT_TIME.to,
      from: SCHEDULE_DEFAULT_TIME.from,
    };
    let temp = _.cloneDeep(this.state.schedule);
    temp[dayIndex].shift = [...temp[dayIndex].shift, newShift];
    this.setState({
      schedule: temp,
    });
  };

  // handle time modal
  handleTimeModal = (dayIndex, shiftIndex, timeModalFor) => {
    this.setState({
      shiftIndex: shiftIndex,
      dayIndex: dayIndex,
      isTimeModalVisible: true,
      timeModalFor,
    });
  };

  // handle close time modal
  handleCloseTimeModal = () => {
    this.setState({
      isTimeModalVisible: false,
    });
  };

  // delete shifting
  handleDeleteShift = (dayIndex, shiftIndex) => {
    let temp = _.cloneDeep(this.state.schedule);
    if (temp[dayIndex].status) {
      temp[dayIndex].shift.splice(shiftIndex, 1);
      this.setState({
        schedule: temp,
      });
    }
  };

  // handle request category modal
  handleReqCategoryModal = () => {
    const {requestedCategory} = this.state;
    if (requestedCategory) {
      // close modal
      this.handleCloseReqCategoryModal();
      // clear error
      this.setState({
        requestedCategoryError: '',
      });
    } else {
      this.setState({
        requestedCategoryError: 'Please enter category name',
      });
    }
  };

  // handle request category modal
  handleOpenReqCategoryModal = () => {
    this.setState({
      showReqCategoryModal: true,
    });
  };

  // handle request category modal
  handleCloseReqCategoryModal = () => {
    this.setState({
      showReqCategoryModal: false,
    });
  };

  handleTimeOptionSheet = (state) => {
    if (state == 'on') {
      return this.refRBSheet.open();
    }
    return this.refRBSheet.close();
  };

  // handle  proposal time type in days mintues or sec
  handleProposalTimeType = (val) => {
    // close modal
    this.handleTimeOptionSheet();
    const {timeBottomSheetFor} = this.state;
    // setstate if this preperation time
    if (timeBottomSheetFor === 'preperationTime') {
      return this.setState({
        preperationTimeType: val.slug,
      });
    }
    // setstate if this time out
    if (timeBottomSheetFor === 'timeOut') {
      return this.setState({
        selectionTimeType: val.slug,
      });
    }
  };

  // handle get address data
  handleGetAddressData = async (address) => {
    this.setValue({
      address,
    });
  };

  handleUpdateCategory = async () => {
    let categoriesId = this.props.storeProfile.categories;
    let subCategoriesId = this.props.storeProfile.subcategories;

    console.log({categoriesId});

    let mainCategories = await filterMainCategory(this.props.allCategories);
    let subCategories = await subCategoriesList(this.props.allCategories);
    let index = -1;
    console.log({mainCategories});
    mainCategories.forEach((item) => {
      if (categoriesId.includes(item.id)) {
        index = index + 1;
        console.log('INDEX', _.findIndex(mainCategories, ['id', item.id]));

        this.onCategoryItemPress(
          item.id,
          _.findIndex(mainCategories, ['id', item.id]),
          index,
        );

        subCategories.forEach((subItem, subIndex) => {
          if (
            item.id == subItem.parent_id &&
            subCategoriesId.includes(subItem.id)
          ) {
            this.handleSelectSubCategory(subItem.id, index);
          }
        });
        this.handleMoreCategory();
      }
    });
  };

  handleUploadBusinessLogo = async (image) => {
    // payload
    let payload = {
      uri: image.path,
      fileType: image.mime,
    };

    // send req for aws s3 image upload
    let req = await helper.uploadImageOnS3(payload, constains.folderList.USER);

    this.setState({
      businessLogo: req,
      isImgUploadVisible: false,
    });
  };

  closeImageModal = () => {
    this.setState({isImgUploadVisible: false});
  };

  render() {
    const {
      businessCategories,
      businessNameError,
      businessName,
      businessNameAr,
      phoneError,
      addressError,
      deliveryRangeError,
      mainCategories,
      subcategoryCategories,
      selectedSubCategory,
      documentData,
      isLoading,
      documentError,
      selectedCategoryError,
      selectedSubCategoryError,
      scheduleError,
      isHelpModalVisible,
      isDocumentError,
      address,
      schedule,
      isTimeModalVisible,
      shiftIndex,
      dayIndex,
      timeModalFor,
      proposalPrepTime,
      proposalSelectionTime,
      proposalSelectionTimeError,
      proposalPrepTimeError,
      showReqCategoryModal,
      requestedCategory,
      requestedCategoryError,
      preperationTimeType,
      selectionTimeType,
      deliveryRangeValue,
      moreCategoryBtnDisable,
      storeProfileLoading,
      phone,
      documentLoader,
      businessLogo,
      isImgUploadVisible,
      businessLogoError,
      visibleDocModal,
      selectedDocIndex,
    } = this.state;

    return (
      <ApplicationFormView
        refBusiness={refBusiness}
        refBusinessAR={refBusinessAR}
        handleRemoveDocument={this.handleRemoveDocument}
        businessLogoError={businessLogoError}
        closeImageModal={this.closeImageModal}
        businessLogo={businessLogo}
        isImgUploadVisible={isImgUploadVisible}
        handleUploadBusinessLogo={this.handleUploadBusinessLogo}
        documentLoader={documentLoader}
        storeProfileLoading={storeProfileLoading}
        businessNameAr={businessNameAr}
        moreCategoryBtnDisable={moreCategoryBtnDisable}
        handleMoreCategory={this.handleMoreCategory}
        businessCategories={businessCategories}
        handleGetAddressData={this.handleGetAddressData}
        selectionTimeType={selectionTimeType}
        preperationTimeType={preperationTimeType}
        handleTimeOptionSheet={this.handleTimeOptionSheet}
        handleProposalTimeType={this.handleProposalTimeType}
        requestedCategory={requestedCategory}
        requestedCategoryError={requestedCategoryError}
        handleOpenReqCategoryModal={this.handleOpenReqCategoryModal}
        showReqCategoryModal={showReqCategoryModal}
        handleReqCategoryModal={this.handleReqCategoryModal}
        handleCloseReqCategoryModal={this.handleCloseReqCategoryModal}
        handleDeleteShift={this.handleDeleteShift}
        proposalSelectionTime={proposalSelectionTime}
        proposalSelectionTimeError={proposalSelectionTimeError}
        proposalPrepTimeError={proposalPrepTimeError}
        proposalPrepTime={proposalPrepTime}
        shiftIndex={shiftIndex}
        timeModalFor={timeModalFor}
        handleCloseTimeModal={this.handleCloseTimeModal}
        dayIndex={dayIndex}
        isTimeModalVisible={isTimeModalVisible}
        handleTimeModal={this.handleTimeModal}
        handleAddNewShift={this.handleAddNewShift}
        handleSelectDay={this.handleSelectDay}
        handleScheduleShift={this.handleScheduleShift}
        schedule={schedule}
        isDocumentError={isDocumentError}
        isHelpModalVisible={isHelpModalVisible}
        handleHelpModal={this.handleHelpModal}
        scheduleError={scheduleError}
        selectedSubCategoryError={selectedSubCategoryError}
        documentError={documentError}
        selectedCategoryError={selectedCategoryError}
        documentData={this.state.documentData}
        handleDocumentUpload={this.handleDocumentUpload}
        selectedSubCategory={selectedSubCategory}
        handleSelectSubCategory={this.handleSelectSubCategory}
        mainCategories={mainCategories}
        subcategoryCategories={subcategoryCategories}
        businessNameFocus={this.businessNameFocus}
        phoneFocus={this.phoneFocus}
        // addressFocus={this.addressFocus}
        setValue={this.setValue}
        deliveryRangeFocus={this.deliveryRangeFocus}
        scheduleOptIndex={this.state.scheduleOptIndex}
        radioBtnData={util.radio_props()}
        onRadioButtonPress={this.onRadioButtonPress}
        onCategoryItemPress={this.onCategoryItemPress}
        selectedCategoryId={this.state.selectedCategoryId}
        businessName={businessName}
        address={address}
        deliveryRangeValue={deliveryRangeValue}
        addressError={addressError}
        phoneError={phoneError}
        businessNameError={businessNameError}
        deliveryRangeError={deliveryRangeError}
        isLoading={isLoading}
        phone={phone}
        visibleDocModal={visibleDocModal}
        selectedDocIndex={selectedDocIndex}
        businessNameRef={(ref) => {
          this.businessNameRef = ref;
        }}
        phoneRef={(ref) => {
          this.phoneRef = ref;
        }}
        deliveryRangeRef={(ref) => {
          this.deliveryRangeRef = ref;
        }}
        refRBSheet={(ref) => {
          this.refRBSheet = ref;
        }}
        handleSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general, vendorStore}) => ({
  allCategories: general.appSettings.categories,
  storeProfile: vendorStore.storeProfile,
  translations: general.translationLocales,
});

const actions = {
  businessRegistrationRequest,
  editBusinessProfileRequest,
  storeProfileRequest,
  updateUserData,
  alertMessage,
};

export default connect(mapStateToProps, actions)(ApplicationFormController);
