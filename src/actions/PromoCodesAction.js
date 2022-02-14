// @flow

import {GET_PROMO_CODES} from './ActionTypes';

export function getPromoCodesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PROMO_CODES.REQUEST,
  };
}

export function getPromoCodesSuccess(data) {
  return {
    data,
    type: GET_PROMO_CODES.SUCCESS,
  };
}
