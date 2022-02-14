import {take, put, call, fork} from 'redux-saga/effects';
import {CHAT_LISTING} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  CHAT_LISTING as CHAT_LISTING_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {alertMessage, appSettingsSuccess} from '../actions/GeneralActions';
import {chatListingSuccess} from '../actions/ChatActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* chatListing() {
  while (true) {
    const {payload, responseCallback} = yield take(CHAT_LISTING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHAT_LISTING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(chatListingSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

export default function* root() {
  yield fork(chatListing);
}
