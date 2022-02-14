import React from 'react';
import _ from "lodash"
import {DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import SelectLocationMapView from './SelectLocationMapView';
import {connect} from 'react-redux';
import {Metrics} from '../../theme';
import util from '../../util';
import {getCurrentRegion, getAddress} from '../../helpers/locationHelper';
import {Actions} from 'react-native-router-flux';

class SelectLocationMapController extends React.Component {
  constructor() {
    super();
    this.state = {
      isStaticPinVisible: true,
      locationData: {},
      initialCoordinates: {},
      isLoading: true,
    };
  }
  static propTypes = {
    handleGetAddressData: PropTypes.func,
  };
  static defaultProps = {
    handleGetAddressData: () => {},
  };

  async componentDidMount() {
    this.handleLocation();
    this.handleLocationListener();
  }

  componentWillUnmount() {
    this.handleLocationListener();
  }

  // listener when user off or on location
  handleLocationListener = () => {
    DeviceEventEmitter.addListener('locationProviderStatusChange', (status) => {
      // only trigger when "providerListener" is enabled
      //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
      if (status.enabled) {
        this.setState({
          isLoading: true,
        });
        this.handleLocation();
      }
    });
  };

  // get current location or current region
  handleLocation = async () => {
    let checkIsLocation = await util.checkIsLocation();
    if (checkIsLocation) {
      let getCoordinates = await util.getCoordinates();

      this.setState({
        isLoading: false,
        initialCoordinates: {
          latitude: getCoordinates.coordinates.latitude,
          longitude: getCoordinates.coordinates.longitude,
        },
      });
    } else {
      let currentRegion = await getCurrentRegion();
      this.setState({
        isLoading: false,
        initialCoordinates: {
          latitude: currentRegion.lat,
          longitude: currentRegion.lng,
        },
      });
    }
  };

  setValue = (key) => {
    this.setState(key);
  };

  handleRegionChangeComplete = (data) => {
    //  get data and set user select data
    this.focusOnZoomOut()

    getAddress(data.latitude, data.longitude).then((res) => {
      // this function set the state of mapLocationAddress present in HomeController

      let finalAddress = {formatted_address: res, ...data};

      this.props.handleGetAddressData(finalAddress);

      this.setState({
        locationData: finalAddress,
        isStaticPinVisible: false,
      });
    });
  };

  // handle region change
  handleRegionChange = () => {
    this.focusOnZoomIn()

    if (!this.state.isStaticPinVisible) {
      this.setState({
        isStaticPinVisible: true,
      });
    }
  };




  focusOnZoomIn=()=>{
    if( !_.isNil(this.handleIconRef)){this.handleIconRef.transitionTo({scaleX:0.7})}
 
   }
 
   focusOnZoomOut=()=>{
     if( !_.isNil(this.handleIconRef)){this.handleIconRef.transitionTo({scaleY:1,scaleX:1})}
 }


  handleSearchLocation = (data) => {
    Actions.pop();
    let finalAddress = {
      formatted_address: data.formatted_address,
      latitude: data.geometry.location.lat,
      longitude: data.geometry.location.lng,
    };
    // set search data in state
    this.setState({
      locationData: finalAddress,
    });

    // callback function
    this.props.handleGetAddressData(finalAddress);
    // focus on search location
    this.focusOnUpdatedLocation(finalAddress);
  };

  // focus on search location
  focusOnUpdatedLocation = (data) => {
    this.mapRef &&
      this.mapRef.animateToRegion(
        {
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        2000,
      );
  };

  setMapRef = (ref) => {
    this.mapRef = ref;
  };

  render() {
    const {
      locationData,
      isStaticPinVisible,
      initialCoordinates,
      isLoading,
    } = this.state;

    return (
      <SelectLocationMapView
        {...this.props}
        mapRef={(ref) => {
          this.mapRef = ref;
        }}
        handleSearchLocation={this.handleSearchLocation}
        isLoading={isLoading}
        initialCoordinates={initialCoordinates}
        isStaticPinVisible={isStaticPinVisible}
        locationData={locationData}
        handleRegionChangeComplete={this.handleRegionChangeComplete}
        handleRegionChange={this.handleRegionChange}
        setMapRef={this.setMapRef}
        handleIconRef={ref => {
          this.handleIconRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SelectLocationMapController);
