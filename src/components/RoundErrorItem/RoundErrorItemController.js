import React from 'react';
import PropTypes from 'prop-types';
import RoundErrorItemView from './RoundErrorItemView';
import {connect} from 'react-redux';

class RoundErrorItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    notificationCounter: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  render() {
    return <RoundErrorItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(RoundErrorItemController);
