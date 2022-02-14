import React from 'react';
import PropTypes from 'prop-types';
import DaysListItemView from './DaysListItemView';
import {connect} from 'react-redux';

class DaysListItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    currencyCode: PropTypes.string.isRequired,
  };
  static defaultProps = {
    notificationCounter: '',
  };

  render() {
    return <DaysListItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(DaysListItemController);
