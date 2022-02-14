import React from 'react';
import PropTypes from 'prop-types';
import SearchLocationView from './SearchLocationView';
import {connect} from 'react-redux';

class SearchLocationController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    addressRef: PropTypes.func.isRequired,
    handleSearchLocation: PropTypes.func.isRequired,
    setMapRef: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  render() {
    return <SearchLocationView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SearchLocationController);
