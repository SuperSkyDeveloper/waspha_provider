// @flow
import {Platform, Share, Linking} from 'react-native';
import moment from 'moment';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import GetLocation from 'react-native-get-location';
import {MessageBarManager} from 'react-native-message-bar';
import {
  MESSAGE_TYPES,
  DISCARD_WARNING,
  strings,
  SCHEDULE_DEFAULT_TIME,
  PROMO_TYPES,
} from '../constants';
import Snackbar from 'react-native-snackbar';
import _, {isNil, values} from 'lodash';
import Geolocation from '@react-native-community/geolocation';
import DataHandler from '../services/DataHandler';
import {Images} from '../theme';
import {renderNameStringAndImageRender} from '../helpers/multilingualHelper';
import {userSignOutSuccess, refreshToken} from '../actions/UserActions';
import {BASE_URL} from '../config/WebService';
import {GOOGLE_MAPS_APIKEY} from '../constants';
import Geocoder from 'react-native-geocoder';
import {Actions} from 'react-native-router-flux';
class Util {
  keyExtractor = (item: Object, index: number) => index.toString();

  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re = /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length > 5;
  }
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }

  isStrongPassword(password) {
    return (
      (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) ||
      password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
    );
  }

  intToString(value) {
    if (value) {
      return value.toString();
    } else {
      return '';
    }
  }
  async checkIsLocation() {
    if (this.isPlatformAndroid()) {
      let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled(
        {
          message:
            "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
          ok: 'YES',
          cancel: 'NO',
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
          showDialog: true, // false => Opens the Location access page directly
          openLocationServices: true, // false => Directly catch method is called if location services are turned off
          preventOutSideTouch: true, //true => To prevent the location services window from closing when it is clicked outside
          preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
          providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        },
      ).catch((error) => error);

      return Object.is(check.status, 'enabled');
    } else {
      return this.getCoordinates();
    }
  }

  async getCoordinates() {
    return new Promise(async function (resolve, reject) {
      await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 35000,
      })
        .then((geo_success) => {
          console.warn('GEO_SUCCESS', JSON.stringify(geo_success));
          const {latitude, longitude} = geo_success;
          const location = {};
          location['coordinates'] = {
            latitude,
            longitude,
          };
          resolve(location);
        })
        .catch((error) => {
          console.warn('GEO_ERROR', error);
          resolve(error);
        });
    });
  }

  topAlert(message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      rtl: this.isRTL(),
    });
  }

  topAlertError(message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  // todo ask zain bhai
  // topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
  //   showMessage({
  //     message,
  //     type: alertType,
  //     autoHide: false,
  //     backgroundColor: Colors.red,
  //     color: Colors.white,
  //   });
  // }

  capitalizeFirstLetter(string) {
    if (!_.isEmpty(string)) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  isRequiredErrorMessage(
    fieldName,
    translateLanguage = DataHandler.getStore().getState().general.language,
  ) {
    const {translationLocales} = DataHandler.getStore().getState().general;
    return `${this.capitalizeFirstLetter(fieldName)} ${
      translationLocales.strings[translateLanguage].IS_REQUIRED
    }`;
  }

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  async refreshAccessToken() {
    console.log('here in refreshAccessToken');
    let options = Object.assign({method: 'POST'});
    let data = {};
    data.refresh_token = this.getCurrentUserRefreshToken();
    console.log({refreshData: data});

    options.body = JSON.stringify(data);

    console.log({options});
    try {
      const response = await fetch(`${BASE_URL}resume-access-token`, options);

      // console.log({newAccessToken: response});
      const responseJson = await response.json();
      // console.log({newAccessToken: responseJson.data});
      DataHandler.getStore().dispatch(refreshToken(responseJson.data));
      return responseJson.data.access_token;
    } catch (error) {
      console.log({refreshTokenError: error});

      DataHandler.getStore().dispatch(userSignOutSuccess());
      return false;
    }
  }

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.data.access_token;
  }

  getCurrentUserRefreshToken() {
    return DataHandler.getStore().getState().user.data.refresh_token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  isLastItem(array, index) {
    return index + 1 === array.length;
  }

  checkIsEmpty(data) {
    if (data) {
      return data;
    } else {
      return '----';
    }
  }

  isEmpty(data) {
    if (data) {
      return true;
    }
    return false;
  }

  // for proposal creation item
  isValueEmpty(data, placeholder = '') {
    if (data) {
      return data;
    }
    return placeholder;
  }

  // select color theme on basic of index

  selectColorTheme(boxId) {
    const deliveryMode = [
      {id: 1, color: ['#31A4F7', '#2444E2']},
      {id: 2, color: ['#FFA590', '#FF7656']},
      {id: 3, color: ['#C67DFA', '#913CCD']},
      {id: 4, color: ['#ff7656', '#ff7656']},
      {id: 5, color: ['#C67DFA', '#913CCD']},
      {id: 11, color: ['#ff7656', '#ff7656']},
    ];

    let temp = _.find(deliveryMode, (item, index) => {
      return item.id === boxId;
    });
    if (!_.isNil(temp.color)) {
      return temp.color;
    }
    return ['#31A4F7', '#2444E2'];
  }

  setPaymentUnit(value) {
    if (value)
      return `${
        DataHandler.getStore().getState().user.data.currency_code
      } ${value.toFixed(2)}`;
    return 0;
  }

  decimalPlaces(value, numDigits = 2) {
    if (value) {
      return value.toFixed(numDigits);
    } else {
      return 0;
    }
  }

  profilePlaceHolderImage(image) {
    return _.isNil(image) || _.isEmpty(image)
      ? Images.ProfilePlaceholder
      : {uri: image};
  }
  categoryImagePlaceholder(image) {
    return _.isEmpty(image)
      ? Images.Category
      : {uri: renderNameStringAndImageRender(image)};
  }

  convertToMinutes = (val = 0, type = 'minute') => {
    switch (type) {
      case 'day':
        return val * 1440;
      case 'hour':
        return val * 60;
      case 'minute':
        return val;
    }
  };

  checkLength(val) {
    if (val) return val.length;
    return false;
  }

  generateGuid() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  notDeliveredItems() {
    return false;
  }

  isRTL() {
    const selectedLanguage = strings.getLanguage();

    const rtl = ['ar'];

    return rtl.includes(selectedLanguage);
  }

  getLanguage = () => {
    return strings.getLanguage();
  };
  switchLanguage(languageCode) {
    strings.setLanguage(languageCode);
  }

  rtlRightText() {
    return this.isRTL() ? 'right' : 'left';
  }

  // constant here because in constain file not access to strings
  EARNING_FILTER = () => {
    return [
      {
        title: strings.WEEKLY,
        slug: 'weekly',
      },
      {
        title: strings.MONTHLY,
        slug: 'monthly',
      },
      {
        title: strings.YEARLY,
        slug: 'yearly',
      },
    ];
  };

  SCHEDULE = () => {
    return [
      {
        id: 1,
        day: strings.MONDAY,
        status: false,
        shift: [
          {
            from: SCHEDULE_DEFAULT_TIME.from,
            to: SCHEDULE_DEFAULT_TIME.to,
          },
        ],
      },
      {
        id: 2,
        day: strings.TUESDAY,
        status: false,
        shift: [
          {
            from: SCHEDULE_DEFAULT_TIME.from,
            to: SCHEDULE_DEFAULT_TIME.to,
          },
        ],
      },
      {
        id: 3,
        day: strings.WEDNESDAY,
        status: false,
        shift: [
          {
            from: SCHEDULE_DEFAULT_TIME.from,
            to: SCHEDULE_DEFAULT_TIME.to,
          },
        ],
      },
      {
        id: 4,
        day: strings.THURSDAY,
        status: false,
        shift: [
          {
            from: SCHEDULE_DEFAULT_TIME.from,
            to: SCHEDULE_DEFAULT_TIME.to,
          },
        ],
      },
      {
        id: 5,
        day: strings.FRIDAY,
        status: false,
        shift: [
          {
            from: SCHEDULE_DEFAULT_TIME.from,
            to: SCHEDULE_DEFAULT_TIME.to,
          },
        ],
      },
      {
        id: 6,
        day: strings.SATURDAY,
        status: false,
        shift: [
          {
            from: SCHEDULE_DEFAULT_TIME.from,
            to: SCHEDULE_DEFAULT_TIME.to,
          },
        ],
      },
      {
        id: 7,
        day: strings.SUNDAY,
        status: false,
        shift: [
          {
            from: SCHEDULE_DEFAULT_TIME.from,
            to: SCHEDULE_DEFAULT_TIME.to,
          },
        ],
      },
    ];
  };

  TAB_LIST = () => {
    return [
      {
        id: 1,
        title: strings.ASSIGNED,
      },
      {
        id: 1,
        title: strings.COMPLETED,
      },
      {
        id: 1,
        title: strings.CANCELLED,
      },
    ];
  };

  PROMO_TABS = () => {
    return [
      {
        id: 1,
        title: strings.GENERAL_PROMOS,
      },
      {
        id: 2,
        title: strings.CUSTOM_PROMOS,
      },
    ];
  };

  PROPOSAL_TIME_TYPE = () => {
    return [
      {
        title: strings.MINUTE,
        slug: 'minute',
      },
      {
        title: strings.HOUR,
        slug: 'hour',
      },
      {
        title: strings.DAY,
        slug: 'day',
      },
    ];
  };

  EARNING_DETAIL = () => {
    return [
      {
        id: 1,
        title: strings.DEBIT,
      },
      {
        id: 2,
        title: strings.CREDIT,
      },
    ];
  };

  ITEMS_LIST = () => {
    return [
      {
        id: 1,
        image: Images.OfflineGuyCoverImg,
        title: strings.OFFLINE_DELIVERY_GUY,
        isOnline: false,
      },
      {
        id: 2,
        image: Images.OnlineGuyCoverImg,
        title: strings.ONLINE_DELIVERY_GUY,
        isOnline: true,
      },
    ];
  };

  NONE_CATEGORY = () => {
    return {
      id: 0,
      description: '',
      image: '',
      name: strings.NONE,
      parent_id: null,
      slug: null,
    };
  };

  notificationCounter = (count) => {
    if (count >= 99) {
      return `99+`;
    } else {
      return count;
    }
  };
  PROMO_OPTIONS = () => {
    return [
      {
        id: 1,
        key: PROMO_TYPES.BUY_1_GET_1,
        title: strings.BUY_1_GET_1,
      },
      {
        id: 2,
        key: PROMO_TYPES.DISCOUNT,

        title: strings.DISCOUNT,
      },
      {
        id: 3,
        key: PROMO_TYPES.GIFT_PRODUCT,

        title: strings.GET_GIFT,
      },
    ];
  };

  radio_props = () => {
    return [
      {label: strings.CUSTOM, value: 0},
      {label: '24/7', value: 1},
    ];
  };
  shareApp = async (message) => {
    try {
      const result = await Share.share({
        message: message,
      });
      Actions.reset('drawerMenu');
    } catch (error) {
      alert(error.message);
    }
  };
}
export default new Util();
