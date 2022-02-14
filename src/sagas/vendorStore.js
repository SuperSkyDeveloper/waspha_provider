import {take, put, call, fork} from 'redux-saga/effects';
import {
  STORE_STATUS_CHANGE,
  STORE_PROFILE,
  VENDOR_STORE_REVIEW,
  VENDOR_NOTIFICATIONS,
  VENDOR_STORE_EARNING,
  STORE_DASHBOARD,
  MARK_AS_READ,
  MARK_AS_VIEWED,
  GET_UNVIEWED_NOTIFICATIONS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  storeStatusChangeSuccess,
  storeProfileSuccess,
  vendorStoreReviewSuccess,
  vendorNotificationsSuccess,
  vendorStoreEarningSuccess,
  storeDashboardSuccess,
  markAsReadSuccess,
  markAsViewedSuccess,
  getUnViewedNotificationsSuccess,
} from '../actions/VendorStoreAction';
import {
  STORE_PROFILE as STORE_PROFILE_URL,
  STORE_STATUS_CHANGE as STORE_STATUS_CHANGE_URL,
  VENDOR_STORE_REVIEW as VENDOR_STORE_REVIEW_URL,
  VENDOR_NOTIFICATIONS as VENDOR_NOTIFICATIONS_URL,
  VENDOR_STORE_EARNING as VENDOR_STORE_EARNING_URL,
  STORE_DASHBOARD as STORE_DASHBOARD_URL,
  MARK_AS_READ as MARK_AS_READ_URL,
  MARK_AS_VIEWED as MARK_AS_VIEWED_URL,
  GET_UNVIEWED_NOTIFICATIONS as GET_UNVIEWED_NOTIFICATIONS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* storeProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(STORE_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        STORE_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(storeProfileSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* storeOnlineStatus() {
  while (true) {
    const {payload, responseCallback} = yield take(STORE_STATUS_CHANGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        STORE_STATUS_CHANGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(storeStatusChangeSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* vendorStoreReview() {
  while (true) {
    const {payload, responseCallback} = yield take(VENDOR_STORE_REVIEW.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VENDOR_STORE_REVIEW_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(vendorStoreReviewSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* vendorNotification() {
  while (true) {
    const {payload, responseCallback} = yield take(
      VENDOR_NOTIFICATIONS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        VENDOR_NOTIFICATIONS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(vendorNotificationsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* vendorStoreEarning() {
  while (true) {
    const {payload, responseCallback} = yield take(
      VENDOR_STORE_EARNING.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        VENDOR_STORE_EARNING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(vendorStoreEarningSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* storeDashboard() {
  while (true) {
    const {payload, responseCallback} = yield take(STORE_DASHBOARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        STORE_DASHBOARD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(storeDashboardSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* markAsRead() {
  while (true) {
    const {payload, responseCallback} = yield take(MARK_AS_READ.REQUEST);
    try {
      const response = yield call(
        callRequest,
        MARK_AS_READ_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(markAsReadSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* markAsViewed() {
  while (true) {
    const {payload, responseCallback} = yield take(MARK_AS_VIEWED.REQUEST);
    try {
      const response = yield call(
        callRequest,
        MARK_AS_VIEWED_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(markAsViewedSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getUnViewedNotifications() {
  while (true) {
    const {responseCallback} = yield take(GET_UNVIEWED_NOTIFICATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_UNVIEWED_NOTIFICATIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getUnViewedNotificationsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(storeProfile);
  yield fork(storeOnlineStatus);
  yield fork(vendorNotification);
  yield fork(vendorStoreReview);
  yield fork(vendorStoreEarning);
  yield fork(markAsRead);
  yield fork(markAsViewed);
  yield fork(getUnViewedNotifications);
  yield fork(storeDashboard);
}
