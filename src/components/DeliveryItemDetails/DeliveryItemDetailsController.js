import React from 'react';
import PropTypes from 'prop-types';
import DeliveryItemDetailsView from './DeliveryItemDetailsView';
import {connect} from 'react-redux';
import {changeProposalStatusRequest} from '../../actions/ProposalActions';
import {LATEST_ORDER_STATUS} from '../../constants';
import {Actions} from 'react-native-router-flux';

class DeliveryItemDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalType: PropTypes.string,
    showDataList: PropTypes.array,
  };
  static defaultProps = {
    isModalOpen: false,
    closeModal: () => {},
    modalType: '',
    showDataList: [],
  };

  // handle complete for offline rider
  handleConfirm = () => {
    const {modalType, closeModal} = this.props;

    // start loading
    this.setState({
      isLoading: true,
    });

    const payload = {
      proposal_id: this.props.showDataList.id,
      status: LATEST_ORDER_STATUS.COMPLETED,
      driver_id: this.props.showDataList.driver.id,
    };

    this.props.changeProposalStatusRequest(payload, (status) => {
      // stop loading
      this.setState({
        isLoading: false,
      });
      if (status) {
        // close modal
        closeModal({[modalType]: false});
        // for rider listing and assign order listing
        // send new date because did mount need new value
        Actions.rateMyService({
          data: {
            proposal_id: this.props.showDataList.id,
            user_id: this.props.showDataList.user.id,
            driver_id: this.props.showDataList.driver.id,
          },
        });
      }
    });
  };

  render() {
    const {isLoading} = this.state;

    return (
      <DeliveryItemDetailsView
        {...this.props}
        handleConfirm={this.handleConfirm}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  changeProposalStatusRequest,
};

export default connect(mapStateToProps, actions)(DeliveryItemDetailsController);
