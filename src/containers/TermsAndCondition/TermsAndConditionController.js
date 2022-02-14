import React from 'react';
import PropTypes from 'prop-types';
import TermsAndConditionView from './TermsAndConditionView';
import {connect} from 'react-redux';
import {getTermsAndConditionsRequest} from '../../actions/GeneralActions';

class TermsAndConditionController extends React.Component {
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
    this.props.getTermsAndConditionsRequest(() => {
      this.setState({loading: false});
    });
  };
  render() {
    const {loading} = this.state;
    return <TermsAndConditionView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  termsAndCondition: general.termsAndCondition,
});

const actions = {getTermsAndConditionsRequest};

export default connect(mapStateToProps, actions)(TermsAndConditionController);
