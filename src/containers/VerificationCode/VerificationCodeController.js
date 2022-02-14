import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VerificationCodeView from './VerificationCodeView';
import {connect} from 'react-redux';
import util from '../../util';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {RESEND_CODE_TIMER, strings} from '../../constants';
import {
  changeEmailOrPhoneOTPRequest,
  changeEmailOrPhoneRequest,
  confirmOTPRequest,
  forgotPasswordRequest,
  resendCodeRequest,
  userSignupRequest,
  verifyResetPasswordRequest,
} from '../../actions/UserActions';
import {Keyboard} from 'react-native';
import {alertMessage} from '../../actions/GeneralActions';

class VerificationCodeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otpCode: '',
      otpCodeError: '',
      editModalVisible: false,
      verificationAccount: '',
      verificationAccountError: '',
      isLoading: false,
      editValue: '',
      editValueError: '',
      editValueLoader: false,
      isResendVisable: true,
      timerDuration: RESEND_CODE_TIMER,
      resetCountdownId: Math.random(),
      dataFromProfile: props.profilePayload,
    };
  }
  static propTypes = {
    isForgetPassword: PropTypes.bool,
    fromSignUp: PropTypes.bool,
    vendor_id: PropTypes.any.isRequired,
    isUserIdEmail: PropTypes.string.isRequired,
    signupUserData: PropTypes.object.isRequired,
    fromProfile: PropTypes.bool,
    profilePayload: PropTypes.any,
  };
  static defaultProps = {
    isForgetPassword: false,
    fromSignUp: false,
    fromProfile: false,
  };

  componentDidMount() {
    customStatusBar();

    this.initial();
  }

  // handle intial
  initial = () => {
    const {vendor_id} = this.props;
    // check if user exit then set user data in state
    if (!_.isEmpty(vendor_id)) {
      this.setState({
        verificationAccount: vendor_id,
      });
    }
  };

  setValue = (key) => {
    this.setState(key);
  };
  // validation
  validation = () => {
    const {otpCode, otpCodeError} = this.state;

    if (_.isEmpty(otpCode)) {
      this.setState({
        otpCodeError: strings.CODE_IS_REQ,
        //util.isRequiredErrorMessage(strings.CODE),
      });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    // clear all error
    this.setState({
      otpCodeError: '',
    });
    // if verification pass
    if (this.validation()) {
      // start loading
      this.setState({
        isLoading: true,
      });
      // hide keyboard
      Keyboard.dismiss();

      const {otpCode, verificationAccount, dataFromProfile} = this.state;
      const {vendor_id, changeEmailOrPhoneOTPRequest} = this.props;

      if (this.props.isForgetPassword) {
        const payload = {otp: otpCode, vendor_id};
        this.props.verifyResetPasswordRequest(payload, (status) => {
          //stop loading
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.reset('passwordRecovery', {vendor_id});
          }
        });
      } else if (this.props.fromProfile) {
        const payload = {
          vendor_id: dataFromProfile.vendor_id,
          otp: otpCode,
        };
        changeEmailOrPhoneOTPRequest(payload, (response) => {
          if (response) {
            this.setState({isLoading: false});
            Actions.popTo('profile');
          }
          this.setState({isLoading: false});
        });
      } else {
        const payload = {otp: otpCode, vendor_id: verificationAccount};
        this.props.confirmOTPRequest(payload, (status) => {
          //stop loading
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.reset('applicationForm');
          }
        });
      }
    }
  };

  // validation for edit account
  handleEditAccountValidate = () => {
    let error = true;
    const {editValue} = this.state;

    if (_.isEmpty(editValue.number)) {
      this.setState({
        editValueError: strings.PHONE_NUM_IS_REQ,
        // util.isRequiredErrorMessage(strings.PHONE),
      });
      error = false;
    } else if (!util.isNumber(editValue.number) || !editValue.isNumberValid) {
      this.setState({
        editValueError: strings.ENTER_VALID_NUMBER,
      });
      error = false;
    }
    return error;
  };

  // handle edit done
  handleEditDone = () => {
    // clear error
    this.setState({
      editValueError: '',
    });
    // validation

    if (this.handleEditAccountValidate()) {
      // start loader
      this.setState({
        editValueLoader: true,
      });
      const {editValue} = this.state;
      let temp = _.cloneDeep(this.props.signupUserData);
      temp.contact = editValue;

      const payload = temp;
      this.props.userSignupRequest(payload, (status) => {
        //  stop loading
        this.setState({
          editValueLoader: false,
        });
        if (status) {
          // this.handleResendVisable();

          //  close modal
          this.setState({
            editModalVisible: false,
            verificationAccount: editValue,
            timerDuration: RESEND_CODE_TIMER,
            isLoading: false,
            otpCode: '',
            resetCountdownId: Math.random(),
          });

          // clear code
          this.otpRef.clear();
        }
      });
    }
  };

  // handle reset password
  handleResend = () => {
    const {alertMessage, changeEmailOrPhoneRequest, fromProfile} = this.props;
    const {dataFromProfile} = this.state;
    // start loading
    this.setState({
      isLoading: true,
    });
    // hide keyboard
    Keyboard.dismiss();

    // if user come from forget password flow
    if (this.props.isForgetPassword) {
      const payload = {
        vendor_id: this.props.vendor_id,
      };

      this.props.forgotPasswordRequest(payload, (status) => {
        // stop loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          // disable reset btn
          this.handleResendVisable();

          this.setState({
            timerDuration: RESEND_CODE_TIMER,
          });
          // clear code
          this.otpRef.clear();
          //util.topAlert(strings.CODE_SEND_SUCCESSFULLY);
          alertMessage(strings.CODE_SEND_SUCCESSFULLY);
        }
      });
    } else if (fromProfile) {
      const payload = {
        vendor_id: dataFromProfile.vendor_id,
      };
      changeEmailOrPhoneRequest(payload, (response) => {
        //stop loading
        this.setState({
          isLoading: false,
          otpCode: '',
        });

        if (response.status) {
          console.log('jdjdjdjdj');
          // disable reset btn
          this.handleResendVisable();
          this.setState({
            timerDuration: RESEND_CODE_TIMER,
          });
          // clear code
          this.otpRef.clear();
          //util.topAlert(strings.CODE_SEND_SUCCESSFULLY);
          alertMessage(strings.CODE_SEND_SUCCESSFULLY);
        }
      });
    } else {
      const payload = {
        vendor_id: this.state.verificationAccount,
      };
      this.props.resendCodeRequest(payload, (status) => {
        //stop loading
        this.setState({
          isLoading: false,
          otpCode: '',
        });

        if (status) {
          // disable reset btn
          this.handleResendVisable();
          this.setState({
            timerDuration: RESEND_CODE_TIMER,
          });
          // clear code
          this.otpRef.clear();
          //util.topAlert(strings.CODE_SEND_SUCCESSFULLY);
          alertMessage(strings.CODE_SEND_SUCCESSFULLY);
        }
      });
    }
  };

  // handle isResendVisable

  handleResendVisable = () => {
    this.setState({
      isResendVisable: !this.state.isResendVisable,
    });
  };

  render() {
    const {
      otpCode,
      otpCodeError,
      editModalVisible,
      verificationAccount,
      verificationAccountError,
      isLoading,
      editValueLoader,
      isResendVisable,
      timerDuration,
      resetCountdownId,
      dataFromProfile,
    } = this.state;

    return (
      <VerificationCodeView
        {...this.props}
        timerDuration={timerDuration}
        isResendVisable={isResendVisable}
        editValueLoader={editValueLoader}
        resetCountdownId={resetCountdownId}
        dataFromProfile={dataFromProfile}
        verificationAccount={verificationAccount}
        verificationAccountError={verificationAccountError}
        otpCode={otpCode}
        otpCodeError={otpCodeError}
        editModalVisible={editModalVisible}
        isLoading={isLoading}
        handleResendVisable={this.handleResendVisable}
        handleEditDone={this.handleEditDone}
        handleSubmit={this.handleSubmit}
        setValue={(data) => this.setValue(data)}
        handleResend={this.handleResend}
        otpRef={(ref) => {
          this.otpRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  userData: user.data,
});

const actions = {
  confirmOTPRequest,
  resendCodeRequest,
  forgotPasswordRequest,
  verifyResetPasswordRequest,
  userSignupRequest,
  alertMessage,
  changeEmailOrPhoneOTPRequest,
  changeEmailOrPhoneRequest,
};

export default connect(mapStateToProps, actions)(VerificationCodeController);
