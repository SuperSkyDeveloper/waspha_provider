import React from 'react';
import PropTypes from 'prop-types';
import RateMyServiceHeaderView from './RateMyServiceHeaderView';
import {connect} from 'react-redux';

class RateMyServiceHeaderController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <RateMyServiceHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(RateMyServiceHeaderController);
