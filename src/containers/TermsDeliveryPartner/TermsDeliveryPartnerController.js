import React from 'react';
import PropTypes from 'prop-types';
import TermsDeliveryPartnerView from './TermsDeliveryPartnerView';
import {connect} from 'react-redux';
import {getTermsDeliveryPartnerRequest} from '../../actions/GeneralActions';

class TermsDeliveryPartnerController extends React.Component {
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
    const {getTermsDeliveryPartnerRequest} = this.props;

    this.setState({loading: true});
    getTermsDeliveryPartnerRequest((response) => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading} = this.state;
    return <TermsDeliveryPartnerView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  termsDelveryPartner: general.termsDelveryPartner,
});

const actions = {getTermsDeliveryPartnerRequest};

export default connect(
  mapStateToProps,
  actions,
)(TermsDeliveryPartnerController);
