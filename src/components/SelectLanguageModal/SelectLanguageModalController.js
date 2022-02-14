import React from 'react';
import PropTypes from 'prop-types';
import SelectLanguageModalView from './SelectLanguageModalView';
import {connect} from 'react-redux';

class SelectLanguageModalController extends React.Component {
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
    return <SelectLanguageModalView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SelectLanguageModalController);
