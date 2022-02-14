import {GET_CATEGORIES} from './ActionTypes';

export function getCategoriesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_CATEGORIES.REQUEST,
  };
}

export function getCategoriesSuccess(data) {
  return {
    data,
    type: GET_CATEGORIES.SUCCESS,
  };
}
