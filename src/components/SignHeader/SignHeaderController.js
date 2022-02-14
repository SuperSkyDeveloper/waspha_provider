import React from 'react';
import PropTypes from 'prop-types';
import SignHeaderView from './SignHeaderView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class SignHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    mainHeading: PropTypes.string,
    subHeading: PropTypes.string,
    leftBtnPress: PropTypes.func,
    showMask: PropTypes.bool,
    isForEdit: PropTypes.bool,
  };
  static defaultProps = {
    title: '',
    subTitle: '',
    mainHeading: '',
    subHeading: '',
    leftBtnPress: Actions.pop,
    isForEdit: false,
  };

  render() {
    return (
      <SignHeaderView
        showMask={this.props.showMask}
        leftBtnPress
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SignHeaderController);
