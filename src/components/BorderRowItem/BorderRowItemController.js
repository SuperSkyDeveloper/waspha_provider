import React from 'react';
import PropTypes from 'prop-types';
import BorderRowItemView from './BorderRowItemView';
import {connect} from 'react-redux';

class BorderRowItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    // isFourthItem: PropTypes.bool,
    isLastItem: PropTypes.bool,
    isForDebit: PropTypes.bool,
  };
  static defaultProps = {
    // isFourthItem: false,
    isLastItem: false,
    isForDebit: false,
  };

  render() {
    return <BorderRowItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};
 
export default connect(mapStateToProps, actions)(BorderRowItemController);
