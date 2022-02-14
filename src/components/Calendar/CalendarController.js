import React from 'react';
import PropTypes from 'prop-types';
import CalendarView from './CalendarView';
import {connect} from 'react-redux';

class CalendarController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    setValue: PropTypes.func,
    getValue: PropTypes.func,
    isDateTimePicker: PropTypes.bool,
  };
  static defaultProps = {
    setValue: () => {},
    isDateTimePicker: false,
  };

  hideDatePicker = () => {
    this.props.setValue({isDateTimePicker: false});
  };

  handleConfirm = (date) => {
    this.hideDatePicker();

    this.props.getValue({eta: date});
  };

  render() {
    return (
      <CalendarView
        handleConfirm={this.handleConfirm}
        hideDatePicker={this.hideDatePicker}
        isDateTimePicker={this.props.isDateTimePicker}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CalendarController);
