import React from 'react';
import {Platform, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';
import OrderBoxView from './OrderBoxView';
import {connect} from 'react-redux';
import {Metrics} from '../../../theme';

class OrderBoxController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    spaceBetween: PropTypes.number,
    action: PropTypes.func,
    fromProposalCreation: PropTypes.bool,
    active: PropTypes.bool,
    isDeliveryMode: PropTypes.bool,
    isDisabled: PropTypes.bool,
    handleProposalCreation: PropTypes.func,
    itemKey: PropTypes.string,
    changeDeliveryMode: PropTypes.bool,
  };
  static defaultProps = {
    spaceBetween: Metrics.baseMargin,
    fromProposalCreation: false,
    active: false,
    isDeliveryMode: false,
    isDisabled: false,
    action: () => {},
    handleProposalCreation: () => {},
    changeDeliveryMode: false,
    itemKey: '',
  };

  onPress = (key) => {
    const {item, fromProposalCreation} = this.props;

    if (fromProposalCreation) {
      this.props.handleProposalCreation(key);
    } else {
      if (item.action) {
        item.action();
      }
    }
  };

  render() {
    return <OrderBoxView onPress={this.onPress} {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(OrderBoxController);
