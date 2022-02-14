// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const REMEMBER_ME = 'REMEMBER_ME';
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const UPDATE_USER_PROFILE = createRequestTypes('UPDATE_USER_PROFILE');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');
export const RESEND_CODE = createRequestTypes('RESEND_CODE');
export const CREATE_PROPOSAL_INTERNAL = 'CREATE_PROPOSAL_INTERNAL';
export const CREATE_PROPOSAL_INTERNAL_ITEMS = 'CREATE_PROPOSAL_INTERNAL_ITEMS';
export const CREATE_PROPOSAL_INTERNAL_ADD_NEW_ITEMS =
  'CREATE_PROPOSAL_INTERNAL_ADD_NEW_ITEMS';
export const CREATE_PROPOSAL_INTERNAL_ADD_NEW_PROPOSAL =
  'CREATE_PROPOSAL_INTERNAL_ADD_NEW_PROPOSAL';
export const CREATE_PROPOSAL_INTERNAL_REMOVE_ITEM =
  'CREATE_PROPOSAL_INTERNAL_REMOVE_ITEM';

export const VERIFY_RESET_PASSWORD = createRequestTypes(
  'VERIFY_RESET_PASSWORD',
);
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
export const BUSINESS_REGISTRATION = createRequestTypes(
  'BUSINESS_REGISTRATION',
);
export const USER_CONFIRM_OTP_FGPASS = createRequestTypes(
  'USER_CONFIRM_OTP_FGPASS',
);
export const USER_CONFIRM_OTP = createRequestTypes('USER_CONFIRM_OTP');
export const USER_UPDATE_PASSWORD = createRequestTypes('USER_UPDATE_PASSWORD');
export const CONTACT_ADMIN = createRequestTypes('CONTACT_ADMIN');
export const GET_SERVICE_TYPES = createRequestTypes('GET_SERVICE_TYPES');
export const GET_NEARBY_SERVICE_PROVIDERS = createRequestTypes(
  'GET_NEARBY_SERVICE_PROVIDERS',
);
export const CLEAR_SERVICE_PROVIDERS_DATA = 'CLEAR_SERVICE_PROVIDERS_DATA';
export const GET_NEWS = createRequestTypes('GET_NEWS');
export const GET_EVENTS = createRequestTypes('GET_EVENTS');
export const GET_MONTLY_EVENTS = createRequestTypes('GET_MONTLY_EVENTS');
export const GET_SEARCH_EVENTS = createRequestTypes('GET_SEARCH_EVENTS');
export const GET_ORGANIZATIONS = createRequestTypes('GET_ORGANIZATIONS');
export const GET_REVIEWS = createRequestTypes('GET_REVIEWS');
export const GET_PROFILE_SECTIONS = createRequestTypes('GET_PROFILE_SECTIONS');
export const GET_PRODUCTS = createRequestTypes('GET_PRODUCTS');
export const GET_CATEGORIES = createRequestTypes('GET_CATEGORIES');
export const GET_RIDERS = createRequestTypes('GET_RIDERS');
export const POST_PROFILE_DATA = createRequestTypes('POST_PROFILE_DATA');
export const DELETE_PROFILE_SUBSECTION_DATA = createRequestTypes(
  'DELETE_PROFILE_SUBSECTION_DATA',
);
export const GET_ORDER_LIST = createRequestTypes('GET_ORDER_LIST');
export const GET_ORDER_DETAIL = createRequestTypes('GET_ORDER_DETAIL');

// general

export const CHANGE_LANGUAGE = createRequestTypes('CHANGE_LANGUAGE');
export const CONTACT_US = createRequestTypes('CONTACT_US');
export const GET_FAQ = createRequestTypes('GET_FAQ');

// orders
export const LASTEST_ORDER = createRequestTypes('LASTEST_ORDER');
export const ORDER_DETAIL = createRequestTypes('ORDER_DETAIL');
export const CHANGE_DELIVERY_MODE = createRequestTypes('CHANGE_DELIVERY_MODE');
export const CHANGE_PROPOSAL_STATUS = createRequestTypes(
  'CHANGE_PROPOSAL_STATUS',
);

export const GET_PROMO_CODES = createRequestTypes('GET_PROMO_CODES');

//product
export const ADD_PRODUCT_CATEGORY = createRequestTypes('ADD_PRODUCT_CATEGORY');
export const ADD_PRODUCT = createRequestTypes('ADD_PRODUCT');
export const SEARCH_PRODUCT = createRequestTypes('SEARCH_PRODUCT');
export const GET_PRODUCT_CATEGORY = createRequestTypes('GET_PRODUCT_CATEGORY');
export const GET_TRENDING_PRODUCT = createRequestTypes('GET_TRENDING_PRODUCT');
export const EDIT_PRODUCT = createRequestTypes('EDIT_PRODUCT');
export const EDIT_CATEGORY = createRequestTypes('EDIT_CATEGORY');
export const DELETE_CATEGORY = createRequestTypes('DELETE_CATEGORY');
export const DELETE_PRODUCT = createRequestTypes('DELETE_PRODUCT');
export const STORE_CATALOG = createRequestTypes('STORE_CATALOG');

// store
export const VENDOR_STORE_REVIEW = createRequestTypes('VENDOR_STORE_REVIEW');
export const VENDOR_NOTIFICATIONS = createRequestTypes('VENDOR_NOTIFICATIONS');
export const VENDOR_STORE_EARNING = createRequestTypes('VENDOR_STORE_EARNING');
export const STORE_DASHBOARD = createRequestTypes('STORE_DASHBOARD');

