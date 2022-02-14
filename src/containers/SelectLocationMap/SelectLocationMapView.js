import React from 'react';
import _ from 'lodash';
import {
  View,
  TouchableOpacity,
  Image as RnImage,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';

import styles from './SelectLocationMapStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {LATITUDE_DELTA, strings, PLACES_API_KEY} from '../../constants';
import {
  AddressInputField,
  Button,
  CustomNavbar,
  Loader,
  Text,
} from '../../components';
import util from '../../util';
import {DriverInfoModal} from '..';
import {filterList} from '../../helpers/generalHelper';
import MapViewDirections from 'react-native-maps-directions';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

// export default function MapsView(props) {
export default class SelectLocationMapView extends React.Component {
  render() {
    const {
      handleRegionChange,
      handleRegionChangeComplete,
      locationData,
      isStaticPinVisible,
      initialCoordinates,
      isLoading,
      handleSearchLocation,
      setMapRef,
    } = this.props;

    return (
      <>
        <CustomNavbar
          title={strings.SELECT_LOCATION}
          titleColor={Colors.text.secondary}
          hasBack={true}
          hasBottomRadius={true}
        />
        <View style={styles.mapWraper}>
          {isLoading && <Loader loading={isLoading} />}

          {!isLoading && (
            <>
              <View style={styles.searchWrap}>
                <View
                  style={[
                    styles.searchWrapper,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      Actions.searchLocation({
                        handleSearchLocation: handleSearchLocation,
                      });
                    }}
                    style={[
                      {
                        flexDirection: 'row',
                        width: '100%',
                      },
                      util.isRTL() && AppStyles.rowReverse,
                    ]}>
                    <RnImage
                      source={Images.WasphaIcon}
                      style={[styles.icon, AppStyles.mRight15]}
                    />
                    <View style={styles.locationTextWrap}>
                      <Text
                        size={Fonts.size.xSmall}
                        type="medium"
                        textAlign={util.rtlRightText()}
                        numberOfLines={1}>
                        {locationData.formatted_address &&
                          locationData.formatted_address}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {isStaticPinVisible && (
                <View style={styles.staticIcon}>
                  <View style={{top: -2}}>
                    <Animatable.Image
                      useNativeDriver={true}
                      ref={(ref) => {
                        this.props.handleIconRef(ref);
                      }}
                      source={Images.CurrentPin}
                      style={[styles.currentPin, {zIndex: 999}]}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              )}

              <MapView
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={(data) => {
                  handleRegionChangeComplete(data);
                }}
                onRegionChange={(data) => {
                  handleRegionChange(data);
                }}
                zoomEnabled={true}
                ref={(ref) => {
                  this.props.mapRef(ref);
                }}
                style={styles.map}
                initialRegion={{
                  ...initialCoordinates,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {!isStaticPinVisible && (
                  <Marker
                    // draggable
                    coordinate={{
                      latitude: locationData.latitude,
                      longitude: locationData.longitude,
                    }}
                    // onDragEnd={(e) => console.log({coordinate: e})}
                  >
                    <RnImage
                      source={Images.CurrentPin}
                      style={styles.currentPin}
                    />
                  </Marker>
                )}
              </MapView>
              <View style={styles.btnWrap}>
                <LinearGradient
                  start={{x: 0.3, y: 2}}
                  end={{x: 1, y: 0}}
                  colors={Colors.gradient.primary}
                  style={styles.gradBtn}>
                  <Button
                    color={Colors.button.hexa}
                    background={Colors.transparent}
                    style={styles.loginBtn}
                    size={Fonts.size.normal}
                    onPress={() => {
                      Actions.pop();
                    }}
                    type="semiBold">
                    {strings.CONFIRM.toUpperCase()}
                  </Button>
                </LinearGradient>
              </View>
            </>
          )}
        </View>
      </>
    );
  }
}
