import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import TextMessageView from './TextMessageView';

class TextMessageController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isMyMsg: PropTypes.bool,
    item: PropTypes.object,
  };
  static defaultProps = {
    isMyMsg: false,
    item: {},
  };

  render() {
    
    return <TextMessageView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(TextMessageController);
