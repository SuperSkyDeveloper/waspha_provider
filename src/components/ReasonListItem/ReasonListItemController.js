import React from 'react';
import PropTypes from 'prop-types';
import ReasonListItemView from './ReasonListItemView';
import {connect} from 'react-redux';

class ReasonListItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ReasonListItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ReasonListItemController);
