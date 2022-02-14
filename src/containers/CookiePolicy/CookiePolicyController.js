import React from 'react';
import PropTypes from 'prop-types';
import CookiePolicyView from './CookiePolicyView';
import {connect} from 'react-redux';
import {getCookiePolicyRequest} from '../../actions/GeneralActions';

class CookiePolicyController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getCookiePolicyRequest} = this.props;

    this.setState({loading: true});
    getCookiePolicyRequest((response) => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading} = this.state;
    return <CookiePolicyView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  cookiePolicy: general.cookiePolicy,
});

const actions = {getCookiePolicyRequest};

export default connect(mapStateToProps, actions)(CookiePolicyController);
