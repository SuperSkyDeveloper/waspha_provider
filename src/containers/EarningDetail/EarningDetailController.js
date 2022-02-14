import React from 'react';
import PropTypes from 'prop-types';
import EarningDetailView from './EarningDetailView';
import {connect} from 'react-redux';
import {vendorStoreEarningRequest} from '../../actions/VendorStoreAction';

class EarningDetailController extends React.Component {
  constructor() {
    super();
    this.state = {
      ativeIndex: '',
      isLoading: true,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    this.props.vendorStoreEarningRequest({}, () => {
      this.setState({
        isLoading: false,
      });
    });
  };

  handleAccordinClick = (index) => {
    const {ativeIndex} = this.state;
    if (index === ativeIndex) {
      return this.setState({
        ativeIndex: null,
      });
    }
    this.setState({
      ativeIndex: index,
    });
  };

  render() {
    const {ativeIndex, isLoading} = this.state;
    return (
      <EarningDetailView
        {...this.props}
        isLoading={isLoading}
        ativeIndex={ativeIndex}
        handleAccordinClick={this.handleAccordinClick}
      />
    );
  }
}

const mapStateToProps = ({vendorStore}) => ({
  vendorStoreEarning: vendorStore.vendorStoreEarning,
  storeProfile: vendorStore.storeProfile,
});

const actions = {
  vendorStoreEarningRequest,
};

export default connect(mapStateToProps, actions)(EarningDetailController);