// driver
export const ADD_DRIVER = createRequestTypes('ADD_DRIVER');
export const STORE_DRIVERS = createRequestTypes('STORE_DRIVERS');
export const DELETE_DRIVER = createRequestTypes('DELETE_DRIVER');
export const ASSING_DRIVER = createRequestTypes('ASSING_DRIVER');

export const REJECT_ORDER = createRequestTypes('REJECT_ORDER');
export const CREATE_PROSPAL = createRequestTypes('CREATE_PROSPAL');
export const UPDATE_PROSPAL = createRequestTypes('UPDATE_PROSPAL');
export const APP_SETTINGS = createRequestTypes('APP_SETTINGS');
export const TRANSLATIONS = createRequestTypes('TRANSLATIONS');
export const STORE_PROFILE = createRequestTypes('STORE_PROFILE');
export const STORE_STATUS_CHANGE = createRequestTypes('STORE_STATUS_CHANGE');
export const CONFIRM_PROPOSAL = createRequestTypes('CONFIRM_PROPOSAL');

export const GET_BRAIN_TREE_TOKEN = createRequestTypes('GET_BRAIN_TREE_TOKEN');
export const BRAIN_TREE_PAYMENT = createRequestTypes('BRAIN_TREE_PAYMENT');
export const LOGOUT = 'LOGOUT';
export const UPDATE_DEVICE_ID = createRequestTypes('UPDATE_DEVICE_ID');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const FIRST_TIME_OPEN = 'FIRST_TIME_OPEN';
export const GET_PRIVACY_POLICY = createRequestTypes('GET_PRIVACY_POLICY');
export const GET_TERMS_AND_CONDITIONS = createRequestTypes(
  'GET_TERMS_AND_CONDITIONS',
);
export const SUBMIT_RATING = createRequestTypes('SUBMIT_RATING');
export const GET_RATINGS = createRequestTypes('GET_RATINGS');
export const SAVE_STORE_DATA = 'SAVE_STORE_DATA';
export const EDIT_BUSINESS_PROFILE = createRequestTypes(
  'EDIT_BUSINESS_PROFILE',
);

export const GET_ACTIVE_ORDERS = createRequestTypes('GET_ACTIVE_ORDERS');

export const GET_STORE_PROFILE = createRequestTypes('GET_STORE_PROFILE');
export const EMPTY = createRequestTypes('EMPTY');

export const GET_COOKIE_POLICY = createRequestTypes('GET_COOKIE_POLICY');
export const GET_COPY_RIGHT_POLICY = createRequestTypes(
  'GET_COPY_RIGHT_POLICY',
);
export const GET_TERMS_DELIVERY_PARTNER = createRequestTypes(
  'GET_TERMS_DELIVERY_PARTNER',
);
export const GET_GDPR_COMPLIANCE_STATEMENT = createRequestTypes(
  'GET_GDPR_COMPLIANCE_STATEMENT',
);

export const GET_UNVIEWED_NOTIFICATIONS = createRequestTypes(
  'GET_UNVIEWED_NOTIFICATIONS',
);

export const MARK_AS_VIEWED = createRequestTypes('MARK_AS_VIEWED');

export const IS_ORDER_RATED = createRequestTypes('IS_ORDER_RATED');

export const MARK_AS_READ = createRequestTypes('MARK_AS_READ');

export const CHAT_LISTING = createRequestTypes('CHAT_LISTING');

export const PLACE_TRAD_ORDER = createRequestTypes('PLACE_TRAD_ORDER');

export const SELECT_WASPHA_VEHICLE = createRequestTypes(
  'SELECT_WASPHA_VEHICLE',
);

export const GET_TRADITIONAL_ORDERS = createRequestTypes(
  'GET_TRADITIONAL_ORDERS',
);

export const GET_TRADITIONAL_ORDER_DETAILS = createRequestTypes(
  'GET_TRADITIONAL_ORDER_DETAILS',
);

export const CANCEL_TRADITIONAL_ORDER = createRequestTypes(
  'CANCEL_TRADITIONAL_ORDER',
);

export const GET_WASPHA_VEHICLES = createRequestTypes('GET_WASPHA_VEHICLES');

export const CHECK_ORDER_ASSIGNED = createRequestTypes('CHECK_ORDER_ASSIGNED');

export const CHECK_DEVICE_STATE = createRequestTypes('CHECK_DEVICE_STATE');

export const CHANGE_EMAIL_OR_PHONE = createRequestTypes(
  'CHANGE_EMAIL_OR_PHONE',
);
export const CHANGE_EMAIL_OR_PHONE_OTP = createRequestTypes(
  'CHANGE_EMAIL_OR_PHONE_OTP',
);

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const ALERT_MESSAGE = 'ALERT_MESSAGE';

export const GET_DRIVER_CORDS = 'GET_DRIVER_CORDS';

export const RIDER_FOUND = 'RIDER_FOUND';

export const EXPRESS_RIDER_FOUND = 'EXPRESS_RIDER_FOUND';

export const GET_UPDATED_TIME_AND_KM = 'GET_UPDATED_TIME_AND_KM';

export const SET_COUNTRY_CODE = 'SET_COUNTRY_CODE';
