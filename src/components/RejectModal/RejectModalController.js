import React from 'react';
import _ from 'lodash';
import PropTypes, {string} from 'prop-types';
import RejectModalView from './RejectModalView';
import {connect} from 'react-redux';
import util from '../../util';
import {rejectOrderRequest} from '../../actions/ProposalActions';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';
import {alertMessage} from '../../actions/GeneralActions';

class RejectModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItem: [],
      isLoading: false,
    };
  }
  static propTypes = {
    items: PropTypes.array,
    items: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleRejectSubmitBtn: PropTypes.func.isRequired,
  };
  static defaultProps = {items: []};

  onCheckboxItemPress = (id) => {
    const temp = _.cloneDeep(this.state.selectedItem);
    const tempSelectedItem = _.xor(temp, [id]);

    this.setState({
      selectedItem: tempSelectedItem,
    });
  };

  // handle final reason modal submit btn
  handleRejectSubmitBtn = () => {
    const {selectedItem} = this.state;
    const {alertMessage} = this.props;
    if (!_.isEmpty(selectedItem)) {
      // start loading
      this.setState({
        isLoading: true,
      });

      const payload = {
        rfp_id: this.props.orderId,
        reason: selectedItem,
      };
      this.props.rejectOrderRequest(payload, (status) => {
        // stop loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          Actions.pop();
          this.props.closeModal();
        }
      });
    } else {
      // util.topAlert(strings.PLEASE_SELECT_ANY_REASON);
      alertMessage(strings.PLEASE_SELECT_ANY_REASON);
    }
  };

  render() {
    const {selectedItem, isLoading} = this.state;
    return (
      <RejectModalView
        handleRejectSubmitBtn={this.handleRejectSubmitBtn}
        selectedItem={selectedItem}
        onCheckboxItemPress={this.onCheckboxItemPress}
        isLoading={isLoading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {rejectOrderRequest, alertMessage};

export default connect(mapStateToProps, actions)(RejectModalController);
