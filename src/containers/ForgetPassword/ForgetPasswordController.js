import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ForgetPasswordView from './ForgetPasswordView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings, FORGET_OPTION} from '../../constants';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {forgotPasswordRequest} from '../../actions/UserActions';
import {Keyboard} from 'react-native';

class ForgetPasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      phone: '',
      emailError: '',
      phoneError: '',
      selectForgetOpt: FORGET_OPTION.EMAIL,
      vendorId: '',
      isLoading: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
  }

  setValue = (key) => {
    this.setState(key);
  };

  emailFocus = () => {
    this.emailRef.focus();
  };
  phoneFocus = () => {
    // this.phoneRef.focus();
  };

  // validation all login fields
  validation = () => {
    const {email, phone, emailError, phoneError, selectForgetOpt} = this.state;
    let error = true;
    if (selectForgetOpt === FORGET_OPTION.EMAIL) {
      if (_.isEmpty(email)) {
        this.setState({
          emailError: strings.EMAIL_IS_REQ,
          // util.isRequiredErrorMessage(strings.EMAIL)
        });
        this.emailFocus();
        error = false;
      } else if (!util.isEmailValid(email)) {
        this.setState({emailError: strings.EMAIL_IS_NOT_VALID});
        this.emailFocus();
        error = false;
      }
      return error;
    }

    if (selectForgetOpt === FORGET_OPTION.PH0NE) {
      if (_.isEmpty(phone.number)) {
        this.setState({
          phoneError: strings.PHONE_NUM_IS_REQ,
          //util.isRequiredErrorMessage(strings.PHONE),
        });
        // this.phoneFocus();
        return false;
      } else if (!util.isNumber(phone.number) || !phone.isNumberValid) {
        this.setState({
          phoneError: strings.ENTER_VALID_NUMBER,
        });
        // this.phoneFocus();
        return false;
      }
      return true;
    }
  };

  handleSubmit = () => {
    const {email, phone} = this.state;
    // clear all error msg
    this.setState({
      emailError: '',
      phoneError: '',
    });

    // if validation pass
    if (this.validation()) {
      // hide keyboard
      Keyboard.dismiss();
      // if user forget password with email or phone
      if (this.state.selectForgetOpt === FORGET_OPTION.EMAIL) {
        this.setState({
          vendorId: email,
        });
      } else {
        this.setState({
          vendorId: phone,
        });
      }

      // start loading
      this.setState({
        isLoading: true,
      });

      //reason for setTimeout, vendorId setstate take time
      setTimeout(() => {
        const payload = {
          vendor_id: this.state.vendorId,
        };

        this.props.forgotPasswordRequest(payload, (status) => {
          // stop loading
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.verificationCode({
              isForgetPassword: true,
              vendor_id: this.state.vendorId,
              isUserIdEmail: this.state.selectForgetOpt,
            });
          }
        });
      }, 10);
    }
  };

  render() {
    const {
      otpCode,
      emailError,
      selectForgetOpt,
      email,
      phone,
      phoneError,
      isLoading,
      vendorId,
    } = this.state;

    return (
      <ForgetPasswordView
        {...this.props}
        otpCode={otpCode}
        handleSubmit={this.handleSubmit}
        setValue={this.setValue}
        email={email}
        phone={phone}
        phoneFocus
        emailError={emailError}
        phoneError={phoneError}
        selectForgetOpt={selectForgetOpt}
        isLoading={isLoading}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        phoneRef={(ref) => {
          this.phoneRef = ref;
        }}
        phoneFocus
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  forgotPasswordRequest,
};

export default connect(mapStateToProps, actions)(ForgetPasswordController);
