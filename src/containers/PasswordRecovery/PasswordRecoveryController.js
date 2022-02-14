import React from 'react';
import PropTypes, {string} from 'prop-types';
import _ from 'lodash';
import PasswordRecoveryView from './PasswordRecoveryView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {resetPasswordRequest} from '../../actions/UserActions';

class PasswordRecoveryController extends React.Component {
  constructor() {
    super();
    this.state = {
      otpCode: '',
      password: '',
      retypePwd: '',
      passwordError: '',
      retypePwdError: '',
      hidePassword: true,
      hideRetypePwd: true,
      isLoading: false,
    };
  }
  static propTypes = {
    vendor_id: PropTypes.string.isRequired,
  };
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
  }

  setValue = (key) => {
    this.setState(key);
  };

  passwordFocus = () => {
    this.passRef.focus();
  };
  retypePwdFocus = () => {
    this.retypePwdRef.focus();
  };

  // validation all login fields
  validation = () => {
    const {password, retypePwd, passwordError, retypePwdError} = this.state;

    let error = true;
    if (_.isEmpty(password) && _.isEmpty(retypePwd)) {
      this.setState({
        passwordError: strings.PASSWORD_IS_REQ,
        //util.isRequiredErrorMessage(strings.PASSWORD),
        retypePwdError: strings.RETYPE_PASSWORD_IS_REQ,
        //util.isRequiredErrorMessage(strings.RETYPE_PASSWORD),
      });

      this.passwordFocus();
      return false;
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

    if (_.isEmpty(retypePwd)) {
      this.setState({
        retypePwdError: strings.RETYPE_PASSWORD_IS_REQ,
        // util.isRequiredErrorMessage(strings.RETYPE_PASSWORD),
      });
      this.retypePwdFocus();
      error = false;
    } else if (retypePwd !== password) {
      this.setState({retypePwdError: strings.PASSWORD_NOT_MATCH});
      this.retypePwdFocus();
      error = false;
    }

    return error;
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      passwordError: '',
      retypePwdError: '',
    });
    // if validation pass
    if (this.validation()) {
      // start loading
      this.setState({
        isLoading: true,
      });

      const payload = {
        password: this.state.password,
        vendor_id: this.props.vendor_id,
      };
      this.props.resetPasswordRequest(payload, (status) => {
        // start loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          Actions.reset('login');
        }
      });

      // Actions.reset('nearBy');
      //   Alert.alert(
      //     strings.PASSWORD_RESET,
      //     strings.SUCCESSFULLY,
      //     [
      //       {
      //         text: strings.DONE,
      //         onPress: () => {
      //           Actions.reset('login');
      //         },
      //       },
      //     ],
      //     {cancelable: false},
      //   );
    }
  };

  render() {
    const {
      otpCode,
      passwordError,
      hidePassword,
      password,
      hideRetypePwd,
      retypePwdError,
      isLoading,
    } = this.state;
    return (
      <PasswordRecoveryView
        {...this.props}
        otpCode={otpCode}
        handleSubmit={this.handleSubmit}
        setValue={this.setValue}
        password={password}
        hideRetypePwd={hideRetypePwd}
        hidePassword={hidePassword}
        passwordError={passwordError}
        retypePwdError={retypePwdError}
        isLoading={isLoading}
        passRef={(ref) => {
          this.passRef = ref;
        }}
        retypePwdRef={(ref) => {
          this.retypePwdRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {resetPasswordRequest};

export default connect(mapStateToProps, actions)(PasswordRecoveryController);
