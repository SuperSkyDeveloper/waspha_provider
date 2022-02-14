import React from 'react';
import PropTypes from 'prop-types';
import SignWithSectionView from './SignWithSectionView';
import {socialLoginRequest} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class SignWithSectionController extends React.Component {
  constructor() {
    super();
    this.state = {
      socialLoginLoading: false,
    };
  }
  static propTypes = {
    signup: PropTypes.bool,
    login: PropTypes.bool,
  };
  static defaultProps = {
    signup: false,
    login: false,
  };

  socialLoginRequest = (payload) => {
    this.setState({socialLoginLoading: true});
    this.props.socialLoginRequest(payload, (status) => {
      this.setState({socialLoginLoading: false});
      if (status) {
        if (this.props.user.is_approved) {
          return Actions.reset('drawerMenu');
        }

        return Actions.reset('applicationForm');
      }
    });
  };

  socialLoginError = (error = null) => {
    let errorText = '';
    if (error === null) {
      this.setState({socialLoginLoading: false});
      return true;
    } else if (error && _.isString(error)) {
      errorText = error;
    } else {
      errorText = strings.SOMETHING_WENT_WRONG;
    }
    this.setState({socialLoginLoading: false});
    util.topAlert(errorText, 'error');
  };

  render() {
    return (
      <SignWithSectionView
        {...this.props}
        socialLoginLoading={this.state.socialLoginLoading}
        socialLoginRequest={this.socialLoginRequest}
        socialLoginError={this.socialLoginError}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {socialLoginRequest};

export default connect(mapStateToProps, actions)(SignWithSectionController);
