import {take, put, call, fork} from 'redux-saga/effects';
import {GET_CATEGORIES} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_CATEGORIES as GET_CATEGORIES_URL,
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

function* getCategories() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_CATEGORIES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_CATEGORIES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.data);
        yield put(getCategoriesSuccess(response.data));
      } else {
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

export default function* root() {
  yield fork(getCategories);
}
