import React from 'react';
import PropTypes from 'prop-types';
import TimerCounterView from './TimerCounterView';
import {connect} from 'react-redux';

class TimerCounterController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {timeLabelColor: PropTypes.string};
  static defaultProps = {timeLabelColor: 'red'};

  render() {
    return <TimerCounterView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(TimerCounterController);
