import * as RNLocalize from 'react-native-localize';
// import Geocoder from 'react-native-geocoding';
import {GOOGLE_COUNTRY_APIKEY} from '../constants';
import Geocoder from 'react-native-geocoder';
import util from '../util';

// export const getCurrentRegion = async () => {
//   let place = RNLocalize.getTimeZone().split('/')[1];
//   let rofl;
//   Geocoder.init(GOOGLE_COUNTRY_APIKEY);
//   await Geocoder.from(place)
//     .then((json) => {
//       rofl = json.results[0].geometry.location;
//     })
//     .catch((error) => console.log('ERRIOR', error));
//   return rofl;
// };

export const getCurrentRegion = async (fromCountryCode = false) => {
  let place = RNLocalize.getTimeZone().split('/')[1];
  let rofl;
  console.log({place});
  util.topAlert(place);
  Geocoder.fallbackToGoogle(GOOGLE_COUNTRY_APIKEY);
  await Geocoder.geocodeAddress(place)
    .then((json) => {
      if (fromCountryCode) {
        rofl = json[0].countryCode;
        console.log('1');
      } else {
        rofl = json[0].position;
        console.log('2');
      }
      console.log({json});
    })
    .catch((error) => console.warn('ERRIOR', error));
  console.log('ROFL', rofl);
  return rofl;
};

// export const getAddress = async (lat, lng) => {
//   let rofl;
//   Geocoder.init(GOOGLE_COUNTRY_APIKEY);
//   await Geocoder.from(lat, lng)
//     .then((json) => {
//       // rofl = json.results[0].address_components[0];
//       rofl = json.results[0].formatted_address;
//     })
//     .catch((error) => console.log('ERRIOR', error));
//   return rofl;
// };

export const getAddress = async (lat, lng) => {
  Geocoder.fallbackToGoogle(GOOGLE_COUNTRY_APIKEY);
  let result = await Geocoder.geocodePosition({lat, lng});
  return result[0].formattedAddress;
};
