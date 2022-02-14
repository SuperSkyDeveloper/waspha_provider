import React from 'react';
import {Keyboard} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';
import PropTypes from 'prop-types';
import LoginView from './LoginView';
import {customStatusBar} from '../../services/GeneralHelper';
import {changeLanguageSuccess} from '../../actions/GeneralActions';
import {Actions} from 'react-native-router-flux';
import {userSigninRequest, rememberMe} from '../../actions/UserActions';
// import {iniNotifications} from '../../helpers/firebaseHelper';

class LoginController extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      password: '',
      userIdError: '',
      passwordError: '',
      hidePassword: true,
      stayLogged: false,
      isLoading: false,
      isLangModalVisible: false,
    };
  }

  static propTypes = {language: PropTypes.string.isRequired};
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
    this.initial();
  }

  initial = () => {
    // check is user credentials save then fill in field
    const {credentials} = this.props;
    if (!_.isEmpty(credentials)) {
      this.setState({
        userId: credentials.userId,
        password: credentials.password,
        stayLogged: true,
      });
    }
  };

  handleChangeLanguage = (lang) => {
    const {changeLanguageSuccess} = this.props;
    util.switchLanguage(lang);
    // util.updateLocale(lang);

    changeLanguageSuccess(lang);
    this.setState({isLangModalVisible: false});
  };
  handleLanguageModal = () => {
    this.setState({
      isLangModalVisible: true,
    });
  };

  handleShowPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };

  // get value from field and save into states
  setValue = (key) => {
    this.setState(key);
  };

  //  focus on fields
  userIdFocus = () => {
    this.userIdRef.focus();
  };

  passwordFocus = () => {
    this.passRef.focus();
  };

  // then user check on remember me then user credentials in local storge
  handleStayLogged = () => {
    const temp = _.cloneDeep(this.state.stayLogged);
    this.setState({
      stayLogged: !temp,
    });
  };

  // validation all login fields
  validation = () => {
    const {userId, password, userIdError, passwordError} = this.state;
    let error = true;
    if (_.isEmpty(userId)) {
      this.setState({
        userIdError: strings.USER_ID_IS_REQ,
        //util.isRequiredErrorMessage(strings.USER_ID),
      });
      this.userIdFocus();
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

    if (_.isEmpty(userId) && _.isEmpty(password)) {
      this.userIdFocus();
    }

    return error;
  };

  // here i am check if user remember me then save user credentials
  handleRemember = () => {
    const {stayLogged, userId, password} = this.state;
    if (stayLogged) {
      const payload = {
        userId,
        password,
      };
      this.props.rememberMe(payload);
    } else {
      this.props.rememberMe({});
    }
  };

  handleSubmit = () => {
    const {language} = this.props;
    // clear all error msg
    this.setState({
      userIdError: '',
      passwordError: '',
    });

    // if validation pass
    if (this.validation()) {
      const {userId, password} = this.state;

      // here i am check if user remember me then save user credtionl
      this.handleRemember();

      // loading start
      this.setState({
        isLoading: true,
      });
      // hide keyboard
      Keyboard.dismiss();

      const payload = {
        vendor_id: userId,
        password,
        // language,
      };

      this.props.userSigninRequest(payload, (status) => {
        // loading stop
        this.setState({
          isLoading: false,
        });
        if (status) {
          // iniNotifications();
          // if user not approve bya admin then take to user on wainting screen
          if (this.props.user.is_approved) {
            return Actions.reset('drawerMenu');
          } else if (
            !_.isNil(this.props.user.is_form_submitted) &&
            !this.props.user.is_form_submitted
          ) {
            return Actions.reset('applicationForm');
          } else {
            return Actions.replace('waiting');
          }
        }
      });
    }
  };

  render() {
    const {
      userId,
      password,
      userIdError,
      passwordError,
      hidePassword,
      stayLogged,
      isLoading,
      isLangModalVisible,
    } = this.state;

    return (
      <LoginView
        {...this.props}
        setValue={this.setValue}
        userId={userId}
        password={password}
        userIdError={userIdError}
        passwordError={passwordError}
        handleSubmit={this.handleSubmit}
        passwordFocus={this.passwordFocus}
        hidePassword={hidePassword}
        handleShowPassword={this.handleShowPassword}
        stayLogged={stayLogged}
        handleStayLogged={this.handleStayLogged}
        isLoading={isLoading}
        handleLanguageModal={this.handleLanguageModal}
        handleChangeLanguage={this.handleChangeLanguage}
        isLangModalVisible={isLangModalVisible}
        userIdRef={(ref) => {
          this.userIdRef = ref;
        }}
        passRef={(ref) => {
          this.passRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  credentials: user.credentials,
  user: user.data,
  language: general.language,
});

const actions = {
  userSigninRequest,
  rememberMe,
  changeLanguageSuccess,
};

export default connect(mapStateToProps, actions)(LoginController);
