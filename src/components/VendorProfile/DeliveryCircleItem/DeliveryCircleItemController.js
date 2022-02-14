import React from 'react';
import PropTypes from 'prop-types';
import DeliveryCircleItemView from './DeliveryCircleItemView';
import {connect} from 'react-redux';

class DeliveryCircleItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    isDelivery: PropTypes.bool,
    isPickUp: PropTypes.bool,
    type: PropTypes.string,
  };
  static defaultProps = {
    onChange: () => {},
    isDelivery: false,
    isPickUp: false,
    type: '',
  };

  render() {
    return <DeliveryCircleItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(DeliveryCircleItemController);
