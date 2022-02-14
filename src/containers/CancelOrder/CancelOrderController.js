import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CancelOrderView from './CancelOrderView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {alertMessage} from '../../actions/GeneralActions';
import {cancelTraditionalOrderRequest} from '../../actions/OrdersActions';
import {strings} from '../../constants';

class CancelOrderController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelOrderPoints: props.cancellationReasons,
      selectedItems: [],
      description: '',
      loading: false,
    };
  }
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    cancelRFPRequest: PropTypes.func,
  };
  static defaultProps = {
    cancelTraditionalOrderRequest: () => {},
    fromOrderAndProposal: false,
    fromProposalDetails: false,
  };

  setValue = (key) => {
    this.setState(key);
  };

  handleItemSelect = (key) => {
    let selectedItem = _.xor([key], this.state.selectedItems);
    this.setState({selectedItems: selectedItem});
  };

  validate = () => {
    const {alertMessage} = this.props;
    let validate = true;

    if (
      _.isEmpty(this.state.selectedItems) &&
      _.isEmpty(this.state.description)
    ) {
      // util.topAlert('Please provide cancellation reason');
      alertMessage(strings.PLEASE_GIVE_A_REASON);
      validate = false;
    }

    return validate;
  };

  handleSubmit = () => {
    if (this.validate()) {
      const {selectedItems, description} = this.state;
      console.log({selectedItems});
      const {cancelTraditionalOrderRequest, orderId, alertMessage} = this.props;
      let reasons = selectedItems;

      const payload = {
        order_id: orderId,
        reasons,
        description,
      };
      this.setState({loading: true});
      cancelTraditionalOrderRequest(payload, (response) => {
        if (response) {
          this.setState({loading: false});
          // util.topAlert('Cancellation Successful');
          alertMessage(strings.CANCEL_SUCCESS);
          console.log('hshshshs');
          Actions.reset('drawerMenu');
        }
        this.setState({loading: false});
      });
    }
  };

  render() {
    const {selectedItems, description, loading, cancelOrderPoints} = this.state;
    return (
      <CancelOrderView
        handleSubmit={this.handleSubmit}
        handleItemSelect={this.handleItemSelect}
        setValue={(data) => this.setValue(data)}
        cancelOrderPoints={cancelOrderPoints}
        selectedItems={selectedItems}
        description={description}
        loading={loading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  cancellationReasons: general.appSettings.vendor_cancellation_reasons,
});

const actions = {cancelTraditionalOrderRequest, alertMessage};

export default connect(mapStateToProps, actions)(CancelOrderController);
