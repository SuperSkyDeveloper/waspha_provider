import React from 'react';
import PropTypes from 'prop-types';
import DeliveryGuyFormView from './DeliveryGuyFormView';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {addDriverRequest} from '../../actions/DriverActions';
import {helper, constains} from '../../s3Helper';

class DeliveryGuyFormController extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      mobileNo: '',
      vehicle: '',
      vehicleName: '',
      numberPlate: '',
      fullNameError: '',
      passwordError: '',
      retypePwdError: '',
      mobileNoError: '',
      vehicleError: '',
      vehicleNameError: '',
      numberPlateError: '',
      emailError: '',
      password: '',
      retypePwd: '',
      hidePassword: true,
      hideRetypePwd: true,
      isImagePickerShow: false,
      isLoader: false,
      driverAvatar: '',
      driverAvatarError: '',
      takeVehicleInfo: true,
    };
  }
  static propTypes = {
    isOnlineDeliveryGuy: PropTypes.bool,
  };
  static defaultProps = {
    isOnlineDeliveryGuy: false,
  };

  validation() {
    const {
      fullName,
      email,
      password,
      retypePwd,
      mobileNo,
      vehicleName,
      numberPlate,
      vehicle,
      driverAvatar,
      takeVehicleInfo,
    } = this.state;

    let error = true;

    if (_.isEmpty(numberPlate) && takeVehicleInfo) {
      this.setState({
        numberPlateError: strings.NUMBER_PLATE_IS_REQ,
        // util.isRequiredErrorMessage(strings.NUMBER_PLATE),
      });
      this.numberPlateFocus();
      error = false;
    }
    if (_.isEmpty(vehicleName) && takeVehicleInfo) {
      this.setState({
        vehicleNameError: strings.VEHICLE_NAME_IS_REQ,
        // util.isRequiredErrorMessage(strings.VEHICLE_NAME),
      });
      this.vehicleNameFocus();
      error = false;
    }
    if (_.isEmpty(mobileNo)) {
      this.setState({
        mobileNoError: strings.PHONE_NUM_IS_REQ,
        // util.isRequiredErrorMessage(strings.MOBILE_NO),
      });
      this.mobileNoFocus();
      error = false;
    } else if (util.isNumber(mobileNo) || !mobileNo.isNumberValid) {
      this.setState({
        mobileNoError: strings.ENTER_VALID_NUMBER,
      });
      this.mobileNoFocus();
      error = false;
    }

    if (this.props.isOnlineDeliveryGuy) {
      if (_.isEmpty(retypePwd)) {
        this.setState({
          retypePwdError: strings.RETYPE_PASSWORD_IS_REQ,
          //util.isRequiredErrorMessage(strings.RETYPE_PASSWORD),
        });
        this.retypePwdFocus();
        error = false;
      } else if (retypePwd !== password) {
        this.setState({retypePwdError: strings.PASSWORD_NOT_MATCH});
        this.retypePwdFocus();
        error = false;
      }
      if (_.isEmpty(password)) {
        this.setState({
          passwordError: strings.PASSWORD_IS_REQ,
          //util.isRequiredErrorMessage(strings.PASSWORD),
        });
        this.passwordFocus();
        error = false;
      } else if (!util.isPasswordValid(password)) {
        this.setState({passwordError: strings.PASSWORD_LENGTH});
        this.passwordFocus();
        error = false;
      }
      if (_.isEmpty(email)) {
        this.setState({
          emailError: strings.EMAIL_IS_REQ,
          //util.isRequiredErrorMessage(strings.EMAIL),
        });
        this.emailFocus();
        error = false;
      }
    }
    if (_.isEmpty(fullName)) {
      this.setState({
        fullNameError: strings.FULL_NAME_IS_REQ,
        //util.isRequiredErrorMessage(strings.FULL_NAME),
      });
      this.fullNameFocus();
      error = false;
    }

    // driverAvatar
    if (_.isEmpty(driverAvatar)) {
      this.setState({
        driverAvatarError: strings.IMAGE_IS_REQ,
        //util.isRequiredErrorMessage(strings.IMAGE),
      });
      error = false;
    }

    // vehicle
    if (_.isEmpty(vehicle)) {
      this.setState({
        vehicleError: strings.VEHICLE_IS_REQ,
        //util.isRequiredErrorMessage(strings.VEHICLE),
      });
      error = false;
    }
    return error;
  }

  fullNameFocus = () => {
    this.fullNameRef.focus();
  };

  emailFocus = () => {
    this.emailRef.focus();
  };

  mobileNoFocus = () => {
    // this.mobileNoRef.focus();
  };

  passwordFocus = () => {
    this.passwordRef.focus();
  };

  retypePwdFocus = () => {
    this.reTypePassRef.focus();
  };

  vehicleNameFocus = () => {
    this.vehicleNameRef.focus();
  };

  numberPlateFocus = () => {
    this.numberPlateRef.focus();
  };

  handleSubmitPress = () => {
    this.setState({
      fullNameError: '',
      emailError: '',
      passwordError: '',
      retypePwdError: '',
      mobileNoError: '',
      vehicleNameError: '',
      numberPlateError: '',
      vehicleError: '',
      driverAvatarError: '',
    });
    if (this.validation()) {
      this.setState({
        isLoader: true,
      });

      const {
        fullName,
        email,
        mobileNo,
        vehicle,
        vehicleName,
        numberPlate,
        password,
        driverAvatar,
      } = this.state;

      const {isOnlineDeliveryGuy} = this.props;

      let payload = [];
      // if online driver
      if (isOnlineDeliveryGuy) {
        payload = {
          name: fullName,
          contact: mobileNo,
          vehicle_id: vehicle.id,
          vehicle_name: vehicleName,
          number_plate: numberPlate,
          is_online: isOnlineDeliveryGuy,
          email: email,
          password: password,
          avatar: driverAvatar,
        };
      } else {
        payload = {
          name: fullName,
          contact: mobileNo,
          vehicle_id: vehicle.id,
          vehicle_name: vehicleName,
          number_plate: numberPlate,
          is_online: isOnlineDeliveryGuy,
          avatar: driverAvatar,
        };
      }

      this.props.addDriverRequest(payload, (status) => {
        this.setState({
          isLoader: false,
        });
        if (status) {
          Actions.pop();
          Actions.riderListing({
            isOnline: isOnlineDeliveryGuy,
            isDeliveryGuyForm: true,
          });
        }
      });
    }
  };

  setValue = (key) => {
    this.setState(key);
  };

  // driver image uploader
  handleImageUpload = async (driverAvatar) => {
    let payload = {
      uri: driverAvatar.path,
      fileType: driverAvatar.mime,
    };

    let req = await helper.uploadImageOnS3(
      payload,
      constains.folderList.DRIVER,
    );

    this.setState({driverAvatar: req});
    this.closeImagePickerModal();
  };

  // close method for image picker
  closeImagePickerModal = () => {
    this.setState({isImagePickerShow: false});
  };

  // open method for image picker
  openImagePickerModal = () => {
    this.setState({isImagePickerShow: true});
  };

  handleSelectVehicle = (vehicle) => {
    this.setState({
      vehicle,
      takeVehicleInfo: true,
    });

    if ([4, 5].includes(vehicle.id)) {
      this.setState({takeVehicleInfo: false});
    }
  };

  render() {
    const {
      mobileNo,
      fullNameError,
      emailError,
      passwordError,
      retypePwdError,
      mobileNoError,
      hideRetypePwd,
      hidePassword,
      vehicle,
      vehicleNameError,
      numberPlateError,
      isLoader,
      vehicleError,
      isImagePickerShow,
      driverAvatar,
      driverAvatarError,
      takeVehicleInfo,
    } = this.state;

    return (
      <DeliveryGuyFormView
        takeVehicleInfo={takeVehicleInfo}
        handleSelectVehicle={this.handleSelectVehicle}
        driverAvatarError={driverAvatarError}
        driverAvatar={driverAvatar}
        handleImageUpload={this.handleImageUpload}
        openImagePickerModal={this.openImagePickerModal}
        closeImagePickerModal={this.closeImagePickerModal}
        vehicleError={vehicleError}
        isLoader={isLoader}
        setValue={this.setValue}
        fullNameError={fullNameError}
        emailError={emailError}
        passwordError={passwordError}
        retypePwdError={retypePwdError}
        mobileNoError={mobileNoError}
        vehicleNameError={vehicleNameError}
        numberPlateError={numberPlateError}
        fullNameRef={(ref) => {
          this.fullNameRef = ref;
        }}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        mobileNoRef={(ref) => {
          this.mobileNoRef = ref;
        }}
        passwordRef={(ref) => {
          this.passwordRef = ref;
        }}
        reTypePassRef={(ref) => {
          this.reTypePassRef = ref;
        }}
        vehicleNameRef={(ref) => {
          this.vehicleNameRef = ref;
        }}
        numberPlateRef={(ref) => {
          this.numberPlateRef = ref;
        }}
        emailFocus={this.emailFocus}
        passwordFocus={this.passwordFocus}
        retypePwdFocus={this.retypePwdFocus}
        mobileNoFocus={this.mobileNoFocus}
        vehicleNameFocus={this.vehicleNameFocus}
        numberPlateFocus={this.numberPlateFocus}
        handleSubmitPress={this.handleSubmitPress}
        hidePassword={hidePassword}
        hideRetypePwd={hideRetypePwd}
        mobileNo={mobileNo}
        vehicle={vehicle}
        isImagePickerShow={isImagePickerShow}
        setPhone={(mobileNo, isValid) => {
          isValid
            ? this.setState(mobileNo)
            : this.setState({mobileNo: 'invalid'});
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  vehicleOptions: general.appSettings.delivery_vehicles,
});

const actions = {
  addDriverRequest,
};

export default connect(mapStateToProps, actions)(DeliveryGuyFormController);
