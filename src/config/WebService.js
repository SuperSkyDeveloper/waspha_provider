import _ from 'lodash';
import Util from '../util';

// heroku staging
// export const BASE_URL = 'https://waspha-staging.herokuapp.com/vendor/';
// export const BASE_URL = 'https://waspha-production.herokuapp.com/vendor/';
export const BASE_URL = 'https://api.waspha.com/vendor';
// export const TRACKING_BASE_URL = 'https://waspha-tracking-dev.herokuapp.com';
export const TRACKING_BASE_URL = 'https://tracking.waspha.com';

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const USER_SIGNUP = {
  route: 'signup-request',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_CONFIRM_OTP = {
  route: 'signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNIN = {
  route: 'login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const SOCIAL_LOGIN = {
  route: 'social-login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const RESEND_CODE = {
  route: 'resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const IS_ORDER_RATED = {
  route: 'is-order-rated',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const USER_FORGOT_PASSWORD = {
  route: 'forget-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const VERIFY_RESET_PASSWORD = {
  route: 'verify-reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESET_PASSWORD = {
  route: 'reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const BUSINESS_REGISTRATION = {
  route: 'business-registration',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ORDER_LIST = {
  route: 'rfp-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ORDER_DETAIL = {
  route: 'rfp-detail',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const REJECT_ORDER = {
  route: 'respond-rfp',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHAT_LISTING = {
  route: 'chat-list',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const APP_SETTINGS = {
  route: 'app-settings',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_PRODUCTS = {
  route: 'store-products',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNOUT = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_USER_PROFILE = {
  route: 'edit-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CREATE_PROSPAL = {
  route: 'create-proposal',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_PROSPAL = {
  route: 'update-proposal',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const STORE_PROFILE = {
  route: 'store-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const STORE_STATUS_CHANGE = {
  route: 'update-store-attributes',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CONFIRM_PROPOSAL = {
  route: 'confirm-bill',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const LASTEST_ORDER = {
  route: 'proposal-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ORDER_DETAIL = {
  route: 'proposal-detail',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_LANGUAGE = {
  route: 'change-language',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CONTACT_US = {
  route: 'submit-contact-us',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_DELIVERY_MODE = {
  route: 'change-proposal-delivery-mode',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_FAQ = {
  route: 'faq-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ADD_PRODUCT_CATEGORY = {
  route: 'add-business-category',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ADD_PRODUCT = {
  route: 'add-product',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SEARCH_PRODUCT = {
  route: 'search-products',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_PRODUCT_CATEGORY = {
  route: 'business-category-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_TRENDING_PRODUCT = {
  route: 'trending-products',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VENDOR_STORE_REVIEW = {
  route: 'store-reviews-ratings',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VENDOR_NOTIFICATIONS = {
  route: 'notification-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VENDOR_STORE_EARNING = {
  route: 'store-earning',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const STORE_DASHBOARD = {
  route: 'store-dashboard',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const MARK_AS_READ = {
  route: 'mark-as-read',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const MARK_AS_VIEWED = {
  route: 'mark-as-viewed',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_UNVIEWED_NOTIFICATIONS = {
  route: 'get-count-marked-as-viewed',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ADD_DRIVER = {
  route: 'add-driver',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const STORE_DRIVERS = {
  route: 'store-drivers',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_PRODUCT = {
  route: 'edit-product',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_CATEGORY = {
  route: 'edit-business-category',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_PRODUCT = {
  route: 'delete-product',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_CATEGORY = {
  route: 'delete-business-category',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_DRIVER = {
  route: 'delete-driver',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ASSING_DRIVER = {
  route: 'assign-driver',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_PROPOSAL_STATUS = {
  route: 'change-proposal-status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const STORE_CATALOG = {
  route: 'store-catalog',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_DEVICE_ID = {
  route: 'device-token',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_PASSWORD = {
  route: 'change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_PRIVACY_POLICY = {
  route: 'waspha-privacy-policy',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_TERMS_AND_CONDITIONS = {
  route: 'waspha-terms-n-conditions',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_PROMO_CODES = {
  route: 'promo-codes',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SUBMIT_RATING = {
  route: 'create-review-rating',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_BUSINESS_PROFILE = {
  route: 'edit-business-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_STORE_PROFILE = {
  route: 'store-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_COOKIE_POLICY = {
  route: 'waspha-cookie-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_COPY_RIGHT_POLICY = {
  route: 'waspha-copyright-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_TERMS_DELIVERY_PARTNER = {
  route: 'chrome',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_GDPR_COMPLIANCE_STATEMENT = {
  route: 'waspha-gdpr-compliance',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_ACTIVE_ORDERS = {
  route: 'active-orders',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const TRANSLATIONS = {
  route: 'translations',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const PLACE_TRAD_ORDER = {
  route: 'create-traditional-order',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SELECT_WASPHA_VEHICLE = {
  route: 'assign-waspha-driver',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_TRADITIONAL_ORDERS = {
  route: 'traditional-order-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_TRADITIONAL_ORDER_DETAILS = {
  route: 'traditional-order-detail',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CANCEL_TRADITIONAL_ORDER = {
  route: 'cancel-order',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_WASPHA_VEHICLES = {
  route: 'get-waspha-driver-vehicles',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHECK_ORDER_ASSIGNED = {
  route: 'is-order-assigned',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_EMAIL_OR_PHONE = {
  route: 'change-contact-or-email',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_EMAIL_OR_PHONE_OTP = {
  route: 'verify-contact-or-email',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHECK_DEVICE_STATE = {
  route: 'save-is-device-active',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
