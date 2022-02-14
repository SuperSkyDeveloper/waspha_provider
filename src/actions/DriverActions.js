// @flow

import {
  ADD_DRIVER,
  ASSING_DRIVER,
  DELETE_DRIVER,
  STORE_DRIVERS,
  GET_DRIVER_CORDS,
  GET_UPDATED_TIME_AND_KM,
} from './ActionTypes';

export function addDriverRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_DRIVER.REQUEST,
  };
}

export function addDriveSuccess(data) {
  return {
    data,
    type: ADD_DRIVER.SUCCESS,
  };
}

export function storeDriversRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: STORE_DRIVERS.REQUEST,
  };
}

export function storeDriversSuccess(data) {
  return {
    data,
    type: STORE_DRIVERS.SUCCESS,
  };
}

export function deleteDriverRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_DRIVER.REQUEST,
  };
}

export function deleteDriverSuccess(data) {
  return {
    data,
    type: DELETE_DRIVER.SUCCESS,
  };
}

export function assingDriverRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ASSING_DRIVER.REQUEST,
  };
}

export function assingDriverSuccess(data) {
  return {
    data,
    type: ASSING_DRIVER.SUCCESS,
  };
}

export function getDriverCords(data) {
  return {
    data,
    type: GET_DRIVER_CORDS,
  };
}

export function getUpdatedRiderTimeAndKM(data) {
  return {
    data,
    type: GET_UPDATED_TIME_AND_KM,
  };
}
