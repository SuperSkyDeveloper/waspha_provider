import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PaymentBreakDownModalView from './PaymentBreakDownModalView';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import {confirmProposalRequest} from '../../actions/ProposalActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

class PaymentBreakDownModalController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billItems: props.proposalPrice.bill,
      isDiscounted: false,
    };
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,
    onConfirm: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    btnOneText: PropTypes.string,
    btnTwoText: PropTypes.string,
    isRevision: PropTypes.bool,
  };
  static defaultProps = {
    isModalOpen: false,
    closeModal: () => {},
    onConfirm: () => {},
    title: strings.REMOVE_ITEM,
    btnOneText: strings.YES,
    btnTwoText: strings.NO,
    isRevision: false,
  };

  componentDidMount = () => {
    this.handleBill();
  };

  handleBill = () => {
    const {proposalPrice} = this.props;
    if (proposalPrice.bill[0].value > proposalPrice.bill[1].value) {
      this.setState({isDiscounted: true});
    } else {
      this.removeDiscountAmount();
    }
  };

  removeDiscountAmount = () => {
    const {proposalPrice} = this.props;

    let billItems = _.cloneDeep(proposalPrice.bill);
    delete billItems[1];
    this.setState({billItems});
  };

  handleConfirmBtn = () => {
    const payload = {
      proposal_id: this.props.proposalPrice.proposal.id,
      isRevision: this.props.isRevision,
    };
    this.props.confirmProposalRequest(payload, (status) => {
      if (status) {
        if (this.props.isRevision) {
          Actions.pop();
          Actions.pop();
          Actions.pop();

          Actions.proposalCenter();
          this.props.closeModal();
        } else {
          Actions.pop();
          Actions.pop();
          Actions.pop();

          Actions.proposalCenter();
          this.props.closeModal();
        }
      }
    });
  };

  // hanlde payment breake down value

  showValue = (item) => {
    switch (item.id) {
      // discount rates should be in %
      case 2:
        return `${!_.isNil(item.value) && item.value}%`; // Waspha rates should be in %
      case 5:
        return `${!_.isNil(item.value) && item.value}%`;
      // When delivery fee is '0' it should show 'FREE DELIVERY'
      case 4:
        return item.value == 0
          ? strings.FREE_DELIVERY
          : util.setPaymentUnit(item.value);
      default:
        return !_.isNil(item.value) && util.setPaymentUnit(item.value);
    }
  };

  render() {
    const {billItems, isDiscounted} = this.state;
    return (
      <PaymentBreakDownModalView
        {...this.props}
        billItems={billItems}
        isDiscounted={isDiscounted}
        handleConfirmBtn={this.handleConfirmBtn}
        confirmProposalRequest={this.confirmProposalRequest}
        showValue={this.showValue}
      />
    );
  }
}

const mapStateToProps = ({proposalDetails, user}) => ({
  proposalPrice: proposalDetails.proposalPrice,
  currencyCode: user.data.currency_code,
});

const actions = {
  confirmProposalRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(PaymentBreakDownModalController);
