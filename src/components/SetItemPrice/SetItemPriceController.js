import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SetItemPriceView from './SetItemPriceView';
import {connect} from 'react-redux';

class SetItemPriceController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.any.isRequired,
    onChangeField: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    isChangeMode: PropTypes.bool,
  };

  componentDidMount() {}

  static defaultProps = {
    isChangeMode: false,
  };

  priceFocus = () => {
    this.priceRef.focus();
  };
  taxFocus = () => {
    this.taxRef.focus();
  };

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    const {} = this.state;
    return (
      <SetItemPriceView
        priceFocus={this.priceFocus}
        taxFocus={this.taxFocus}
        priceRef={(ref) => {
          this.priceRef = ref;
        }}
        taxRef={(ref) => {
          this.taxRef = ref;
        }}
        setValue={(data) => this.setValue(data)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SetItemPriceController);
