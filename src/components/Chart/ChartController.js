import React from 'react';
import PropTypes from 'prop-types';
import ChartView from './ChartView';
import {connect} from 'react-redux';

class ChartController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ChartView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ChartController);
