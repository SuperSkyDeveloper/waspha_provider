import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ProposalCreationView from './ProposalCreationView';
import {connect} from 'react-redux';
import {
  strings,
  NAME_LENGTH,
  DESC_LENGTH,
  WASPA_EXPRESS_ID,
  ORDER_TYPE,
} from '../../constants';
import {Images, Colors} from '../../theme';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {
  createProposalInternal,
  createProposalInternalItems,
  createProposalRequest,
  updateProposalRequest,
  createProposalInternalAddNewItems,
  createProposalInternalAddNewProposal,
  createProposalInternalRemoveItem,
} from '../../actions/ProposalActions';
import {arrangeProductData} from '../../helpers/orderHelper';
import {
  checkOrderType,
  manageReviseItemQuantity,
} from '../../helpers/generalHelper';
import {storeDriversRequest} from '../../actions/DriverActions';
import {alertMessage} from '../../actions/GeneralActions';
import {changeDeliveryModeRequest} from '../../actions/OrdersActions';

class ProposalCreationController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      vendorItemsList: [],
      activeVendorItemIndex: 0,
      openPaymentModal: false,
      removeItemModal: false,
      activeModeId: '',
      activeVehicleId: '',
      activeModeIdError: '',
      activeVehicleIdError: '',
      imageBase64: '',
      eta: '',
      deliveryFees: '',
      etaError: '',
      deliveryFeesError: '',
      isLoading: false,
      isSetScreenError: false,
      proposalPrepTime: null,
      proposalPrepTimeError: '',
      proposalSelectionTime: null,
      proposalSelectionTimeError: '',
      isPickup: checkOrderType(this.props.orderDetail.type, ORDER_TYPE.PICKUP),
      proposalPrepTimeType: util.PROPOSAL_TIME_TYPE()[0],
      selectionTimeType: util.PROPOSAL_TIME_TYPE()[0],
      availbleDeliveryVehicle: [],
      isOnlineDeliveryAvailable: true,
      isOfflineDeliveryAvailable: true,
      loadingScreen: false,
    };
  }

  static propTypes = {
    item: {},
    isProposalCenter: PropTypes.bool,
    isProposalCenterTypeDelivery: PropTypes.bool,
    isProposalCenterTypePickUp: PropTypes.bool,
    orderDetail: PropTypes.object.isRequired,
    isRevision: PropTypes.bool,
    isChangeMode: PropTypes.bool,
  };

  static defaultProps = {
    isRevision: false,
    isProposalCenter: false,
    isChangeMode: false,
  };

  componentDidMount() {
    // handle revision
    this.handleRevision();
    // handle items, sets proposal in reducer
    this.handleProposalItems();

    // todo make function
    // set
    this.setState({
      proposalPrepTime: util.intToString(
        this.props.storeProfile.proposal_prep_time,
      ),
      proposalSelectionTime: util.intToString(
        this.props.storeProfile.proposal_selection_time,
      ),
    });

    this.getDeliveryStatus();
  }

  //we get riders and then assign bools to state...
  // we do this because we want to handle the rendering of Delivery Mode on the screen
  getDeliveryStatus = () => {
    this.setState({loadingScreen: true});
    this.props.storeDriversRequest({is_available: true}, () => {
      let isOnlineDeliveryAvailable = _.findIndex(this.props.riders, {
        type: 'online',
      });

      if (isOnlineDeliveryAvailable === -1) {
        this.setState({isOnlineDeliveryAvailable: false});
      }

      let isOfflineDeliveryAvailable = _.findIndex(this.props.riders, {
        type: 'offline',
      });

      if (isOfflineDeliveryAvailable === -1) {
        this.setState({
          isOfflineDeliveryAvailable: false,
        });
      }
      this.setState({loadingScreen: false});
    });
  };

  // set proposal data in reducer

  //changes to be made after work from server
  handleProposalItems = () => {
    if (this.props.isRevision) {
      this.props.createProposalInternalAddNewProposal(
        manageReviseItemQuantity(this.props.orderDetail),
      );
    } else {
      this.props.createProposalInternalAddNewProposal(
        this.props.orderDetail.items,
      );
    }
  };

  handleAvailbleVehicle = (id) => {
    console.log({id});
    const {orderDetail} = this.props;
    console.log({orderDetail});
    let data = [];

    data = this.props.deliveryVehicles.filter((item, index) => {
      if (id == 1) {
        return orderDetail.available_vehicles.online.includes(item.id);
      }
      if (id == 2) {
        return orderDetail.available_vehicles.offline.includes(item.id);
      }

      if (id == 3) {
        return orderDetail.available_vehicles.waspha_express.includes(item.id);
      }
    });

    this.setState({
      availbleDeliveryVehicle: data,
    });
  };

  // handle revision
  handleRevision = () => {
    if (this.props.isRevision) {
      this.setState({
        isPickup: true,
      });
    }
  };

  openModal = () => {
    this.setState({openPaymentModal: true});
  };

  closeModal = () => {
    this.setState({openPaymentModal: false});
  };

  onConfirm = () => {
    Actions.reset('drawerMenu');
  };

  setValue = (key) => {
    this.setState(key);
  };

  // handle according open or close
  handleIndex = (index) => {
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

  // handle add new item
  handleNewItemPress = () => {
    let findArray = this.state.vendorItemsList.length;

    this.setState({
      activeVendorItemIndex: findArray,
      vendorItemsList: [
        ...this.state.vendorItemsList,
        {
          name: '',
          description: '',
          remark: '',
          image: '',
          price: '',
          tax: '',
          // nameError: '',
          descError: '',
          remarkError: '',
          activeVehicleId: '',
          activeModeId: '',
          fromVendor: true,
          quantity: 1,
        },
      ],
    });
  };

  setActiveId = (id, isDeliveryMode) => {
    const {activeModeId, activeVehicleId} = this.state;

    if (isDeliveryMode) {
      if (activeModeId === id) {
        return true;
      }
      this.setState({activeModeId: id});
    } else {
      if (activeVehicleId === id) {
        return true;
      }
      this.setState({activeVehicleId: id});
    }
  };

  // new

  // handle delivery mode, delivery vehicle
  handleProposalCreation = (key) => {
    let seperateKey = Object.keys(key);

    // clear error delivery Vehicle Id
    if (seperateKey[0] === 'deliveryVehicleId') {
      this.handleProposalCreation({deliveryVehicleIdError: ''});
    }

    // clear error deliveryModeId
    if (seperateKey[0] === 'deliveryModeId') {
      this.handleProposalCreation({deliveryVehicleId: ''});
      this.handleAvailbleVehicle(key.deliveryModeId);
      this.handleProposalCreation({activeModeIdError: ''});
    }
    // clear error eta
    if (seperateKey[0] === 'eta') {
      this.handleProposalCreation({etaError: ''});
    }

    // clear error delivery fee
    if (seperateKey[0] === 'deliveryFee') {
      this.handleProposalCreation({deliveryFeeError: ''});
    }
    this.props.createProposalInternal(key);
  };

  // handle add new item btn
  handleAddNewItems = () => {
    this.props.createProposalInternalAddNewItems({
      name: '',
      description: '',
      remark: '',
      price: '',
      tax: '',
      fromVendor: true,
      quantity: 1,
    });
  };

  // add product data in reducer
  handleProductItemsData = (key, index, value) => {
    // handle limits

    // handle product name lenght limit
    if (key === 'name' && value.length > NAME_LENGTH) {
      this.handleProductItemsData(
        'nameError',
        index,
        strings.NAME_LIMIT_EXCEEDED,
      );
      return true;
    } else if (key === 'name') {
      this.handleProductItemsData('nameError', index, '');
    }

    // handle product name lenght limit
    if (key === 'description' && value.length > DESC_LENGTH) {
      this.handleProductItemsData(
        'descriptionError',
        index,
        strings.DESC_LIMIT_EXCEEDED,
      );
      return true;
    } else if (key === 'description') {
      this.handleProductItemsData('descriptionError', index, '');
    }

    // handle product remarks lenght limit
    if (key === 'remark' && value.length > DESC_LENGTH) {
      this.handleProductItemsData(
        'remarkError',
        index,
        strings.DESC_LIMIT_EXCEEDED,
      );
      return true;
    } else if (key === 'remark') {
      this.handleProductItemsData('remarkErrorError', index, '');
    }

    if (key === 'price') {
      this.handleProductItemsData('priceError', index, '');
    }

    if (key === 'tax') {
      this.handleProductItemsData('taxError', index, '');
    }
    if (key === 'productImage') {
      this.handleProductItemsData('imageDataError', index, '');
    }

    this.props.createProposalInternalItems({key, index, value});
  };

  // handle accordin accordin item then is error
  handleOnErrorAccordin = (index) => {
    this.setState({activeVendorItemIndex: index});
  };

  // handle validation vendor items
  validation = () => {
    const {proposalPrepTime, proposalSelectionTime, isPickup} = this.state;
    const {createProposalData, orderDetail, isChangeMode} = this.props;
    let temp = _.cloneDeep(createProposalData);

    let error = true;

    this.setState({
      isSetScreenError: false,
    });

    // proposalPrepTime
    if (_.isEmpty(proposalPrepTime)) {
      error = false;
      this.setState({
        proposalPrepTimeError: strings.PLEASE_ADD_PROPOSAL_PREPERATION_TIME,
      });
    }
    // proposalSelectionTime
    if (_.isEmpty(proposalSelectionTime)) {
      error = false;
      this.setState({
        proposalSelectionTimeError: strings.PLEASE_ADD_PROPOSAL_TIME_OUT,
      });
    }

    if (
      createProposalData.deliveryModeId !== WASPA_EXPRESS_ID &&
      this.checkShowDeliveryAndETA()
    ) {
      // here check if delivery mode is waspa express then no need to eta and delivery fees
      // ETA
      if ((_.isNil(temp.eta) || temp.eta === '') && !isPickup) {
        // set error
        this.handleProposalCreation({
          etaError: strings.ETA_IS_REQ,
          // util.isRequiredErrorMessage(strings.ETA),
        });
        // set state for redirect on set price screen
        this.setState({
          isSetScreenError: true,
        });
        // change error value
        error = false;
      } else {
        this.handleProposalCreation({
          etaError: '',
        });
      }

      // delivery fees
      if ((_.isNil(temp.deliveryFee) || temp.deliveryFee === '') && !isPickup) {
        // set error
        this.handleProposalCreation({
          deliveryFeeError: strings.DELIVERY_FEE_IS_REQUIRED,
          //util.isRequiredErrorMessage(strings.DELIVERY_FEE),
        });
        // set state for redirect on set price screen
        this.setState({
          isSetScreenError: true,
        });
        // change error value
        error = false;
      } else {
        this.handleProposalCreation({
          deliveryFeeError: '',
        });
      }
    }

    // Delivery mode

    if (
      (_.isNil(temp.deliveryModeId) || temp.deliveryModeId === '') &&
      !isPickup
    ) {
      this.handleProposalCreation({
        activeModeIdError: strings.DELIVERY_MODE_IS_REQ,
        // util.isRequiredErrorMessage(strings.DELIVERY_MODE),
      });
      error = false;
    } else {
      this.handleProposalCreation({
        activeModeIdError: '',
      });
    }

    // Delivery Vehicle
    if (
      (_.isNil(temp.deliveryVehicleId) || temp.deliveryVehicleId === '') &&
      !isPickup
    ) {
      this.handleProposalCreation({
        deliveryVehicleIdError: strings.DELIVERY_VEHICLE_IS_REQ,
        // util.isRequiredErrorMessage(strings.DELIVERY_VEHICLE ),
      });
      error = false;
    } else {
      this.handleProposalCreation({
        deliveryVehicleIdError: '',
      });
    }

    if (!isChangeMode) {
      temp.items.map((item, index) => {
        // price
        if (_.isNil(item.price) || _.isEmpty(item.price)) {
          // open that accordin if error exits
          this.handleOnErrorAccordin(index);
          this.handleProductItemsData(
            'priceError',
            index,
            strings.PRICE_IS_REQ,
            // util.isRequiredErrorMessage(strings.PRICE),
          );
          this.setState({
            isSetScreenError: true,
          });
          error = false;
        } else if (item.price == 0) {
          this.handleOnErrorAccordin(index);

          this.handleProductItemsData(
            'priceError',
            index,
            strings.PRICE_CANNOT_BE_ZERO,
          );
          this.setState({
            isSetScreenError: true,
          });
          error = false;
        } else {
          this.handleProductItemsData('priceError', index, '');
        }

        // tax
        if (_.isNil(item.tax) || _.isEmpty(item.tax)) {
          // open that accordin if error exits
          this.handleOnErrorAccordin(index);
          // if user not add any amount then it will be 0
          this.handleProductItemsData('tax', index, '0');

          // this.handleProductItemsData(
          //   'taxError',
          //   index,
          //   util.isRequiredErrorMessage(strings.TAX),
          // );
          // this.setState({
          //   isSetScreenError: true,
          // });
          // error = false;
        } else {
          this.handleProductItemsData('taxError', index, '');
        }

        // valdation for vendor create proposal
        if (item.fromVendor) {
          // title
          if (_.isNil(item.name) || _.isEmpty(item.name)) {
            // open that accordin if error exits
            this.handleOnErrorAccordin(index);
            this.handleProductItemsData(
              'nameError',
              index,
              strings.TITLE_REQ,
              // util.isRequiredErrorMessage(strings.TITLE),
            );
            error = false;
          } else {
            this.handleProductItemsData('nameError', index, '');
          }

          // imageData
          if (_.isNil(item.productImage) || _.isEmpty(item.productImage)) {
            // open that accordin if error exits
            this.handleOnErrorAccordin(index);
            this.handleProductItemsData(
              'imageDataError',
              index,
              strings.IMAGE_IS_REQ,
              //util.isRequiredErrorMessage(strings.IMAGE),
            );
            error = false;
          } else {
            this.handleProductItemsData('imageDataError', index, '');
          }

          // description
          if (_.isNil(item.description) || _.isEmpty(item.description)) {
            // open that accordin if error exits
            this.handleOnErrorAccordin(index);
            this.handleProductItemsData(
              'descriptionError',
              index,
              strings.DESC_IS_REQ,
              //util.isRequiredErrorMessage(strings.DESCRIPTION),
            );
            error = false;
          } else {
            this.handleProductItemsData('descriptionError', index, '');
          }

          // quantity
          if (_.isNil(item.quantity) || item.quantity === '') {
            // open that accordin if error exits
            this.handleOnErrorAccordin(index);
            this.handleProductItemsData(
              'quantityError',
              index,
              strings.QUANTITY_IS_REQ,
              //util.isRequiredErrorMessage(strings.QUANTITY),
            );
            error = false;
          } else {
            this.handleProductItemsData('quantityError', index, '');
          }
        }
      });
    }
    return error;
  };

  //
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if there is any error on setprice screen then redirect
    if (prevState !== this.state) {
      if (this.state.isSetScreenError) {
        return this.handleSetPrice();
      }
    }
  }

  handleSetPrice = () => {
    Actions.setPrice({
      activeModeId: this.props.createProposalData.deliveryModeId,
      onChange: this.handleProductItemsData,
      handleProposalCreation: this.handleProposalCreation,
      isPickup: this.state.isPickup,
      isChangeMode: this.props.isChangeMode,
      showDeliveryAndETA: this.checkShowDeliveryAndETA(),
    });
  };

  checkShowDeliveryAndETA = () => {
    if (!_.isNil(this.props.orderDetail.delivery_mode_id)) {
      if (
        this.props.orderDetail.delivery_mode_id === 1 ||
        this.props.orderDetail.delivery_mode_id === 2
      ) {
        return false;
      }
    }
    return true;
  };

  // handle submit btn
  handleSubmitBnt = () => {
    // clear error

    this.setState({
      proposalPrepTimeError: '',
      proposalSelectionTimeError: '',
    });

    if (this.validation()) {
      const {
        proposalPrepTime,
        selectionTimeType,
        proposalPrepTimeType,
        proposalSelectionTime,
      } = this.state;

      const {isChangeMode} = this.props;

      const {
        deliveryFee,
        items,
        deliveryModeId,
        deliveryVehicleId,
        eta,
      } = this.props.createProposalData;

      // start loading
      this.setState({
        isLoading: true,
      });

      let payload = {
        delivery_mode_id: deliveryModeId,
        delivery_vehicle_id: deliveryVehicleId,
        delivery_fee: deliveryFee ? deliveryFee : 0,
        eta: eta,
        items: arrangeProductData(items),
        proposal_selection_time: util.convertToMinutes(
          proposalSelectionTime,
          selectionTimeType.slug,
        ),
        proposal_prep_time: util.convertToMinutes(
          proposalPrepTime,
          proposalPrepTimeType.slug,
        ),
      };

      if (_.isNil(payload.eta)) {
        delete payload['eta'];
      }

      console.log({payload});

      if (isChangeMode) {
        (payload['id'] = this.props.orderDetail.id),
          this.props.changeDeliveryModeRequest(payload, (status) => {
            //  start loading
            this.setState({
              isLoading: false,
            });

            if (status) {
              Actions.reset('drawerMenu');
            }
          });
      } else {
        (payload['rfp_id'] = this.props.orderDetail.id),
          this.props.createProposalRequest(payload, (status) => {
            // start loading
            this.setState({
              isLoading: false,
            });

            if (status) {
              this.openModal();
            }
          });
      }
    }
  };

  handleRevisionSubmit = () => {
    // clear error
    const {alertMessage} = this.props;
    this.setState({
      proposalPrepTimeError: '',
      proposalSelectionTimeError: '',
    });
    if (this.validation()) {
      const {items} = this.props.createProposalData;
      if (_.isEmpty(items)) {
        // util.topAlert(strings.REVISION_PROPOSAL_NOT_EMPTY);
        alertMessage(strings.REVISION_PROPOSAL_NOT_EMPTY);
        return true;
      }
      // start loading
      this.setState({
        isLoading: true,
      });
      const payload = {
        proposal_id: this.props.orderDetail.id,
        items: arrangeProductData(items),
      };
      this.props.updateProposalRequest(payload, (status) => {
        // start loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          // todo find good way to do this
          this.openModal();
        }
      });
    }
  };

  // get delivery fees and eta, set into state
  handleDeliveryFees = (deliveryFees, eta) => {
    this.setValue({
      eta: eta,
      deliveryFees: deliveryFees,
    });
  };

  // handle remove product item

  handleRemovePrdItem = (index) => {
    this.props.createProposalInternalRemoveItem(index);
  };

  handleTimeOptionSheet = (state) => {
    if (state == 'on') {
      return this.refRBSheet.open();
    }
    return this.refRBSheet.close();
  };

  // handle  proposal time type in days mintues or sec
  handleProposalTimeType = (val) => {
    // close modal
    this.handleTimeOptionSheet();
    const {timeBottomSheetFor} = this.state;
    // setstate if this preperation time
    if (timeBottomSheetFor === 'proposalPrepTime') {
      return this.setState({
        proposalPrepTimeType: val,
      });
    }
    // setstate if this time out
    if (timeBottomSheetFor === 'timeOut') {
      return this.setState({
        selectionTimeType: val,
      });
    }
  };

  render() {
    const {
      activeIndex,
      openPaymentModal,
      activeVendorItemIndex,
      vendorItemsList,
      activeModeId,
      activeVehicleId,
      removeItemModal,
      isLoading,
      eta,
      deliveryFees,
      activeModeIdError,
      activeVehicleIdError,
      proposalPrepTime,
      proposalPrepTimeError,
      proposalSelectionTime,
      proposalSelectionTimeError,
      isPickup,
      proposalPrepTimeType,
      selectionTimeType,
      availbleDeliveryVehicle,
      isOnlineDeliveryAvailable,
      isOfflineDeliveryAvailable,
      loadingScreen,
    } = this.state;

    return (
      <ProposalCreationView
        availbleDeliveryVehicle={availbleDeliveryVehicle}
        selectionTimeType={selectionTimeType}
        proposalPrepTimeType={proposalPrepTimeType}
        isPickup={isPickup}
        proposalPrepTime={proposalPrepTime}
        proposalPrepTimeError={proposalPrepTimeError}
        proposalSelectionTime={proposalSelectionTime}
        proposalSelectionTimeError={proposalSelectionTimeError}
        activeModeIdError={activeModeIdError}
        activeVehicleIdError={activeVehicleIdError}
        eta={eta}
        deliveryFees={deliveryFees}
        isOnlineDeliveryAvailable={isOnlineDeliveryAvailable}
        isOfflineDeliveryAvailable={isOfflineDeliveryAvailable}
        isLoading={isLoading}
        activeIndex={activeIndex}
        activeModeId={activeModeId}
        activeVehicleId={activeVehicleId}
        vendorItemsList={vendorItemsList}
        activeVendorItemIndex={activeVendorItemIndex}
        openPaymentModal={openPaymentModal}
        removeItemModal={removeItemModal}
        loadingScreen={loadingScreen}
        handleTimeOptionSheet={this.handleTimeOptionSheet}
        handleProposalTimeType={this.handleProposalTimeType}
        handleRevisionSubmit={this.handleRevisionSubmit}
        handleDeliveryFees={this.handleDeliveryFees}
        handleIndex={this.handleIndex}
        openModal={this.openModal}
        handleSubmitBnt={this.handleSubmitBnt}
        onConfirm={this.onConfirm}
        closeModal={this.closeModal}
        handleNewItemPress={this.handleNewItemPress}
        setActiveId={this.setActiveId}
        setValue={(data) => this.setValue(data)}
        handleVendorItemsIndex={this.handleVendorItemsIndex}
        handleRemovePrdItem={this.handleRemovePrdItem}
        // new
        handleSetPrice={this.handleSetPrice}
        handleProposalCreation={this.handleProposalCreation}
        handleAddNewItems={this.handleAddNewItems}
        handleProductItemsData={this.handleProductItemsData}
        {...this.props}
        refRBSheet={(ref) => {
          this.refRBSheet = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({general, rfp, vendorStore, driver}) => ({
  deliveryModes: general.appSettings.delivery_modes,
  deliveryVehicles: general.appSettings.delivery_vehicles,
  createProposalData: rfp.createProposal,
  storeProfile: vendorStore.storeProfile,
  riders: driver.storeDriver,
});

const actions = {
  createProposalRequest,
  updateProposalRequest,
  createProposalInternal,
  createProposalInternalItems,
  createProposalInternalAddNewItems,
  createProposalInternalAddNewProposal,
  createProposalInternalRemoveItem,
  storeDriversRequest,
  alertMessage,
  changeDeliveryModeRequest,
};

export default connect(mapStateToProps, actions)(ProposalCreationController);
