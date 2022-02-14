import React from 'react';
import PropTypes from 'prop-types';
import ProposalCenterDetailsView from './ProposalCenterDetailsView';
import {connect} from 'react-redux';
import {strings, NAME_LENGTH, DESC_LENGTH, ORDER_TYPE} from '../../constants';
import {orderDetailRequest} from '../../actions/OrdersActions';
import {checkOrderType} from '../../helpers/generalHelper';

class ProposalCenterDetailsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      vendorItemsList: [],
      activeVendorItemIndex: 0,
      detailData: {},
      isLoading: true,
      isPickup: false,

      isRevision: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }
  // initial
  initial = () => {
    const {id} = this.props;
    const payload = {
      id,
    };
    // send req
    this.props.orderDetailRequest(payload, (status) => {
      // stop loading
      this.setState({
        detailData: this.props.proposalDetail,
        isPickup: checkOrderType(
          this.props.proposalDetail.type,
          ORDER_TYPE.PICKUP,
        ),
        isLoading: false,
      });

      if (status) {
        this.setState({
          isRevision: this.props.proposalDetail.is_revised,
        });
      }
    });
  };

  handleIndex = (index) => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  handleVendorItemsIndex = (index) => {
    const pressForClose = index === this.state.activeVendorItemIndex;
    if (pressForClose) {
      this.setState({
        activeVendorItemIndex: null,
      });
    } else {
      this.setState({
        activeVendorItemIndex: index,
      });
    }
  };

  render() {
    const {
      activeIndex,
      activeVendorItemIndex,
      vendorItemsList,
      detailData,
      isLoading,
      isPickup,
      isRevision,
    } = this.state;
    return (
      <ProposalCenterDetailsView
        isRevision={isRevision}
        handleIndex={this.handleIndex}
        handleVendorItemsIndex={this.handleVendorItemsIndex}
        activeIndex={activeIndex}
        activeVendorItemIndex={activeVendorItemIndex}
        vendorItemsList={vendorItemsList}
        detailData={detailData}
        isLoading={isLoading}
        isPickup={isPickup}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({proposal, general, user}) => ({
  proposalDetail: proposal.proposalDetail,
  deliveryModes: general.appSettings.delivery_modes,
  deliveryVehicles: general.appSettings.delivery_vehicles,
  currencyCode: user.data.currency_code,
});

const actions = {
  orderDetailRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(ProposalCenterDetailsController);
