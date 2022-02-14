// @flow

import {CHAT_LISTING} from './ActionTypes';

export function chatListingRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHAT_LISTING.REQUEST,
  };
}
export function chatListingSuccess(data) {
  return {
    data,
    type: CHAT_LISTING.SUCCESS,
  };
}
