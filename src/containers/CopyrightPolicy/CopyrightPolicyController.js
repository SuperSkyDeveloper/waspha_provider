import React from 'react';
import PropTypes from 'prop-types';
import CopyrightPolicyView from './CopyrightPolicyView';
import {connect} from 'react-redux';
import {getCopyRightPolicyRequest} from '../../actions/GeneralActions';

class CopyrightPolicyController extends React.Component {
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
    const {getCopyRightPolicyRequest} = this.props;

    this.setState({loading: true});
    getCopyRightPolicyRequest((response) => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading} = this.state;
    return <CopyrightPolicyView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  copyRight: general.copyRight,
});

const actions = {getCopyRightPolicyRequest};

export default connect(mapStateToProps, actions)(CopyrightPolicyController);
