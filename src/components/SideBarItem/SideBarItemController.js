import React from 'react';
import PropTypes from 'prop-types';
import SideBarItemView from './SideBarItemView';
import {connect} from 'react-redux';

class SideBarItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    togglePress: PropTypes.func,
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
  };
  static defaultProps = {togglePress: () => {}};

  render() {
    return <SideBarItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(SideBarItemController);
