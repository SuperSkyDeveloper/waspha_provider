import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Loader, StarRating, Text} from '../../components';
import MapView, {Marker} from 'react-native-maps';
import styles from './DriverInfoModalStyles';
import {AppStyles, Colors, Fonts, Images} from './../../theme';
import util from '../../util';
import {strings} from '../../constants';
import {filterList} from '../../helpers/generalHelper';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function DriverInfoModalView(props) {
  const {
    data,
    deliveryVehicles,
    handleAssignDriver,
    isLoading,
    fromWasphaExpress,
  } = props;
  let vehicleImage =
    data.vehicle_id &&
    filterList(deliveryVehicles, data.vehicle_id).image.color;

  return (
    <>
      {!_.isEmpty(data) && (
        <Marker
          coordinate={{
            latitude: data && data.location.lat,
            longitude: data && data.location.lng,
          }}
          isPreselected={true}>
          <RnImage
            source={{uri: vehicleImage}}
            style={{width: 100, height: 28}}
            resizeMode="contain"
          />
          <MapView.Callout
            tooltip={true}
            onPress={() => {
              handleAssignDriver(data.id);
            }}>
            <TouchableOpacity>
              <View style={styles.callOutStyle}>
                <TouchableOpacity style={styles.riderDetailWrap}>
                  <Text
                    textAlign="center"
                    type="semiBold"
                    size={Fonts.size.xxSmall}>
                    {util.isEmpty(data.name) &&
                      renderNameStringAndImageRender(data.name)}
                  </Text>
                  <View style={styles.riderRatingWrap}>
                    {/* <Rating
                      isDisabled={true}
                      ratingCount={5}
                      imageSize={13}
                      readonly={true}
                      startingValue={data.average_rating}
                    /> */}
                    <StarRating
                      initialRating={data.avg_rating}
                      readonly={true}
                      imageSize={13}
                    />
                  </View>
                  {!fromWasphaExpress && (
                    <>
                      <View style={styles.kmWrap}>
                        <Text
                          size={Fonts.size.xxxSmall}
                          type="medium"
                          style={styles.kmText}>
                          {util.isEmpty(data.distance) ? data.distance : 0} km
                          away
                        </Text>
                      </View>
                      <View style={styles.assignBtnWrap}>
                        <Text
                          color={Colors.text.quaternary}
                          size={Fonts.size.xxxSmall}>
                          {strings.ASSIGN}
                        </Text>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              {isLoading && <Loader loading={isLoading} />}
            </TouchableOpacity>
          </MapView.Callout>
        </Marker>
      )}
    </>
  );
}
