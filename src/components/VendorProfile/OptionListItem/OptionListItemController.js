import React from 'react';
import PropTypes from 'prop-types';
import OptionListItemView from './OptionListItemView';
import {connect} from 'react-redux';

class OptionListItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
  };
  static defaultProps = {
    notificationCounter: '',
  };

  render() {
    return <OptionListItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(OptionListItemController);
