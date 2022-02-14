import React from 'react';
import PropTypes from 'prop-types';
import ChartWhiteView from './ChartWhiteView';
import {connect} from 'react-redux';

class ChartWhiteController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.any.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ChartWhiteView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ChartWhiteController);
