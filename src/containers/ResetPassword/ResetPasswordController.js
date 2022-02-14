import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ResetPasswordView from './ResetPasswordView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {changePasswordRequest} from '../../actions/UserActions';
import {Keyboard} from 'react-native';
import {alertMessage} from '../../actions/GeneralActions';

class ResetPasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPassword: '',
      currentPasswordError: '',
      newPassword: '',
      newPasswordError: '',
      retypePassword: '',
      retypePasswordError: '',
      hideCurrentPassword: true,
      hideNewPassword: true,
      isLoading: false,
      hideRetypePassword: true,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  validation = () => {
    const {currentPassword, newPassword, retypePassword} = this.state;
    let error = true;

    if (_.isEmpty(retypePassword)) {
      this.setState({
        retypePasswordError: strings.RETYPE_PASSWORD_IS_REQ,
        //  util.isRequiredErrorMessage(
        //   strings.RETYPE_PASSWORD,
        // ),
      });
      this.retypePasswordFocus();
      error = false;
    } else if (retypePassword !== newPassword) {
      this.setState({retypePasswordError: strings.PASSWORD_NOT_MATCH});
      this.retypePasswordFocus();
      error = false;
    }

    if (_.isEmpty(newPassword)) {
      this.setState({
        newPasswordError: strings.NEW_PASSWORD_IS_REQ,
        //util.isRequiredErrorMessage(strings.NEW_PASSWORD),
      });
      this.newPasswordFocus();
      error = false;
    } else if (!util.isPasswordValid(newPassword)) {
      this.setState({newPasswordError: strings.PASSWORD_LENGTH});
      this.newPasswordFocus();
      error = false;
    } else if (!util.isStrongPassword(newPassword)) {
      this.setState({
        newPasswordError:
          strings.PASSWORD_CONTAIN_ONE_CAPITAL_LETTER_AND_ONE_NUMBER,
      });
      this.newPasswordFocus();
      error = false;
    }

    if (_.isEmpty(currentPassword)) {
      this.setState({
        currentPasswordError: strings.PASSWORD_IS_REQ,

        // util.isRequiredErrorMessage(strings.PASSWORD),
      });
      this.currentPasswordFocus();
      error = false;
    }

    return error;
  };

  currentPasswordFocus = () => {
    this.currentPasswordRef.focus();
  };

  newPasswordFocus = () => {
    this.newPasswordRef.focus();
  };

  retypePasswordFocus = () => {
    this.retypePasswordRef.focus();
  };

  setValue = (key) => {
    this.setState(key);
  };

  handleSubmit = () => {
    const {alertMessage} = this.props;
    this.setState({
      currentPasswordError: '',
      newPasswordError: '',
      retypePasswordError: '',
    });

    Keyboard.dismiss();

    if (this.validation()) {
      // start loading
      this.setState({
        isLoading: true,
      });
      const {currentPassword, newPassword} = this.state;
      const payload = {password: newPassword, old_password: currentPassword};
      this.props.changePasswordRequest(payload, (status) => {
        // util.topAlert(strings.PASSWORD_RESET_SUCCESSFULLY);
        alertMessage(strings.PASSWORD_RESET_SUCCESSFULLY);
        // false loading
        this.setState({
          isLoading: false,
        });

        if (status) {
          Actions.pop();
        }
      });
    }
  };

  render() {
    const {
      currentPassword,
      currentPasswordError,
      newPassword,
      newPasswordError,
      retypePassword,
      retypePasswordError,
      hideCurrentPassword,
      hideNewPassword,
      hideRetypePassword,
      isLoading,
    } = this.state;
    return (
      <ResetPasswordView
        isLoading={isLoading}
        currentPassword={currentPassword}
        currentPasswordError={currentPasswordError}
        newPassword={newPassword}
        newPasswordError={newPasswordError}
        retypePassword={retypePassword}
        hideCurrentPassword={hideCurrentPassword}
        hideNewPassword={hideNewPassword}
        hideRetypePassword={hideRetypePassword}
        retypePasswordError={retypePasswordError}
        handleSubmit={this.handleSubmit}
        setValue={(data) => this.setValue(data)}
        currentPasswordFocus={this.currentPasswordFocus}
        newPasswordFocus={this.newPasswordFocus}
        retypePasswordFocus={this.retypePasswordFocus}
        currentPasswordRef={(ref) => {
          this.currentPasswordRef = ref;
        }}
        newPasswordRef={(ref) => {
          this.newPasswordRef = ref;
        }}
        retypePasswordRef={(ref) => {
          this.retypePasswordRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  changePasswordRequest,
  alertMessage,
};

export default connect(mapStateToProps, actions)(ResetPasswordController);
