import React from 'react';
import PropTypes from 'prop-types';
import PrivacyPolicyView from './PrivacyPolicyView';
import {connect} from 'react-redux';
import {getPrivacyPolicyRequest} from '../../actions/GeneralActions';

class PrivacyPolicyController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    this.props.getPrivacyPolicyRequest((status) => {
      this.setState({loading: false});
      if (status) {
      }
    });
  };
  render() {
    const {loading} = this.state;
    return <PrivacyPolicyView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  privacyPolicy: general.privacyPolicy,
});

const actions = {getPrivacyPolicyRequest};

export default connect(mapStateToProps, actions)(PrivacyPolicyController);
