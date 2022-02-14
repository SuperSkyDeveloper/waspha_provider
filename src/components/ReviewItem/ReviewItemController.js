import React from 'react';
import PropTypes from 'prop-types';
import ReviewItemView from './ReviewItemView';
import {connect} from 'react-redux';

class ReviewItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ReviewItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ReviewItemController);
