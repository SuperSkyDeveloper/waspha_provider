import React from 'react';
import PropTypes from 'prop-types';
import ProposalCenterView from './ProposalCenterView';
import {connect} from 'react-redux';
import {latestOrderRequest} from '../../actions/OrdersActions';
import {LATEST_ORDER_STATUS} from '../../constants';
import {filterOrder} from '../../services/OrderHelper';

class ProposalCenterController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      proposalData: [],
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initialRequest();
  }

  initialRequest = () => {
    const payload = {status: LATEST_ORDER_STATUS.PENDING};

    this.setState({
      isLoading: true,
    });
    this.props.latestOrderRequest(payload, () => {
      this.setState({
        isLoading: false,
        proposalData: filterOrder(
          this.props.orders,
          LATEST_ORDER_STATUS.PENDING,
        ),
      });
    });
  };

  render() {
    const {proposalData, isLoading} = this.state;
    return (
      <ProposalCenterView
        {...this.props}
        proposalData={proposalData}
        isLoading={isLoading}
        onRefresh={this.initialRequest}
      />
    );
  }
}

const mapStateToProps = ({proposal}) => ({
  orders: proposal.allProposal,
});

const actions = {
  latestOrderRequest,
};

export default connect(mapStateToProps, actions)(ProposalCenterController);
