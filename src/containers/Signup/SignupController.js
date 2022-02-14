import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import util from '../../util';
import {FORGET_OPTION, strings} from '../../constants';
import PropTypes from 'prop-types';
import SignupView from './SignupView';
import {customStatusBar} from '../../services/GeneralHelper';
import {changeLanguageSuccess} from '../../actions/GeneralActions';
import {Actions} from 'react-native-router-flux';
import {userSignupRequest} from '../../actions/UserActions';
import {Keyboard} from 'react-native';

class SignupController extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      password: '',
      retypePwd: '',
      phone: '',
      termsCheckBox: false,
      isLoading: false,
      fullNameError: '',
      passwordError: '',
      emailError: '',
      retypePwdError: '',
      phoneError: '',
      hidePassword: true,
      hideRetypePwd: true,
      termsError: '',
      selectedCountry: {},
      selectedCountryError: '',
      isLangModalVisible: false,
      referralCodeError: '',
      referralCode: '',
      isLangLoading: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
  }

  handleChangeLanguage = (lang) => {
    const {changeLanguageSuccess} = this.props;
    this.setState({isLangLoading: true});

    util.switchLanguage(lang);
    // util.updateLocale(lang);
    changeLanguageSuccess(lang);

    setTimeout(() => {
      this.setState({isLangModalVisible: false, isLangLoading: false});
    }, 200);
  };
  handleLanguageModal = () => {
    this.setState({
      isLangModalVisible: true,
    });
  };

  // get value from field and save into states
  setValue = (key) => {
    this.setState(key);
  };

  //  focus on fields
  fullNameFocus = () => {
    this.fullNameRef.focus();
  };
  referralCodeFocus = () => {
    this.referralCodeRef.focus();
  };
  emailFocus = () => {
    this.emailRef.focus();
  };

  passwordFocus = () => {
    this.passRef.focus();
  };
  retypePwdFocus = () => {
    this.retypePwdRef.focus();
  };

  phoneFocus = () => {
    // this.phoneRef.focus();
  };

  // handle terms checkbox
  handleAcceptTerms = () => {
    this.setState({
      termsCheckBox: !this.state.termsCheckBox,
    });
  };

  // validation all login fields
  validation = () => {
    const {
      fullName,
      email,
      password,
      retypePwd,
      phone,
      termsCheckBox,
      selectedCountry,
    } = this.state;

    let error = true;

    if (!termsCheckBox) {
      this.setState({
        termsError: strings.PLEASE_ACCEPT_OUR_TERMS_AND_CONDITIONS,
      });
      error = false;
    }

    if (_.isEmpty(phone.number)) {
      this.setState({
        phoneError: strings.PHONE_NUM_IS_REQ,

        //util.isRequiredErrorMessage(strings.PHONE),
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

    // if (_.isEmpty(selectedCountry)) {
    //   this.setState({
    //     selectedCountryError: util.isRequiredErrorMessage(
    //       strings.PLEASE_SELECT_A_COUNTRY,
    //     ),
    //   });
    //   error = false;
    // }

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
    } else if (!util.isStrongPassword(password)) {
      this.setState({
        passwordError:
          strings.PASSWORD_CONTAIN_ONE_CAPITAL_LETTER_AND_ONE_NUMBER,
      });
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
    } else if (!util.isEmailValid(email)) {
      this.setState({emailError: strings.EMAIL_IS_NOT_VALID});
      this.emailFocus();
      error = false;
    }

    if (_.isEmpty(fullName)) {
      this.setState({
        fullNameError: strings.USER_ID_IS_REQ,
        //util.isRequiredErrorMessage(strings.USER_ID),
      });
      this.fullNameFocus();
      error = false;
    }

    return error;
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      fullNameError: '',
      passwordError: '',
      emailError: '',
      retypePwdError: '',
      termsError: '',
      phoneError: '',
      selectedCountryError: '',
    });

    // if validation pass
    if (this.validation()) {
      //  start loading
      this.setState({
        isLoading: true,
      });
      // hide keyboard
      Keyboard.dismiss();
      const {
        fullName,
        email,
        password,
        phone,
        referralCode,
        selectedCountry,
      } = this.state;
      const payload = {
        name: fullName,
        password,
        email,
        contact: phone,
        // country_code: selectedCountry.countryCode,
        referral_code: referralCode,
      };
      if (_.isEmpty(referralCode)) {
        delete payload['referral_code'];
      }

      this.props.userSignupRequest(payload, (status) => {
        //  stop loading

        this.setState({
          isLoading: false,
        });
        if (status) {
          Actions.verificationCode({
            fromSignUp: true,
            vendor_id: phone,
            isUserIdEmail: FORGET_OPTION.PH0NE,
            signupUserData: payload,
          });
        }
      });
    }
  };

  render() {
    const {
      fullName,
      password,
      phone,
      fullNameError,
      passwordError,
      phoneError,
      emailError,
      retypePwdError,
      hidePassword,
      hideRetypePwd,
      termsCheckBox,
      termsError,
      isLoading,
      selectedCountry,
      selectedCountryError,
      isLangModalVisible,
      referralCode,
      referralCodeError,
      isLangLoading,
    } = this.state;
    return (
      <SignupView
        {...this.props}
        selectedCountry={selectedCountry}
        selectedCountryError={selectedCountryError}
        phoneFocus
        setValue={this.setValue}
        fullName={fullName}
        password={password}
        phone={phone}
        fullNameError={fullNameError}
        passwordError={passwordError}
        emailError={emailError}
        phoneError={phoneError}
        isLangLoading={isLangLoading}
        handleSubmit={this.handleSubmit}
        hidePassword={hidePassword}
        hideRetypePwd={hideRetypePwd}
        fullNameFocus={this.fullNameFocus}
        emailFocus={this.emailFocus}
        passwordFocus={this.passwordFocus}
        retypePwdFocus={this.retypePwdFocus}
        phoneFocus={this.phoneFocus}
        retypePwdError={retypePwdError}
        handleAcceptTerms={this.handleAcceptTerms}
        termsError={termsError}
        termsCheckBox={termsCheckBox}
        isLoading={isLoading}
        isLangModalVisible={isLangModalVisible}
        handleLanguageModal={this.handleLanguageModal}
        handleChangeLanguage={this.handleChangeLanguage}
        referralCode={referralCode}
        referralCodeError={referralCodeError}
        referralCodeFocus={this.referralCodeFocus}
        fullNameRef={(ref) => {
          this.fullNameRef = ref;
        }}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        passRef={(ref) => {
          this.passRef = ref;
        }}
        retypePwdRef={(ref) => {
          this.retypePwdRef = ref;
        }}
        phoneRef={(ref) => {
          this.phoneRef = ref;
        }}
        referralCodeRef={(ref) => {
          this.referralCodeRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  userSignupRequest,
  changeLanguageSuccess,
};

export default connect(mapStateToProps, actions)(SignupController);
