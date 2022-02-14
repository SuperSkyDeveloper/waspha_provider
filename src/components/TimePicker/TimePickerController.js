import React from 'react';
import PropTypes from 'prop-types';
import TimePickerView from './TimePickerView';
import {connect} from 'react-redux';
import {ISOToFormat, toISOString} from '../../helpers/generalHelper';
import {TIME_FORMAT, TIME_FORMAT3} from '../../constants';

class TimePickerController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    visible: PropTypes.bool,
    onSelect: PropTypes.func,
    data: PropTypes.object,
    onClose: PropTypes.func,
  };
  static defaultProps = {
    visible: false,
    onSelect: () => {},
    onClose: () => {},
    data: {},
  };

  handleOnPress = (time) => {
    const {dayIndex, shiftIndex, timeModalFor} = this.props.data;
    //  first day index
    //  second shift index
    //  third time

    let key = {[timeModalFor]: toISOString(time, TIME_FORMAT3)};
    this.props.onSelect(dayIndex, shiftIndex, key);
  };

  render() {
    return (
      <TimePickerView {...this.props} handleOnPress={this.handleOnPress} />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(TimePickerController);
