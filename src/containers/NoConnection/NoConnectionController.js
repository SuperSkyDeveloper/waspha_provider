import React from 'react';
import PropTypes from 'prop-types';
import NoConnectionView from './NoConnectionView';
import {connect} from 'react-redux';

class NoConnectionController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <NoConnectionView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(NoConnectionController);
