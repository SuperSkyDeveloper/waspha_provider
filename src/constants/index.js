import moment from 'moment';

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
import LocalizedStrings from 'react-native-localization';
import {toISOString} from '../helpers/generalHelper';
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const NAME_LENGTH = 100;
export const DESC_LENGTH = 1000;
export const AMOUNT_FIELD_LENGTH = 10;
export const LATITUDE_DELTA = 0.0922;
export const TAX_FIELD_LENGTH = 3;
export const DUMMY_TEXT =
  'sdfksdofsdl  isdjifsdjiofjisdj iofsdjkl fj k slfj klsjfklsdj';
export const LIST_ITEMS_COUNT = 3;

export const GOOGLE_MAPS_APIKEY = 'AIzaSyAB4_6W1YjYTt0AMDuBmmgqMlQCefe45Wg';
export const GOOGLE_COUNTRY_APIKEY = 'AIzaSyDXD-qniR-L-VgIziA8K0C__wR5YJnY640';
export const PLACES_API_KEY = 'AIzaSyCYiK5W3N6Zf0t6z_dxIvVtRfLbYFthnv4';

// Text Fields limit
export const inputFieldsLimit = {
  limit50: 50,
  mLimit100: 100,
  mLimit500: 500,
  mLimit1000: 1000,
};

export const NOTIFICATION_PERMISSION_DENIED_ERROR =
  'Please allow notifications and get notified timely';

//WASPHA notification Channel
export const NOTIFICATION_CHANNEL = {
  id: 'waspha-provider-channel',
  name: 'Waspha Notifications',
};

export const COUNTRY_ITEM_HEIGHT = 60;

export const strings = new LocalizedStrings({
  en: {
    SHARE: 'Share',
    REFERRAL_DES:
      'Refer the Waspha App to your friends and family and earn money just by viewing advertisements and refer again',
    REFER_VIEW_ADVT_EARN: 'Refer.View Advts.Earn',
    REFERRAL_CODE: 'Referral Code',
    YOUR_REF_CODE: 'Your Referral Code',
  },
  ar: {},
});

export const LOGIN_PLACEHOLDER = 'hani@yopmail.com / 0123456789';
export const PASSWORD_PLACEHOLDER = '********';

// export const APP_VERSION = '0.1.15';
export const APP_VERSION = '0.11.2';

export const FORGET_OPTION = {
  EMAIL: 'email',
  PH0NE: 'phone',
};

// date time formats
export const DATE_TIME_FORMAT = 'DD/MM/YY, hh:mm a';
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';
export const DATE_FORMAT2 = 'DD/MM/YYYY';
export const DATE_FORMAT3 = 'DD MMMM, YYYY';
export const DATE_FORMAT4 = 'ddd';
export const DATE_FORMAT5 = 'DD-MM-YYYY';
export const TIME_FORMAT2 = 'hh:mm';
export const TIME_FORMAT3 = 'h:mm a';
export const TIME_FORMAT = 'hh:mm a';
export const DATE_TIME = 'DD-MM-YYYY hh:mm a';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};
// Proposal center
export const PROPOSAL_CENTER = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
};

// tab name order and proposal screen
export const LATEST_ORDER_STATUS = {
  ASSIGNED: 'assigned',
  PREPARED: 'prepared',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ACCEPTED: 'accepted',
  EXPIRED: 'expired',
  PENDING: 'pending',
  ASSIGNED_ONLINE: 'assigned_online',
  ASSIGNED_OFFLINE: 'assigned_offline',
  REJECTED: 'rejected',
  ASSIGNED_WASPHA: 'assigned_waspha',
};

export const PERMISSION = {
  HIDE: null,
  READ: 'read',
  WRITE: 'write',
};

export const ORDER_ITEM_TYPE = {
  createProposalForExistingItems: 'createProposalForExistingItems',
  createProposalForNewItems: 'createProposalForNewItems',
  onlyForRead: 'onlyForRead',
  forProposal: 'forProposal',
  updateProposal: 'updateProposal',
  createTraditionalOrder: 'createTraditionalOrder',
};

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

// image upload modal
export const MODAL_TYPE = {
  PRDOUCT_IMG: 'prdouctImg',
  PRDOUCT_IMG_REMARKS: 'prdouctImgRemarks',
};

export const WASPA_EXPRESS_ID = 3;

// store profile action

export const STORE_ACTION_TYPE = {
  CHANGE_STATUS: 'changeStatus',
  CHANGE_DELIVERY: 'changeDelivery',
  CHANGE_PICKUP: 'changePickup',
};

export const SCHEDULE_DEFAULT_TIME = {
  to: toISOString('9:00 am', TIME_FORMAT3),
  from: toISOString('10:00 pm', TIME_FORMAT3),
};

export const DELIVERY_MODE_ID = {
  ONLINE_ID: 1,
  OFFLINE_ID: 2,
  WASPHA_EXPRESS: 3,
};
export const DRIVER_TYPES = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  WASPHA_EXPRESS: 'waspha_express',
};

export const ORDER_TYPE = {
  PICKUP: 'pickup',
  DELIVERY: 'delivery',
};

export const PROMO_TYPES = {
  DISCOUNT: 'discount',
  BUY_1_GET_1: 'buy1_get1',
  GIFT_PRODUCT: 'gift_product',
};

export const NOTIFICATIONS_TYPE = {
  RFP_RECEIVED: 'rfp_received',
  RFP_TIMEOUT: 'rfp_timeout',
  PROPOSAL_ACCEPTED: 'proposal_accepted',
  PROPOSAL_REJECTED: 'proposal_rejected',
  ORDER_COMPLETED: 'order_completed',

  // cancelled tab

  PROPOSAL_REVISED: 'proposal_revised',
  ORDER_DELIVERED_BY_DRIVER: 'order_delivered_by_driver',
  PAYMENT_RECEIVED_VIA_ONLINE_METHOD: 'payment_received_via_online_method',
  SCHEDULED_DELIVERY_TIMING_IS_COMING: 'scheduled_delivery_timing_is_coming',
  REVIEW_RECEIVED: 'review_received',
  PROPOSAL_EXPIRED: 'proposal_expired',
  RFP_CANCELLED: 'rfp_cancelled',
  ONLINE_STATUS_UPDATE: 'online_status_updated',
  MESSAGE_FROM_ADMIN: 'message_from_admin',
  ACCOUNT_APPROVED: 'account_approved',
  CHAT_NOTIFICATION: 'message',
  LOYALTY_POINTS_UPDATED: 'loyalty_points_updated',

  DRIVER_ORDER_REJECTED: 'driver_order_rejected',

  NO_DRIVER_FOUND: 'no_driver_found',

  DRIVER_FOUND: 'driver_found',

  NO_EXPRESS_DRIVER_FOUND: 'no_express_driver_found',

  EXPRESS_DRIVER_FOUND: 'express_driver_found',

  EXPRESS_DRIVER_ORDER_REJECTED: 'express_driver_order_rejected',
  // proposal center proposal
};

export const PLACED_ORDER_TYPE = {
  NORMAL: 'normal',
  TRADITIONAL: 'traditional',
};

export const RESEND_CODE_TIMER = 60;
