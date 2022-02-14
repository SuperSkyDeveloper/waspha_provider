import {take, put, call, fork} from 'redux-saga/effects';
import {GET_PROMO_CODES} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_PROMO_CODES as GET_PROMO_CODES_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {getPromoCodesSuccess} from '../actions/PromoCodesAction';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getPromoCodes() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PROMO_CODES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROMO_CODES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getPromoCodesSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);

        // //util.topAlert(strings.SOMETHING_WENT_WRONG)

        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(getPromoCodes);
}
