import React from 'react';
import PropTypes from 'prop-types';
import OrderRequestView from './OrderRequestView';
import {connect} from 'react-redux';
import {getOrderListRequest} from '../../actions/ProposalActions';

class OrderRequestController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    // start loading
    this.setState({
      isLoading: true,
    });

    // request for order list

    this.props.getOrderListRequest({}, (status) => {
      // stop loading
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const {isLoading} = this.state;

    return (
      <OrderRequestView
        {...this.props}
        onRefresh={this.initial}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = ({rfp}) => ({
  rfpListing: rfp.rfpListing,
});

const actions = {
  getOrderListRequest,
};

export default connect(mapStateToProps, actions)(OrderRequestController);
