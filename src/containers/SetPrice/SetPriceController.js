import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes, {bool} from 'prop-types';
import SetPriceView from './SetPriceView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {strings} from '../../constants';
import {WASPA_EXPRESS_ID} from '../../constants';
import {
  createProposalInternal,
  createProposalInternalItems,
} from '../../actions/ProposalActions';
import {alertMessage} from '../../actions/GeneralActions';

class SetPriceController extends React.Component {
  constructor() {
    super();
    this.state = {
      isDateTimePicker: false,
      dateTime: '',
      dataTimeError: '',
      deliveryFee: 0,
      deliveryFeeError: '',
    };
  }
  static propTypes = {
    activeModeId: PropTypes.any.isRequired,
    onChange: PropTypes.func,
    handleProposalCreation: PropTypes.func,
    isPickup: PropTypes.bool,
    isChangeMode: PropTypes.bool,
    showDeliveryAndETA: PropTypes.bool,
  };
  static defaultProps = {
    onChange: () => {},
    handleProposalCreation: () => {},
    isPickup: false,
    isChangeMode: false,
    showDeliveryAndETA: true,
  };

  setValue = (key) => {
    this.setState(key);
  };

  componentDidMount() {}

  vaidation = () => {
    const {createProposalData, activeModeId} = this.props;
    console.log({activeModeId});
    let error = true;

    // if activeMode express then ETA and Delivery Fee not required
    if (activeModeId === WASPA_EXPRESS_ID) {
      console.log('is waspha');
      this.props.handleProposalCreation({deliveryFee: 0});
    }

    if (activeModeId !== WASPA_EXPRESS_ID && this.props.showDeliveryAndETA) {
      if (
        (_.isNil(createProposalData.eta) || createProposalData.eta === '') &&
        !this.props.isPickup
      ) {
        error = false;
        this.props.handleProposalCreation({
          etaError: strings.ETA_IS_REQ,
          //util.isRequiredErrorMessage(strings.ETA),
        });
      } else {
        this.props.handleProposalCreation({
          etaError: '',
        });
      }

      if (
        (_.isNil(createProposalData.deliveryFee) ||
          createProposalData.deliveryFee === '') &&
        !this.props.isPickup
      ) {
        error = false;
        this.props.handleProposalCreation({
          deliveryFeeError: strings.DELIVERY_FEE_IS_REQ,
          //util.isRequiredErrorMessage(strings.DELIVERY_FEE),
        });
      } else {
        this.props.handleProposalCreation({
          deliveryFeeError: '',
        });
      }
    }

    // handle items price and tax validation
    createProposalData.items.map((item, index) => {
      if (_.isNil(item.price) || item.price === '') {
        this.props.onChange(
          'priceError',
          index,
          strings.PRICE_IS_REQ,
          // util.isRequiredErrorMessage(strings.PRICE),
        );
        error = false;
      } else if (item.price === 0) {
        this.props.onChange('priceError', index, strings.PRICE_CANNOT_BE_ZERO);
        error = false;
      } else {
        this.props.onChange('priceError', index, '');
      }
      // tax
      if (_.isNil(item.tax) || item.tax === '') {
        // if user not add any amount then it will be 0
        this.props.onChange('tax', index, '0');
        // this.props.onChange(
        //   'taxError',
        //   index,
        //   util.isRequiredErrorMessage(strings.TAX),
        // );
        // error = false;
      } else {
        this.props.onChange('taxError', index, '');
      }
    });

    return error;
  };

  handleSetPropsalBtn = () => {
    const {deliveryFee, dateTime} = this.state;

    if (this.vaidation()) {
      // ETA should greather than today's
      if (moment().isSameOrAfter(dateTime)) {
        // return util.topAlert(
        //   strings.ETA_SHOULD_NOT_BE_LESS_THAN_EQUAL_TO_CURRENT_TIME,
        // );
        return alertMessage(
          strings.ETA_SHOULD_NOT_BE_LESS_THAN_EQUAL_TO_CURRENT_TIME,
        );
      }
      Actions.pop();
    }
  };

  render() {
    const {
      dateTime,
      isDateTimePicker,
      deliveryFee,
      deliveryFeeError,
      dataTimeError,
    } = this.state;

    return (
      <SetPriceView
        dataTimeError={dataTimeError}
        deliveryFeeError={deliveryFeeError}
        dateTime={dateTime}
        deliveryFee={deliveryFee}
        isDateTimePicker={isDateTimePicker}
        handleSetPropsalBtn={this.handleSetPropsalBtn}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({rfp}) => ({
  createProposalData: rfp.createProposal,
});

const actions = {
  createProposalInternal,
  createProposalInternalItems,
  alertMessage,
};

export default connect(mapStateToProps, actions)(SetPriceController);
