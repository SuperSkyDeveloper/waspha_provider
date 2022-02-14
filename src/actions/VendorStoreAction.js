// @flow

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
} from './ActionTypes';

export function storeProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: STORE_PROFILE.REQUEST,
  };
}

export function storeProfileSuccess(data) {
  return {
    data,
    type: STORE_PROFILE.SUCCESS,
  };
}

export function storeStatusChangeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: STORE_STATUS_CHANGE.REQUEST,
  };
}

export function storeStatusChangeSuccess(data) {
  return {
    data,
    type: STORE_STATUS_CHANGE.SUCCESS,
  };
}

export function vendorStoreReviewRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VENDOR_STORE_REVIEW.REQUEST,
  };
}

export function vendorStoreReviewSuccess(data) {
  return {
    data,
    type: VENDOR_STORE_REVIEW.SUCCESS,
  };
}

export function vendorNotificationsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VENDOR_NOTIFICATIONS.REQUEST,
  };
}

export function vendorNotificationsSuccess(data) {
  return {
    data,
    type: VENDOR_NOTIFICATIONS.SUCCESS,
  };
}

export function vendorStoreEarningRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VENDOR_STORE_EARNING.REQUEST,
  };
}

export function vendorStoreEarningSuccess(data) {
  return {
    data,
    type: VENDOR_STORE_EARNING.SUCCESS,
  };
}

export function storeDashboardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: STORE_DASHBOARD.REQUEST,
  };
}
export function storeDashboardSuccess(data) {
  return {
    data,
    type: STORE_DASHBOARD.SUCCESS,
  };
}

export function markAsReadRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MARK_AS_READ.REQUEST,
  };
}
export function markAsReadSuccess(data) {
  return {
    data,
    type: MARK_AS_READ.SUCCESS,
  };
}

export function markAsViewedRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MARK_AS_VIEWED.REQUEST,
  };
}
export function markAsViewedSuccess(data) {
  return {
    data,
    type: MARK_AS_VIEWED.SUCCESS,
  };
}

export function getUnViewedNotificationsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_UNVIEWED_NOTIFICATIONS.REQUEST,
  };
}
export function getUnViewedNotificationsSuccess(data) {
  return {
    data,
    type: GET_UNVIEWED_NOTIFICATIONS.SUCCESS,
  };
}
