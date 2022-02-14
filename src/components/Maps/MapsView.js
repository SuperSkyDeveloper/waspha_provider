import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {View, TouchableOpacity, Image as RnImage, Platform} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './MapsStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {LATITUDE_DELTA, strings, PLACES_API_KEY} from '../../constants';
import Text from '../Text';
import util from '../../util';
import {DriverInfoModal} from '..';

//import {GOOGLE_COUNTRY_APIKEY} from '../../constants';
import MapViewDirections from 'react-native-maps-directions';

// export default function MapsView(props) {

export default class MapsView extends React.Component {
  handleMapReady = () => {
    return () =>
      this.mapRef.fitToCoordinates(directionData, {
        edgePadding: {top: 0, right: 0, bottom: 200, left: 10},
        animated: false,
      });
  };

  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  render() {
    const {
      mapHeight,
      mapStyle,
      riders,
      coordinates,
      selectedRider,
      pressSelectedRider,
      onMapDrag,
      initialRoute,
      directionData,
      handleAssignDriver,
      assignOnlineLoader,
      vehicleIcon,
      getAddress,
      fromWasphaExpress,
      riderTimeAndKM,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.mapContainer, {height: mapHeight}, mapStyle]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={(ref) => {
              this.mapRef = ref;
            }}
            enablePoweredByContainer={false}
            // onMapReady={Platform.OS === 'android' ? this.handleMapReady : null}
            onLayout={Platform.OS === 'ios' ? this.handleMapReady : null}
            onPanDrag={onMapDrag}
            zoomEnabled={true}
            style={styles.map}
            onRegionChangeComplete={(region) => {
              getAddress(region.latitude, region.longitude);
            }}
            initialRegion={{
              ...initialRoute,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {/* directions start*/}

            {directionData &&
              directionData.map((item, index) => {
                let vehicleImg = '';

                if (index === 2 && !_.isEmpty(vehicleIcon)) {
                  //driver
                  vehicleImg = {uri: vehicleIcon};
                }

                if (index === 0) {
                  //vendor
                  vehicleImg = Images.VendorIcon;
                }

                if (index === 1) {
                  //user
                  vehicleImg = Images.PinIcon;
                }

                return (
                  <>
                    <Marker coordinate={item}>
                      <View style={styles.imgWrap}>
                        <RnImage
                          source={vehicleImg}
                          style={styles.vehicleIcon}
                        />
                      </View>

                      {index === 2 && (
                        <MapView.Callout tooltip={true}>
                          <TouchableOpacity>
                            <View style={styles.callOutStyle}>
                              <View
                                style={[
                                  styles.vendorDetailWrap,
                                  {minHeight: 55},
                                ]}>
                                <View
                                  style={[
                                    AppStyles.flexRow,
                                    {
                                      marginTop: 6,
                                      left: 20,
                                    },
                                  ]}>
                                  <Text
                                    style={{textAlign: 'center'}}
                                    type="semiBold"
                                    size={Fonts.size.xxxSmall}>
                                    {/* {renderNameStringAndImageRender(
                                      vendor.business_name,
                                    )} */}

                                    {_.isNil(riderTimeAndKM.distance)
                                      ? '0 KM'
                                      : `${(
                                          riderTimeAndKM.distance.value / 1000
                                        ).toFixed(2)} KM`}
                                  </Text>
                                </View>

                                <View
                                  style={[
                                    util.isRTL() && {
                                      justifyContent: 'flex-end',
                                    },
                                    AppStyles.flexRow,
                                    AppStyles.mTop30,
                                  ]}>
                                  <Text
                                    type="semiBold"
                                    size={Fonts.size.xxxSmall}
                                    style={{
                                      top: -1,
                                      right: _.isNil(riderTimeAndKM.duration)
                                        ? 10
                                        : 17,
                                      textAlign: 'center',
                                    }}>
                                    {_.isNil(riderTimeAndKM.duration)
                                      ? '0 min'
                                      : moment
                                          .duration({
                                            minutes:
                                              riderTimeAndKM.duration.value /
                                              60,
                                          })
                                          .humanize()}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </MapView.Callout>
                      )}
                    </Marker>

                    {/* <MapViewDirections
                      origin={directionData[0]}
                      destination={directionData[index]}
                      apikey={PLACES_API_KEY}
                      strokeWidth={3}
                      strokeColor={Colors.black}
                    /> */}
                  </>
                );
              })}
            {/* directions marker end*/}
            {/* {util.isEmpty(selectedRider) && (
              <Marker
                coordinate={{
                  latitude: selectedRider.location.lat,
                  longitude: selectedRider.location.lng,
                }}
                image={selectedRider.vehicleImage}
                onPress={pressSelectedRider}
              />
            )} */}
            {/* rider list on map start*/}
            {util.isEmpty(riders) &&
              riders.map((item, index) => {
                return (
                  <DriverInfoModal
                    fromWasphaExpress={fromWasphaExpress}
                    key={index}
                    data={item}
                    handleAssignDriver={handleAssignDriver}
                    isLoading={assignOnlineLoader}
                  />
                );
              })}
            {/* rider list on map end*/}
          </MapView>
        </View>
      </View>
    );
  }
}
