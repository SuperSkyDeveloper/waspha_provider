import {take, put, call, fork} from 'redux-saga/effects';
import {
  CHANGE_DELIVERY_MODE,
  LASTEST_ORDER,
  ORDER_DETAIL,
  CHANGE_PROPOSAL_STATUS,
  GET_ACTIVE_ORDERS,
  PLACE_TRAD_ORDER,
  SELECT_WASPHA_VEHICLE,
  GET_TRADITIONAL_ORDERS,
  GET_TRADITIONAL_ORDER_DETAILS,
  CANCEL_TRADITIONAL_ORDER,
  GET_WASPHA_VEHICLES,
  CHECK_ORDER_ASSIGNED,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  changeDeliveryModeSuccess,
  changeProposalStatusSuccess,
  latestOrderSuccess,
  orderDetailSuccess,
  getActiveOrdersSuccess,
  placeTraditionalOrderSuccess,
  selectWasphaBoxVehicleSuccess,
  getTraditionalOrderDetailsSuccess,
  getTraditionalOrdersSuccess,
  cancelTraditionalOrderSuccess,
  getWasphaVehiclesSuccess,
} from '../actions/OrdersActions';
import {
  LASTEST_ORDER as LASTEST_ORDER_URL,
  ORDER_DETAIL as ORDER_DETAIL_URL,
  CHANGE_DELIVERY_MODE as CHANGE_DELIVERY_MODE_URL,
  CHANGE_PROPOSAL_STATUS as CHANGE_PROPOSAL_STATUS_URL,
  GET_ACTIVE_ORDERS as GET_ACTIVE_ORDERS_URL,
  PLACE_TRAD_ORDER as PLACE_TRAD_ORDER_URL,
  SELECT_WASPHA_VEHICLE as SELECT_WASPHA_VEHICLE_URL,
  GET_TRADITIONAL_ORDERS as GET_TRADITIONAL_ORDERS_URL,
  GET_TRADITIONAL_ORDER_DETAILS as GET_TRADITIONAL_ORDER_DETAILS_URL,
  CANCEL_TRADITIONAL_ORDER as CANCEL_TRADITIONAL_ORDER_URL,
  GET_WASPHA_VEHICLES as GET_WASPHA_VEHICLES_URL,
  CHECK_ORDER_ASSIGNED as CHECK_ORDER_ASSIGNED_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import {alertMessage} from '../actions/GeneralActions';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* latestOrder() {
  while (true) {
    const {payload, responseCallback} = yield take(LASTEST_ORDER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        LASTEST_ORDER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(latestOrderSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* orderDetail() {
  while (true) {
    const {payload, responseCallback} = yield take(ORDER_DETAIL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ORDER_DETAIL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(orderDetailSuccess(response.data));
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(true);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)

        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* changeDeliveryMode() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_DELIVERY_MODE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_DELIVERY_MODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeDeliveryModeSuccess(response.data));

        util.topAlert(response.message);
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(false);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      console.log({err});
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getActiveOrders() {
  while (true) {
    const {responseCallback} = yield take(GET_ACTIVE_ORDERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ACTIVE_ORDERS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getActiveOrdersSuccess(response.orders));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* placeTraditionalOrders() {
  while (true) {
    const {payload, responseCallback} = yield take(PLACE_TRAD_ORDER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PLACE_TRAD_ORDER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(placeTraditionalOrderSuccess(response.data));

        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      console.log({err});
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* selectWasphaBoxVehicle() {
  while (true) {
    const {payload, responseCallback} = yield take(
      SELECT_WASPHA_VEHICLE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        SELECT_WASPHA_VEHICLE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(selectWasphaBoxVehicleSuccess(response.orders));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      console.warn({err});
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getTraditionalOrders() {
  while (true) {
    const {responseCallback} = yield take(GET_TRADITIONAL_ORDERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_TRADITIONAL_ORDERS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getTraditionalOrdersSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      console.warn({err});
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getTraditionalOrderDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_TRADITIONAL_ORDER_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_TRADITIONAL_ORDER_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getTraditionalOrderDetailsSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      console.warn({err});
      if (responseCallback) responseCallback(false);
    }
  }
}

function* cancelTraditionalOrder() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CANCEL_TRADITIONAL_ORDER.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CANCEL_TRADITIONAL_ORDER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(cancelTraditionalOrderSuccess());

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      console.warn({err});
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getWasphaVehicles() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_WASPHA_VEHICLES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_WASPHA_VEHICLES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(getWasphaVehiclesSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(response.status);
        yield put(getWasphaVehiclesSuccess([]));
      }
    } catch (err) {
      console.warn({err});
      if (responseCallback) responseCallback(false);
      yield put(getWasphaVehiclesSuccess([]));
    }
  }
}

function* checkOrderAssigned() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHECK_ORDER_ASSIGNED.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHECK_ORDER_ASSIGNED_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      console.warn({err});
      if (responseCallback) responseCallback({status: false});
    }
  }
}

export default function* root() {
  yield fork(latestOrder);
  yield fork(orderDetail);
  yield fork(changeDeliveryMode);
  yield fork(getActiveOrders);
  yield fork(placeTraditionalOrders);
  yield fork(selectWasphaBoxVehicle);
  yield fork(getTraditionalOrders);
  yield fork(getTraditionalOrderDetails);
  yield fork(cancelTraditionalOrder);
  yield fork(getWasphaVehicles);
  yield fork(checkOrderAssigned);
}
