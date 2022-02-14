// @flow

import {BUSINESS_REGISTRATION} from './ActionTypes';

export function businessRegistrationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: BUSINESS_REGISTRATION.REQUEST,
  };
}

export function businessRegistrationSuccess(data) {
  return {
    data,
    type: BUSINESS_REGISTRATION.SUCCESS,
  };
}
