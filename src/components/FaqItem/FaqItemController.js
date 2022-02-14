import React from 'react';
import PropTypes from 'prop-types';
import FaqItemView from './FaqItemView';
import {connect} from 'react-redux';

class FaqItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    item: PropTypes.object,
    toggler: PropTypes.object.isRequired,
    active: PropTypes.bool,
  };
  static defaultProps = {
    item: {},
    active: false,
  };

  render() {
    return <FaqItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(FaqItemController);
