import {
  CHANGE_DELIVERY_MODE,
  CHANGE_PROPOSAL_STATUS,
  LASTEST_ORDER,
  ORDER_DETAIL,
  GET_ACTIVE_ORDERS,
  PLACE_TRAD_ORDER,
  SELECT_WASPHA_VEHICLE,
  GET_TRADITIONAL_ORDERS,
  GET_TRADITIONAL_ORDER_DETAILS,
  CANCEL_TRADITIONAL_ORDER,
  RIDER_FOUND,
  GET_WASPHA_VEHICLES,
  EXPRESS_RIDER_FOUND,
  CHECK_ORDER_ASSIGNED,
} from './ActionTypes';

export function latestOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: LASTEST_ORDER.REQUEST,
  };
}

export function latestOrderSuccess(data) {
  return {
    data,
    type: LASTEST_ORDER.SUCCESS,
  };
}

export function orderDetailRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ORDER_DETAIL.REQUEST,
  };
}

export function orderDetailSuccess(data) {
  return {
    data,
    type: ORDER_DETAIL.SUCCESS,
  };
}

export function changeDeliveryModeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_DELIVERY_MODE.REQUEST,
  };
}

export function changeDeliveryModeSuccess(data) {
  return {
    data,
    type: CHANGE_DELIVERY_MODE.SUCCESS,
  };
}

export function getActiveOrdersRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ACTIVE_ORDERS.REQUEST,
  };
}

export function getActiveOrdersSuccess(data) {
  return {
    data,
    type: GET_ACTIVE_ORDERS.SUCCESS,
  };
}

export function placeTraditionalOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PLACE_TRAD_ORDER.REQUEST,
  };
}

export function placeTraditionalOrderSuccess(data) {
  return {
    data,
    type: PLACE_TRAD_ORDER.SUCCESS,
  };
}

export function selectWasphaBoxVehicleRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SELECT_WASPHA_VEHICLE.REQUEST,
  };
}

export function selectWasphaBoxVehicleSuccess(data) {
  return {
    data,
    type: SELECT_WASPHA_VEHICLE.SUCCESS,
  };
}

export function getTraditionalOrdersRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_TRADITIONAL_ORDERS.REQUEST,
  };
}

export function getTraditionalOrdersSuccess(data) {
  return {
    data,
    type: GET_TRADITIONAL_ORDERS.SUCCESS,
  };
}

export function getTraditionalOrderDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_TRADITIONAL_ORDER_DETAILS.REQUEST,
  };
}

export function getTraditionalOrderDetailsSuccess(data) {
  return {
    data,
    type: GET_TRADITIONAL_ORDER_DETAILS.SUCCESS,
  };
}

export function cancelTraditionalOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CANCEL_TRADITIONAL_ORDER.REQUEST,
  };
}

export function cancelTraditionalOrderSuccess() {
  return {
    type: CANCEL_TRADITIONAL_ORDER.SUCCESS,
  };
}

export function isRiderFound(data) {
  return {
    data,
    type: RIDER_FOUND,
  };
}

export function isExpressRiderFound(data) {
  return {
    data,
    type: EXPRESS_RIDER_FOUND,
  };
}

export function getWasphaVehiclesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_WASPHA_VEHICLES.REQUEST,
  };
}

export function getWasphaVehiclesSuccess(data) {
  return {
    data,
    type: GET_WASPHA_VEHICLES.SUCCESS,
  };
}

export function checkOrderAssignedRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHECK_ORDER_ASSIGNED.REQUEST,
  };
}

export function checkOrderAssignedSuccess() {
  return {
    type: CHECK_ORDER_ASSIGNED.SUCCESS,
  };
}
