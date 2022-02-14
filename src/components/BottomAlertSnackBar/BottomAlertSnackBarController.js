import React from 'react';
import PropTypes from 'prop-types';
import BottomAlertSnackBarView from './BottomAlertSnackBarView';
import {connect} from 'react-redux';
import { alertMessage } from '../../actions/GeneralActions';

class BottomAlertSnackBarController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

clearMessage=()=>{
  const{alertMessage}=this.props
  setTimeout(()=>{
    alertMessage('')

  }, 4000); 
}

  render() {
    this.clearMessage()
    return <BottomAlertSnackBarView {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  language: general.language,
  message:general.alertMessage

});

const actions = {
  alertMessage
};

export default connect(
  mapStateToProps,
  actions,
)(BottomAlertSnackBarController);
