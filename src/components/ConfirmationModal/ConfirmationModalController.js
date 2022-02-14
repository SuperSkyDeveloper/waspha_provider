import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationModalView from './ConfirmationModalView';
import {connect} from 'react-redux';

class ConfirmationModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    successBtnPress: PropTypes.func.isRequired,
    successBtnTitle: PropTypes.string.isRequired,
    negativeBtnPress: PropTypes.func.isRequired,
    negativeBtnTitle: PropTypes.string.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    successBtnLoading: PropTypes.bool,
  };
  static defaultProps = {
    successBtnLoading: false,
  };

  render() {
    return <ConfirmationModalView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ConfirmationModalController);
