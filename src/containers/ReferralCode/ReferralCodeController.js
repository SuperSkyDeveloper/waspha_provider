import React from 'react';
import PropTypes from 'prop-types';
import ReferralCodeView from './ReferralCodeView';
import {connect} from 'react-redux';
import {Platform} from 'react-native';
import util from '../../util';
class ReferralCodeController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  onShare = () => {
    let android =
      'https://play.google.com/store/apps/details?id=com.wasphaprovider';
    let Ios = 'https://apps.apple.com/pk/app/waspha-provider-app/id1549656319';
    let referealCode = 'ABC1234';
    const {referral_code} = this.props.user;
    let message =
      'Android : ' +
      android +
      '\n\nIos : ' +
      Ios +
      '\n\nreferral Code : ' +
      referral_code;
    util.shareApp(message);
  };

  render() {
    const {referral_code} = this.props.user;

    return (
      <ReferralCodeView
        {...this.props}
        onShare={this.onShare}
        referral_code={referral_code}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(ReferralCodeController);
