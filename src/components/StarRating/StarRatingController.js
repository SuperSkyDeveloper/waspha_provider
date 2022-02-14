import React from 'react';
import PropTypes from 'prop-types';
import StarRatingView from './StarRatingView';
import {connect} from 'react-redux';

class StarRatingController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    initialRating: PropTypes.number.isRequired,
    readonly: PropTypes.bool.isRequired,
    imageSize: PropTypes.number.isRequired,
    onChangeRating: PropTypes.func,
  };
  static defaultProps = {
    onChangeRating: () => {},
  };

  render() {
    return <StarRatingView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(StarRatingController);
