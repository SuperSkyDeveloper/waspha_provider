import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import OrderDetailsView from './OrderDetailsView';
import {connect} from 'react-redux';
import {
  strings,
  LATEST_ORDER_STATUS,
  DELIVERY_MODE_ID,
  ORDER_TYPE,
} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {Colors, Images} from '../../theme';
import {
  getOrderDetailRequest,
  rejectOrderRequest,
  changeProposalStatusRequest,
} from '../../actions/ProposalActions';
import {
  changeDeliveryModeRequest,
  checkOrderAssignedRequest,
  orderDetailRequest,
} from '../../actions/OrdersActions';
import {checkOrderType, filterList} from '../../helpers/generalHelper';
import {alertMessage} from '../../actions/GeneralActions';

class OrderDetailsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removeItemModal: false,
      activeIndex: null,
      isChatOption: false,
      isDeliveryMode: false,
      isDeliveryDetailsModal: false,
      isRejectModal: false,
      deliveryModes: [],
      selectedModeId: null,
      isLoading: true,
      detailData: {},
      changeDeliveryLoader: false,
      isOrderPickup: false,
      buttonLoader: false,
      totalDuration: 0,
      isPhoneOption: false,
    };
  }
  static propTypes = {
    item: PropTypes.object,
    orderStatus: PropTypes.string,
    enableUserInfoSec: PropTypes.bool,
    shouldEnableContactOption: PropTypes.func,
    showCrossIconOfAccordian: PropTypes.bool,
    showPriceAndQtyOfItem: PropTypes.bool,
    showDeliveryMode: PropTypes.bool,
    showDeliveryLocation: PropTypes.bool,
    showLandmark: PropTypes.bool,
    showAssignedOrderTime: PropTypes.bool,
    isOrderRequest: PropTypes.bool,
    id: PropTypes.number.isRequired,
    isCameFrom: PropTypes.string,
    showBtn: PropTypes.bool,

    // check is come from latest order screen
    fromLatestOrder: PropTypes.bool,
  };
  static defaultProps = {
    item: {},
    orderStatus: '',
    enableUserInfoSec: false,
    showPriceAndQtyOfItem: false,
    showCrossIconOfAccordian: true,
    showDeliveryMode: false,
    showDeliveryLocation: true,
    showLandmark: true,
    showAssignedOrderTime: false,
    isOrderRequest: false,
    fromLatestOrder: false,
    isCameFrom: '',
    showBtn: true,
  };

  componentDidMount() {
    this.initial();
  }

  componentDidUpdate(prevProps, prevState) {}
  // initial
  initial = () => {
    const {isOrderRequest, fromLatestOrder, orderStatus} = this.props;

    // start loading
    this.setState({
      isLoading: true,
    });

    // if user came from (rfp detail) proposal request list screen
    if (isOrderRequest) {
      const payload = {
        id: this.props.id,
      };

      // send req
      this.props.getOrderDetailRequest(payload, (status) => {
        // stop loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          return this.setState(
            {
              detailData: this.props.proposalDetail,
              isOrderPickup: checkOrderType(
                this.props.proposalDetail.type,
                ORDER_TYPE.PICKUP,
              ),
            },
            () => {
              this.handleExpiryTime();
            },
          );
        }

        return true;
      });
    }

    // if come from latest order and accepted order
    if (fromLatestOrder) {
      const payload = {
        id: this.props.id,
      };
      // send req
      this.props.orderDetailRequest(payload, (status) => {
        // stop loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          this.setState(
            {
              isOrderPickup: checkOrderType(
                this.props.orderDetail.type,
                ORDER_TYPE.PICKUP,
              ),
              detailData: this.props.orderDetail,
              deliveryModes: [],
            },
            () => {
              this.handleExpiryTime();
              // here check order for pickup
              if (!this.state.isOrderPickup) {
                // handle delivery and push (change delivery mode), if status accepted
                const {detailData} = this.state;
                if (orderStatus === LATEST_ORDER_STATUS.ACCEPTED) {
                  let modes = [];
                  modes = [
                    _.cloneDeep(
                      filterList(
                        this.props.allDeliveryModes,
                        detailData.delivery_mode_id,
                      ),
                    ),
                  ];

                  //  change delivery mode push in array because simply loop on array
                  let changeMode = {
                    id: 11,
                    title: strings.CHANGE,
                    isPressAble: true,
                    bgColor: Colors.deliveryMode.change,
                    image: Images.ChangeIcon,
                    action: () => this.handleChangeDeliveryMode(),
                  };

                  modes.push(changeMode);
                  this.setState(
                    {
                      deliveryModes: modes,
                      selectedModeId: filterList(
                        this.props.allDeliveryModes,
                        detailData.delivery_mode_id,
                      ).id,
                    },
                    () => {},
                  );
                } else {
                  this.setState({
                    deliveryModes: [detailData.delivery_mode_id],
                  });
                }
              }
            },
          );
        }
      });
    }
  };

  // set values into states
  setValue = (key, callBack = () => {}) => {
    this.setState(key, callBack);
  };

  // on accepted proposal change delivery
  handleChangeDeliveryMode = () => {
    const {detailData} = this.state;
    const {checkOrderAssignedRequest, alertMessage} = this.props;
    console.log({detailData});
    // //  start loading
    // this.setState({
    //   changeDeliveryLoader: true,
    // });

    // const payload = {
    //   id: this.props.orderDetail.id,
    //   delivery_mode_id: deliveryModeId,
    // };

    // this.props.changeDeliveryModeRequest(payload, (status) => {
    //   //  start loading
    //   this.setState({
    //     changeDeliveryLoader: false,
    //   });

    //   if (status) {
    //     // HIDE MODAL
    //     this.initial();
    //     this.setState({
    //       isDeliveryMode: false,
    //       detailData: this.props.orderDetail,
    //     });
    //   }
    // });

    checkOrderAssignedRequest({id: detailData.id}, (res) => {
      if (!res.status) {
      } else {
        if (res.data.is_assigned) {
          alertMessage(strings.ORDER_IN_PROGRESS);
        } else {
          Actions.proposalCreation({
            item: detailData.items,
            orderDetail: detailData,
            title: strings.PROPOSAL_CREATION,
            isChangeMode: true,
          });
        }
      }
    });
  };

  // handle reject proposal
  rejectModalOpen = () => {
    this.setState({isRejectModal: true});
  };

  // handle close reject proposal
  closeRejectModal = () => {
    this.setState({isRejectModal: false});
  };

  // handle change delivery mode
  changeDeliveryMode = (selectedModeId) => {
    const modes = [
      {
        id: 0,
        title: strings.ONLINE,
        subTitle: strings.DELIVERY_GUY,
        bgColor: Colors.deliveryMode.online,
        icon: Images.OnlineDeliveryGuy,
        action: () => {},
      },
      {
        id: 1,
        title: strings.OFFLINE,
        subTitle: strings.DELIVERY_GUY,
        bgColor: Colors.deliveryMode.offline,
        icon: Images.OfflineDeliveryGuy,
        action: () => {},
      },
      {
        id: 2,
        title: strings.WASPHA,
        subTitle: strings.EXPRESS,
        bgColor: Colors.deliveryMode.waspha,
        icon: Images.deliveryBikeIcon,
        action: () => {},
      },
    ];

    let deliveryModes = _.cloneDeep(this.state.deliveryModes);

    deliveryModes.shift();

    let selectedMode = _.find(modes, function (arr) {
      return arr.id === selectedModeId;
    });

    selectedMode['id'] = 0;

    deliveryModes.unshift(selectedMode);

    this.setState({deliveryModes, selectedModeId}, () => {});
  };

  // handle accordin
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

  // handle change order status
  handleChangeOrderStatus = (status, callback) => {
    const payload = {
      proposal_id: this.state.detailData.id,
      status,
    };
    this.props.changeProposalStatusRequest(payload, () => {
      this.setState({
        buttonLoader: false,
        detailData: this.props.orderDetail,
      });

      if (callback) {
        callback();
      }
    });
  };

  //handle navigation
  onHandleSubmit = (orderStatus, isOrderPickup) => {
    const {orderDetail} = this.props;
    const {selectedModeId} = this.state;

    // order type is pickup
    if (isOrderPickup) {
      switch (orderStatus) {
        case LATEST_ORDER_STATUS.ACCEPTED: {
          this.handleChangeOrderStatus(LATEST_ORDER_STATUS.PREPARED, () => {
            this.submitBtnText();
          });
          break;
        }
        case LATEST_ORDER_STATUS.PREPARED: {
          this.handleChangeOrderStatus(LATEST_ORDER_STATUS.COMPLETED, () => {
            Actions.rateMyService({
              data: {
                proposal_id: this.props.orderDetail.id,
                user_id: this.props.orderDetail.user.id,
              },
            });
          });
          break;
        }
      }
      return true;
    }

    switch (orderStatus) {
      case LATEST_ORDER_STATUS.ASSIGNED: {
        Actions.orderStatus({data: orderDetail});
        break;
      }
      case LATEST_ORDER_STATUS.COMPLETED: {
        Actions.orderDeliveryDetails({data: orderDetail});
        break;
      }
      case LATEST_ORDER_STATUS.CANCELLED: {
        Actions.cancelOrderDetails({
          data: orderDetail,
        });
        break;
      }
      case LATEST_ORDER_STATUS.ACCEPTED: {
        if (selectedModeId === DELIVERY_MODE_ID.ONLINE_ID) {
          return Actions.assignOnlineRider({
            orderId: orderDetail.id,
          });
        } else if (selectedModeId === DELIVERY_MODE_ID.OFFLINE_ID) {
          return Actions.riderListing({
            orderId: orderDetail.id,
            isForAssign: true,
          });
        } else if (selectedModeId === DELIVERY_MODE_ID.WASPHA_EXPRESS) {
          // Actions.wasphaExpress();
        }
        break;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_OFFLINE: {
        this.setValue({isDeliveryDetailsModal: true});
        break;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_ONLINE: {
        Actions.orderStatus({data: orderDetail});
        break;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_WASPHA: {
        Actions.orderStatus({data: orderDetail});
        break;
      }
    }
  };

  // sumbit btn text
  submitBtnText(orderStatus, isOrderPickup) {
    // order type is pickup
    if (isOrderPickup) {
      switch (orderStatus) {
        case LATEST_ORDER_STATUS.ACCEPTED: {
          return strings.PREPARED;
        }
        case LATEST_ORDER_STATUS.PREPARED: {
          return strings.COMPLETED_ORDER;
        }
      }
      return true;
    }

    switch (orderStatus) {
      case LATEST_ORDER_STATUS.ASSIGNED: {
        return strings.STATUS;
      }
      case LATEST_ORDER_STATUS.COMPLETED: {
        return strings.DELIVERY_DETAILS;
      }
      case LATEST_ORDER_STATUS.CANCELLED: {
        return strings.CANCELLATION_DETAILS;
      }
      case LATEST_ORDER_STATUS.ACCEPTED: {
        return strings.ASSIGN_RIDER;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_OFFLINE: {
        return strings.ORDER_COMPLETED;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_ONLINE: {
        return strings.STATUS;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_WASPHA: {
        return strings.STATUS;
      }
    }
  }

  // handle chat option
  submitChatOption(status) {
    switch (status) {
      case LATEST_ORDER_STATUS.ASSIGNED: {
        return {
          isUserChat: true,
          isDeliveryChat: true,
          isGroupChat: true,
        };
      }
      case LATEST_ORDER_STATUS.COMPLETED: {
        return {
          isUserChat: false,
          isDeliveryChat: false,
          isGroupChat: false,
        };
      }
      case LATEST_ORDER_STATUS.CANCELLED: {
        return {
          isUserChat: false,
          isDeliveryChat: false,
          isGroupChat: false,
        };
      }
      case LATEST_ORDER_STATUS.ACCEPTED: {
        return {
          isUserChat: true,
          isDeliveryChat: false,
          isGroupChat: false,
        };
      }
      case LATEST_ORDER_STATUS.ASSIGNED_OFFLINE: {
        return {
          isUserChat: true,
          isDeliveryChat: false,
          isGroupChat: false,
        };
      }
      case LATEST_ORDER_STATUS.ASSIGNED_ONLINE: {
        return {
          isUserChat: true,
          isDeliveryChat: true,
          isGroupChat: true,
        };
      }
      case LATEST_ORDER_STATUS.ASSIGNED_WASPHA: {
        return {
          isUserChat: true,
          isDeliveryChat: true,
          isGroupChat: true,
        };
      }
    }
  }

  //handle navbar text
  headerText(orderStatus) {
    switch (orderStatus) {
      case LATEST_ORDER_STATUS.ASSIGNED: {
        return strings.ASSINGED_ORDER;
      }
      case LATEST_ORDER_STATUS.COMPLETED: {
        return strings.COMPLETED_ORDER;
      }
      case LATEST_ORDER_STATUS.CANCELLED: {
        return strings.CANCELLED_ORDER;
      }
      case LATEST_ORDER_STATUS.ACCEPTED: {
        return strings.ACCEPTED_ORDER;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_OFFLINE: {
        return strings.ASSINGED_ORDER;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_ONLINE: {
        return strings.ASSINGED_ORDER;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_WASPHA: {
        return strings.ASSINGED_ORDER;
      }
    }
  }

  // sumbit btn text
  handleTimerVisible(orderStatus, isOrderPickup) {
    // order type is pickup
    if (isOrderPickup) {
      switch (orderStatus) {
        case LATEST_ORDER_STATUS.ACCEPTED: {
          return true;
        }
        case LATEST_ORDER_STATUS.PREPARED: {
          return false;
        }
      }
      return true;
    }

    switch (orderStatus) {
      case LATEST_ORDER_STATUS.ASSIGNED: {
        return false;
      }
      case LATEST_ORDER_STATUS.COMPLETED: {
        return false;
      }
      case LATEST_ORDER_STATUS.CANCELLED: {
        return false;
      }
      case LATEST_ORDER_STATUS.ACCEPTED: {
        return true;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_OFFLINE: {
        return false;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_ONLINE: {
        return false;
      }
      case LATEST_ORDER_STATUS.ASSIGNED_WASPHA: {
        return false;
      }
    }
  }

  // Coundown timer for a given expiry date-time
  handleExpiryTime = () => {
    // You can set your own date-time
    // let expirydate = this.state.detailData.order_accepted;

    let totalTime = moment(this.state.detailData.order_accepted).add(
      this.state.detailData.proposal_prep_time,
      'minutes',
    );

    let expirydate = totalTime;

    let diffr = moment.duration(moment(expirydate).diff(moment()));

    // Difference of the expiry date-time
    let hours = parseInt(diffr.asHours());
    let minutes = parseInt(diffr.minutes());
    let seconds = parseInt(diffr.seconds());

    // Converting in seconds
    let totalSecond = hours * 60 * 60 + minutes * 60 + seconds;

    // Settign up the duration of countdown

    this.setState({
      totalDuration: totalSecond,
    });
  };

  render() {
    const {
      removeItemModal,
      activeIndex,
      isChatOption,
      isDeliveryMode,
      isDeliveryDetailsModal,
      deliveryModes,
      selectedModeId,
      isRejectModal,
      detailData,
      isLoading,
      changeDeliveryLoader,
      isOrderPickup,
      buttonLoader,
      totalDuration,
      showRiderModal,
      isPhoneOption,
    } = this.state;

    return (
      <OrderDetailsView
        showRiderModal={showRiderModal}
        isPhoneOption={isPhoneOption}
        handleTimerVisible={this.handleTimerVisible}
        totalDuration={totalDuration}
        submitChatOption={this.submitChatOption}
        detailData={detailData}
        isLoading={isLoading}
        handleIndex={this.handleIndex}
        activeIndex={activeIndex}
        isRejectModal={isRejectModal}
        headerText={this.headerText}
        closeRejectModal={this.closeRejectModal}
        changeDeliveryMode={this.changeDeliveryMode}
        rejectModalOpen={this.rejectModalOpen}
        deliveryModes={deliveryModes}
        selectedModeId={selectedModeId}
        isDeliveryMode={isDeliveryMode}
        isDeliveryDetailsModal={isDeliveryDetailsModal}
        isChatOption={isChatOption}
        setValue={(data) => this.setValue(data)}
        removeItemModal={removeItemModal}
        onHandleSubmit={this.onHandleSubmit}
        btnText={this.submitBtnText}
        handleChangeDeliveryMode={this.handleChangeDeliveryMode}
        changeDeliveryLoader={changeDeliveryLoader}
        isOrderPickup={isOrderPickup}
        buttonLoader={buttonLoader}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({proposal, general, rfp}) => ({
  proposalDetail: rfp.rfpDetail,
  reasons: general.appSettings.vendor_rejection_reasons,
  orderDetail: proposal.proposalDetail,
  allDeliveryModes: general.appSettings.delivery_modes,
});

const actions = {
  getOrderDetailRequest,
  rejectOrderRequest,
  orderDetailRequest,
  changeDeliveryModeRequest,
  changeProposalStatusRequest,
  checkOrderAssignedRequest,
  alertMessage,
};

export default connect(mapStateToProps, actions)(OrderDetailsController);
