import React from 'react';
import PropTypes from 'prop-types';
import BackHandlerModelView from './BackHandlerModelView';
import {connect} from 'react-redux';

class BackHandlerModelController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    handleLangSelect: PropTypes.func,
  };
  static defaultProps = {
    modalType: '',
    closeModal: () => {},
    isModalOpen: false,
    handleLangSelect: () => {},
  };

  render() {
    return <BackHandlerModelView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(BackHandlerModelController);
