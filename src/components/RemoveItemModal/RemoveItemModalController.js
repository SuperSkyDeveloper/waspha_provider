import React from 'react';
import PropTypes from 'prop-types';
import RemoveItemModalView from './RemoveItemModalView';
import {connect} from 'react-redux';
import {strings} from '../../constants';

class RemoveItemModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    btnOneText: PropTypes.string,
    btnTwoText: PropTypes.string,
    modalType: PropTypes.string,
    showOneBtn: PropTypes.bool,
    btnPositiveFunc: PropTypes.func,
    btnNegativeFunc: PropTypes.func,
    backPressEnable: PropTypes.bool,
  };
  static defaultProps = {
    isModalOpen: false,
    closeModal: () => {},
    title: strings.REMOVE_ITEM,
    btnOneText: strings.YES,
    btnTwoText: strings.NO,
    btnPositiveFunc: () => {},
    btnNegativeFunc: () => {},
    modalType: 'removeItemModal',
    showOneBtn: false,
    backPressEnable: true,
  };

  render() {
    return <RemoveItemModalView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(RemoveItemModalController);
