import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_DRIVER,
  ASSING_DRIVER,
  DELETE_DRIVER,
  STORE_DRIVERS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  addDriveSuccess,
  assingDriverSuccess,
  deleteDriverSuccess,
  storeDriversSuccess,
} from '../actions/DriverActions';
import {
  ADD_DRIVER as ADD_DRIVER_URL,
  STORE_DRIVERS as STORE_DRIVERS_URL,
  DELETE_DRIVER as DELETE_DRIVER_URL,
  ASSING_DRIVER as ASSING_DRIVER_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addDriver() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_DRIVER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_DRIVER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addDriveSuccess(response.data));
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

function* storeDriver() {
  while (true) {
    const {payload, responseCallback} = yield take(STORE_DRIVERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        STORE_DRIVERS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(storeDriversSuccess(response.data));
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

function* deleteDriver() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_DRIVER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_DRIVER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteDriverSuccess(response.data));
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
function* assignDriver() {
  while (true) {
    const {payload, responseCallback} = yield take(ASSING_DRIVER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ASSING_DRIVER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(assingDriverSuccess(response.data));
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

export default function* root() {
  yield fork(addDriver);
  yield fork(storeDriver);
  yield fork(deleteDriver);
  yield fork(assignDriver);
}
