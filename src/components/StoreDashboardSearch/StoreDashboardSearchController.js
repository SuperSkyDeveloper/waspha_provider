import React from 'react';
import PropTypes from 'prop-types';
import StoreDashboardSearchView from './StoreDashboardSearchView';
import {connect} from 'react-redux';

class StoreDashboardSearchController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    onSearchText: PropTypes.func,
    searchText: PropTypes.string,
    showFilter: PropTypes.bool,
    isLoading: PropTypes.bool,
    setValue: PropTypes.func,
    onSearchClear: PropTypes.func,
    isSearchCleanBtn: PropTypes.bool,
    style: PropTypes.object,
    onInputPress: PropTypes.func,
    fromArabicForm: PropTypes.bool,
  };
  static defaultProps = {
    onInputPress: null,
    onSearchText: () => {},
    searchText: '',
    showFilter: false,
    setValue: () => {},
    isLoading: false,
    onSearchClear: () => {},
    isSearchCleanBtn: false,
    style: {},
    fromArabicForm: false,
  };
  componentDidMount() {
    this.searchInputRefFocus();
  }

  //  focus on fields
  searchInputRefFocus = () => {
    this.searchInputRef.focus();
  };

  render() {
    return (
      <StoreDashboardSearchView
        {...this.props}
        searchInputRef={(ref) => {
          this.searchInputRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(StoreDashboardSearchController);
