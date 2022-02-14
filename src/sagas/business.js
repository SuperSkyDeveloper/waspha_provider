import {take, put, call, fork} from 'redux-saga/effects';
import {BUSINESS_REGISTRATION} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {businessRegistrationSuccess} from '../actions/UserActions';
import {
  BUSINESS_REGISTRATION as BUSINESS_REGISTRATION_URL,
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

function* businessRegistration() {
  while (true) {
    const {payload, responseCallback} = yield take(
      BUSINESS_REGISTRATION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        BUSINESS_REGISTRATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(businessRegistrationSuccess(response.data));
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
  yield fork(businessRegistration);
}
