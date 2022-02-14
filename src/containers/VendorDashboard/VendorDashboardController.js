import React from 'react';
import PropTypes from 'prop-types';
import VendorDashboardView from './VendorDashboardView';
import {connect} from 'react-redux';

import {
  storeDashboardRequest,
  vendorStoreEarningRequest,
} from '../../actions/VendorStoreAction';
import util from '../../util';
class VendorDashboardController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      filterValue: util.EARNING_FILTER()[0],
      showFilterOptions: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    this.setState({
      isLoading: true,
    });
    const payload = {filter: this.state.filterValue.slug};
    this.props.storeDashboardRequest(payload, () => {
      this.setState({
        isLoading: false,
      });
    });
  };

  // handle filter data
  handleFilterPress = (val) => {
    this.setState({filterValue: val}, () => {
      this.initial();
      return this.refRBSheet.close();
    });
  };

  handleEarningFilterOpt = (state = '') => {
    if (state === 'show') {
      return this.refRBSheet.open();
    }
    return this.refRBSheet.close();
  };

  render() {
    const {isLoading, filterValue, showFilterOptions} = this.state;
    return (
      <VendorDashboardView
        {...this.props}
        refRBSheet={(ref) => {
          this.refRBSheet = ref;
        }}
        isLoading={isLoading}
        filterValue={filterValue}
        handleFilterPress={this.handleFilterPress}
        handleEarningFilterOpt={this.handleEarningFilterOpt}
      />
    );
  }
}

const mapStateToProps = ({vendorStore, user}) => ({
  storeDashboard: vendorStore.storeDashboard,
  currencyCode: user.data.currency_code,
});

const actions = {
  storeDashboardRequest,
};

export default connect(mapStateToProps, actions)(VendorDashboardController);
