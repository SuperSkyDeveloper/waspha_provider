import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrderPlaceView from './OrderPlaceView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings, NAME_LENGTH, DESC_LENGTH} from '../../constants';
import BottomSheet from 'react-native-bottomsheet';
import {ISOToFormat, GetCurrentTimeInISO} from '../../helpers/generalHelper';
import {Actions} from 'react-native-router-flux';
import {alertMessage} from '../../actions/GeneralActions';
import {placeTraditionalOrderRequest} from '../../actions/OrdersActions';

class OrderPlaceController extends React.Component {
  constructor() {
    super();
    this.state = {
      addItem: false,
      firstTimeAddItem: true,
      itemTitle: '',
      itemRequirements: '',

      addedItems: [],
      activeIndex: 0,
      itemList: [],
      openCalender: false,
      selectedValueOfDropdown: strings.NOW,
      counter: 0,
      removeItemModal: false,

      loading: false,
      scheduled_delivery_time: '',
      packageCharge: 0,
      packageChargeError: '',
      deliveryFee: 0,
      deliveryFeeError: '',
      waitingTollCharges: 0,
      waitingTollChargesError: '',
      totalCharges: 0,
    };
  }
  static propTypes = {
    dropOffLocation: PropTypes.object,
    pickUpLocation: PropTypes.object,
  };
  static defaultProps = {dropOffLocation: {}, pickUpLocation: {}};

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.packageCharge !== this.state.packageCharge ||
      prevState.deliveryFee !== this.state.deliveryFee ||
      prevState.waitingTollCharges !== this.state.waitingTollCharges
    ) {
      let totalCharges =
        _.toNumber(this.state.packageCharge) +
        _.toNumber(this.state.deliveryFee) +
        _.toNumber(this.state.waitingTollCharges);
      this.setState({totalCharges});
    }
  }

  itemTitleFocus = () => {
    this.itemTitleRef.focus();
  };

  itemRequirementsFocus = () => {
    this.itemRequirementsRef.focus();
  };

  validation = () => {
    const {alertMessage} = this.props;
    const {itemTitle, itemRequirements} = this.state;
    if (_.isEmpty(itemTitle) && _.isEmpty(itemRequirements)) {
      // util.topAlert(strings.PLEASE_FILL_ITEM_DETAILS);
      alertMessage(strings.PLEASE_FILL_ITEM_DETAILS);
      this.itemTitleFocus();
      return false;
    } else if (_.isEmpty(itemTitle)) {
      // util.topAlert(strings.TITLE_REQ);
      alertMessage(strings.TITLE_REQ);
      this.itemTitleFocus();
      return false;
    } else if (_.isEmpty(itemRequirements)) {
      // util.topAlert(strings.GIVE_REQUIREMENT);
      alertMessage(strings.GIVE_REQUIREMENT);
      this.itemRequirementsFocus();
      return false;
    }
    return true;
  };

  addNewItem = () => {
    const {
      firstTimeAddItem,
      addedItems,
      itemTitle,
      itemRequirements,
      itemImage,
    } = this.state;

    const totalItems = _.cloneDeep(addedItems);
    const item = {
      name: itemTitle,
      description: itemRequirements,
      image: itemImage,
    };

    if (firstTimeAddItem) {
      this.setState({firstTimeAddItem: false, addItem: true});
      return true;
    } else {
      if (this.validation()) {
        totalItems.push(item);
        this.setState({
          itemTitle: '',
          itemRequirements: '',

          addedItems: totalItems,
          addItem: true,
        });
      }
    }
    this.setState({addItem: true});
  };

  setValue = (key) => {
    console.log(key);
    this.setState(key);
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

  hanldeNewItemPress = () => {
    let findArray = this.state.itemList.length;

    if (findArray !== 0) {
      if (!this.validate()) {
        return true;
      }
    }

    this.setState({
      activeIndex: findArray,
      itemList: [
        ...this.state.itemList,
        {
          id: findArray,
          name: '',
          description: '',
          quantity: 1,
          nameError: '',
          descError: '',
          quantityError: '',
        },
      ],
    });
  };

  validate = () => {
    const tempList = _.cloneDeep(this.state.itemList);

    let valid = true;

    if (_.isEmpty(tempList)) {
      return valid;
    }

    if (_.isEmpty(tempList[tempList.length - 1].name)) {
      tempList[tempList.length - 1].nameError = strings.NAME_IS_REQ; //'Name is required'
      this.setState({itemList: tempList});
      valid = false;
      return valid;
    }

    if (tempList[tempList.length - 1].quantity === 0) {
      tempList[tempList.length - 1].quantityError =
        strings.QUANTITY_CANNOT_BE_ZERO; //'Quantity cannot be zero'
      this.setState({itemList: tempList});
      valid = false;
      return valid;
    }

    return valid;
  };

  //removes item from list
  handleRemoveItem = (removeItemIndex) => {
    const {itemList} = this.state;

    const filteredItems = itemList.filter((item) => {
      return item.id !== removeItemIndex;
    });

    this.setState({itemList: filteredItems});
  };

  //performs the changes in any field of list item
  onChangeFiled = (key, index, value) => {
    const tempState = _.cloneDeep(this.state.itemList);

    if (key === 'name' && value.length > NAME_LENGTH) {
      tempState[index].nameError = strings.CHARACTER_LIMIT_EXCEEDED;
      this.setState({
        itemList: tempState,
      });
      return true;
    } else if (key === 'name') {
      tempState[index].nameError = '';
    }

    if (key === 'description' && value.length > DESC_LENGTH) {
      tempState[index].descError = strings.CHARACTER_LIMIT_EXCEEDED;
      this.setState({
        itemList: tempState,
      });
      return true;
    }
    if (key === 'quantity') {
      tempState[index].quantityError = '';
    }

    tempState[index][key] = value;
    this.setState({
      itemList: tempState,
    });
  };

  //open the time schedule bottom sheet
  openBottomSheet = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: [strings.NOW, strings.SCHEDULE],
        title: strings.SCHEDULE_YOUR_DELIVERY_TIME,
        dark: false,
        cancelButtonIndex: 0,
      },
      (value) => {
        if (value === 0) {
          this.setState({
            selectedValueOfDropdown: strings.NOW,
          });
        }
        if (value === 1) {
          this.setState({
            selectedValueOfDropdown: strings.SCHEDULE,
            openCalender: true,
          });
        }
      },
    );
  };

  submitValidate = () => {
    const {
      deliveryFee,
      deliveryFeeError,
      packageCharge,
      packageChargeError,
      waitingTollCharges,
      waitingTollChargesError,
      itemList,
    } = this.state;
    const {alertMessage} = this.props;
    let validate = true;

    if (_.isEmpty(itemList)) {
      alertMessage(strings.ADD_ONE_ITEM);
      validate = false;
    }

    // if (_.isEmpty(deliveryFee)) {
    //   this.setState({
    //     deliveryFeeError: util.isRequiredErrorMessage('Delivery Fee'),
    //   });
    //   validate = false;
    // }

    if (_.isEmpty(packageCharge)) {
      this.setState({
        packageChargeError: strings.PACKAGE_CHARGE_IS_REQ,
        //util.isRequiredErrorMessage(strings.PACKAGE_CHARGE),
      });
      validate = false;
    }

    // if (_.isEmpty(waitingTollCharges)) {
    //   this.setState({
    //     waitingTollChargesError: util.isRequiredErrorMessage('waitingTollCharges'),
    //   });
    //   validate = false;
    // }

    return validate;
  };

  renderSubmitBtn = () => {
    console.log({itemList: this.state.itemList});
    const {
      dropOffLocation,
      pickUpLocation,
      placeTraditionalOrderRequest,
      alertMessage,
    } = this.props;
    const {itemList, totalCharges, packageCharge} = this.state;

    this.setState({
      packageChargeError: '',
    });

    let data = [];

    itemList.map((item) => {
      let itemData = {
        title: item.name,
        description: item.description,
        quantity: item.quantity,
      };
      data.push(itemData);
    });

    if (this.validate() && this.submitValidate()) {
      this.setState({loading: true});

      const payload = {
        delivery_location: dropOffLocation,
        pickup_location: pickUpLocation,
        items: data,
        package_charges: packageCharge,
      };
      placeTraditionalOrderRequest(payload, (res) => {
        this.setState({loading: false});

        if (res.status) {
          if (_.isEmpty(res.data.delivery_vehicles)) {
            return alertMessage(strings.NO_RIDER_AVAILABLE);
          }
          return Actions.wasphaExpress({
            totalCharges,
            isShowBSheet: true,
          });
        }
      });
    }
  };

  // selects the value from dropdown list
  setSelectedDropDownValue = (value) => {
    this.setState({
      selectedValueOfDropdown: value.toString(),
    });
  };

  render() {
    const {
      itemTitle,
      itemRequirements,

      addItem,
      addedItems,
      activeIndex,
      itemList,
      openCalender,
      selectedValueOfDropdown,
      removeItemModal,
      loading,
      packageCharge,
      packageChargeError,
      deliveryFee,
      deliveryFeeError,
      waitingTollCharges,
      waitingTollChargesError,
      totalCharges,
    } = this.state;

    return (
      <OrderPlaceView
        itemTitle={itemTitle}
        itemRequirements={itemRequirements}
        addItem={addItem}
        addedItems={addedItems}
        openCalender={openCalender}
        removeItemModal={removeItemModal}
        loading={loading}
        packageCharge={packageCharge}
        packageChargeError={packageChargeError}
        deliveryFee={deliveryFee}
        deliveryFeeError={deliveryFeeError}
        waitingTollCharges={waitingTollCharges}
        waitingTollChargesError={waitingTollChargesError}
        totalCharges={totalCharges}
        addNewItem={this.addNewItem}
        handleIndex={this.handleIndex}
        activeIndex={activeIndex}
        setValue={(data) => this.setValue(data)}
        itemList={itemList}
        renderSubmitBtn={this.renderSubmitBtn}
        hanldeNewItemPress={this.hanldeNewItemPress}
        handleRemoveItem={this.handleRemoveItem}
        onChangeFiled={this.onChangeFiled}
        setSelectedValue={this.setSelectedValue}
        selectedValueOfDropdown={selectedValueOfDropdown}
        counter={this.state.counter}
        submitOrder={this.submitOrder}
        itemTitleRef={(ref) => {
          this.itemTitleRef = ref;
        }}
        itemRequirementsRef={(ref) => {
          this.itemRequirementsRef = ref;
        }}
        setSelectedDropDownValue={this.setSelectedDropDownValue}
        openBottomSheet={this.openBottomSheet}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {alertMessage, placeTraditionalOrderRequest};

export default connect(mapStateToProps, actions)(OrderPlaceController);
