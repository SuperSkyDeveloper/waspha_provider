import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ChangeEmailAndNumberView from './ChangeEmailAndNumberView';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import {Keyboard} from 'react-native';
import {changeEmailOrPhoneRequest} from '../../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

class ChangeEmailAndNumberController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: props.data,
      phoneError: '',
      emailError: '',
      phoneNumObj: {},
    };
  }
  static propTypes = {
    isEmail: PropTypes.bool,
    isPhone: PropTypes.bool,
    data: PropTypes.string,
  };
  static defaultProps = {
    isEmail: false,
    isPhone: false,
    data: '',
  };

  validation = () => {
    let valid = true;
    const {phone, email} = this.state;
    const {isPhone, isEmail} = this.props;
    if (isPhone) {
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
    }
    if (isEmail) {
      if (_.isEmpty(email)) {
        this.setState({
          emailError: strings.PHONE_NUM_IS_REQ,
          //util.isRequiredErrorMessage(strings.CONTACT_NO),
        });
        valid = false;
      }
    }
    return valid;
  };

  handleSubmit = () => {
    // clear all error msg

    const {changeEmailOrPhoneRequest, isEmail} = this.props;
    const {email, phone} = this.state;

    this.setState({
      phoneError: '',
      emailError: '',
    });

    // if validation pass
    if (this.validation()) {
      Keyboard.dismiss();
      let payload = {};

      if (isEmail) {
        payload['vendor_id'] = email;
      } else {
        payload['vendor_id'] = phone;
      }

      this.setState({loading: true});

      changeEmailOrPhoneRequest(payload, (response) => {
        if (response) {
          Actions.verificationCode({
            incomingData: response.data,
            profilePayload: payload,
            fromProfile: true,
          });
        }
        this.setState({loading: false});
      });
    }
  };

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    const {email, phoneError, emailError} = this.state;

    return (
      <ChangeEmailAndNumberView
        email={email}
        phoneError={phoneError}
        emailError={emailError}
        setValue={this.setValue}
        handleSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {changeEmailOrPhoneRequest};

export default connect(
  mapStateToProps,
  actions,
)(ChangeEmailAndNumberController);
