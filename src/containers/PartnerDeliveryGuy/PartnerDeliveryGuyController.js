import React from 'react';
import PropTypes from 'prop-types';
import PartnerDeliveryGuyView from './PartnerDeliveryGuyView';
import {connect} from 'react-redux';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings} from '../../constants';

class PartnerDeliveryGuyController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <PartnerDeliveryGuyView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(PartnerDeliveryGuyController);
