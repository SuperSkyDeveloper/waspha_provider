import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import QuantityInputView from './QuantityInputView';
import {connect} from 'react-redux';

class QuantityInputController extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }
  static propTypes = {
    itemQuantity: PropTypes.any,
    itemIndex: PropTypes.number,
    fromOrderPlace:PropTypes.bool
  };
  static defaultProps = {
    itemQuantity: '',
    itemIndex: null,
    fromOrderPlace:false
  };

  componentDidMount() {
    const {itemQuantity} = this.props;

    if (itemQuantity) {
      this.setState({quantity: itemQuantity});
    } else {
      this.props.handleChangeQuantity('quantity', 1, this.props.itemIndex);
    }
  }

  handleIncrement = () => {
    const {quantity} = this.state;

    this.setState(
      {
        quantity: quantity + 1,
      },
      () => {
        this.handleChange();
      },
    );
  };

  handleDecrement = () => {
    const {quantity} = this.state;

    if (quantity !== 0) {
      this.setState(
        {
          quantity: this.state.quantity - 1,
        },
        () => {
          this.handleChange();
        },
      );
    }
  };

  // when user increase or decrease quantity this function fire
  handleChange = () => {
    // callback function

    this.props.handleChangeQuantity(
      'quantity',
      this.props.itemIndex,
      this.state.quantity,
    );
  };

  render() {
    const {quantity} = this.state;
    return (
      <QuantityInputView
        {...this.props}
        quantity={quantity}
        handleIncrement={this.handleIncrement}
        handleDecrement={this.handleDecrement}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(QuantityInputController);
