import React from 'react';
import PropTypes from 'prop-types';
import DateItemView from './DateItemView';
import {connect} from 'react-redux';
import {Fonts, Colors, Metrics} from '../../theme';

class DateItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    date: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    dateTimeStyle: PropTypes.object,
    imageStyle: PropTypes.object,
  };
  static defaultProps = {
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
    dateTimeStyle: {
      paddingHorizontal: Metrics.baseMargin,
      paddingVertical: Metrics.smallMargin,
    },
    imageStyle: {
      marginLeft: Metrics.doubleMediumBaseMargin,
    },
  };

  render() {
    return <DateItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(DateItemController);
