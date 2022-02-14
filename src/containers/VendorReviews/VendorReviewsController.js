import React from 'react';
import PropTypes from 'prop-types';
import VendorReviewsView from './VendorReviewsView';
import {connect} from 'react-redux';
import {vendorStoreReviewRequest} from '../../actions/VendorStoreAction';

class VendorReviewsController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    this.props.vendorStoreReviewRequest({}, () => {
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const {isLoading} = this.state;
    return <VendorReviewsView {...this.props} isLoading={isLoading} />;
  }
}

const mapStateToProps = ({vendorStore}) => ({
  reviews: vendorStore.vendorStoreReiview,
  storeProfile: vendorStore.storeProfile,
});

const actions = {vendorStoreReviewRequest};

export default connect(mapStateToProps, actions)(VendorReviewsController);
