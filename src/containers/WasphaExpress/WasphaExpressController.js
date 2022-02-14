import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import WasphaExpressView from './WasphaExpressView';
import {connect} from 'react-redux';
import Geocoder from 'react-native-geocoder';
import util from '../../util';
import {Images, Colors} from '../../theme';
import {GOOGLE_MAPS_APIKEY, strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {alertMessage} from '../../actions/GeneralActions';
import {selectWasphaBoxVehicleRequest} from '../../actions/OrdersActions';
import {View} from 'react-native';

class WasphaExpressController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      isBottomSheet: true,
      pickAddress: '',
      pickupAddressLat: '',
      pickupAddressLng: '',
      dropAddress: '',
      dropAddressLat: '',
      dropAddressLng: '',
      isPickShow: false,
      item: _.isEmpty(props.wasphaVehicles) ? {} : props.wasphaVehicles[0],
      itemId: _.isEmpty(props.wasphaVehicles) ? 0 : props.wasphaVehicles[0].id,
      showDevivery: false,
      loader: true,
      vehicleLoader: false,
      showRider: props.isRiderFound,
      isFindingRider: false,
      showMessageModal: false,
      someRandomNumber: _.random(100, true),
    };
    this.RBSheet = React.createRef();
  }

  static propTypes = {
    selectedRider: PropTypes.object,
    isShowBSheet: PropTypes.bool,

    dropOffLocation: PropTypes.object,
    pickUpLocation: PropTypes.object,
    itemList: PropTypes.array,

    totalCharges: PropTypes.number,
    traditionalOrderDetails: PropTypes.object,
    wasphaVehicles: PropTypes.array,
  };
  static defaultProps = {
    selectedRider: {
      id: 2,
      name: 'Rider DEF',
      vehicleImage: Images.MapCarIcon,
      location: {
        lat: 24.98028,
        lng: 67.136917,
      },
    },

    isShowBSheet: false,

    dropOffLocation: {},
    pickUpLocation: {},

    itemList: [],
    totalCharges: '',
    traditionalOrderDetails: {},
    wasphaVehicles: [],
  };

  async componentDidMount() {
    let cords;

    if (!util.isPlatformAndroid()) {
      cords = await util.checkIsLocation();
      Actions.refresh({key: 'wasphaExpress'});
    } else {
      let a = await util.checkIsLocation();
      console.log({a});
      a === true ? (cords = await util.getCoordinates()) : '';
    }

    const {coordinates} = cords;

    if (_.isNil(coordinates)) {
      Actions.pop();
      return true;
    }

    this.setState({coordinates}, () => {
      this.setState({loader: false});
    });

    if (this.props.isShowBSheet) {
      this.RBSheet.current.open();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log({someRandomNumber: this.state.someRandomNumber});
    if (
      prevState.someRandomNumber !== this.state.someRandomNumber &&
      this.props.isRiderFound === false
    ) {
      console.log({isRiderFoundfalse: this.props.isRiderFound});
      this.setState({isFindingRider: false, showMessageModal: true});
      this.RBSheet.current.close();
    }

    if (
      prevState.someRandomNumber !== this.state.someRandomNumber &&
      this.props.isRiderFound === true
    ) {
      console.log({isRiderFoundtrue: this.props.isRiderFound});

      this.setState({isFindingRider: false});
    }
  }

  async renderLocation() {
    let cords;
    let a = await util.checkIsLocation();
    a === true ? (cords = await util.getCoordinates()) : '';

    const {coordinates} = cords;

    this.setState({coordinates}, () => {
      this.setState({loader: false});
    });
  }

  setValue = (key) => {
    this.setState(key);
  };

  renderPickLocation = () => {
    this.setState({
      isPickShow: true,
    });
  };
  PickLocationChange = () => {
    this.setState({
      isPickShow: false,
    });
  };
  getAddress = async (lat, lng) => {
    const {isPickShow} = this.state;

    Geocoder.fallbackToGoogle(GOOGLE_MAPS_APIKEY);
    let result = await Geocoder.geocodePosition({lat, lng});

    {
      !isPickShow &&
        this.setState({
          pickupAddressLat: lat,
          pickupAddressLng: lng,
          pickAddress: result[0].formattedAddress,
        });
    }
    {
      isPickShow &&
        this.setState({
          dropAddressLat: lat,
          dropAddressLng: lng,
          dropAddress: result[0].formattedAddress,
        });
    }
  };

  renderEachItemClick = (item) => {
    console.log({item});
    return this.setState({
      item,
      itemId: item.id,
    });
  };
  renderDevilery = () => {
    const {selectWasphaBoxVehicleRequest, traditionalOrderDetails} = this.props;
    const {itemId} = this.state;
    const payload = {vehicle_id: itemId, order_id: traditionalOrderDetails.id};
    this.setState({vehicleLoader: true, someRandomNumber: _.random(100, true)});
    selectWasphaBoxVehicleRequest(payload, (res) => {
      this.setState({vehicleLoader: false});

      if (res) {
        this.RBSheet.current.close();

        return this.setState({
          isFindingRider: true,
        });
      }
    });
  };
  renderOrderplace = () => {
    const {
      pickAddress,
      pickupAddressLat,
      pickupAddressLng,
      dropAddress,
      dropAddressLat,
      dropAddressLng,
    } = this.state;
    const {alertMessage} = this.props;

    if (_.isEmpty(dropAddress)) {
      alertMessage(strings.PLEASE_SELECT_DROPOFF);
      return true;
    }

    return Actions.orderPlace({
      RBSheet: this.RBSheet,
      dropOffLocation: {
        lat: dropAddressLat,
        lng: dropAddressLng,
        address: dropAddress,
      },
      pickUpLocation: {
        lat: pickupAddressLat,
        lng: pickupAddressLng,
        address: pickAddress,
      },
    });
  };

  render() {
    const {
      coordinates,
      pickAddress,
      isPickShow,
      dropAddress,
      isBottomSheet,
      itemId,
      showDevivery,
      loader,
      item,
      vehicleLoader,
      showRider,
      isFindingRider,
      showMessageModal,
    } = this.state;

    const ref = this.RBSheet;

    return !util.isPlatformAndroid() ? (
      <View>
        <WasphaExpressView
          getAddress={this.getAddress}
          isBottomSheet={isBottomSheet}
          pickAddress={pickAddress}
          coordinates={coordinates}
          isPickShow={isPickShow}
          RBSheetRef={ref}
          showDevivery={showDevivery}
          itemId={itemId}
          item={item}
          loader={loader}
          vehicleLoader={vehicleLoader}
          showRider={showRider}
          isFindingRider={isFindingRider}
          showMessageModal={showMessageModal}
          renderOrderplace={this.renderOrderplace}
          renderDevilery={this.renderDevilery}
          renderEachItemClick={this.renderEachItemClick}
          PickLocationChange={this.PickLocationChange}
          renderPickLocation={this.renderPickLocation}
          dropAddress={dropAddress}
          setValue={(data) => this.setValue(data)}
          {...this.props}
        />
      </View>
    ) : (
      <WasphaExpressView
        getAddress={this.getAddress}
        isBottomSheet={isBottomSheet}
        pickAddress={pickAddress}
        coordinates={coordinates}
        isPickShow={isPickShow}
        RBSheetRef={ref}
        showDevivery={showDevivery}
        itemId={itemId}
        item={item}
        loader={loader}
        vehicleLoader={vehicleLoader}
        showRider={showRider}
        isFindingRider={isFindingRider}
        showMessageModal={showMessageModal}
        renderOrderplace={this.renderOrderplace}
        renderDevilery={this.renderDevilery}
        renderEachItemClick={this.renderEachItemClick}
        PickLocationChange={this.PickLocationChange}
        renderPickLocation={this.renderPickLocation}
        dropAddress={dropAddress}
        setValue={(data) => this.setValue(data)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, proposal}) => ({
  user: user.data,
  isRiderFound: proposal.isRiderFound,
  traditionalOrderDetails: proposal.traditionalOrderDetails,
  wasphaVehicles: proposal.wasphaVehicles,
});

const actions = {alertMessage, selectWasphaBoxVehicleRequest};

export default connect(mapStateToProps, actions)(WasphaExpressController);
