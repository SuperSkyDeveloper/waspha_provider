import {take, put, call, fork} from 'redux-saga/effects';
import {SUBMIT_RATING, GET_RATINGS} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  SUBMIT_RATING as SUBMIT_RATING_URL,
  GET_RATINGS as GET_RATINGS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {getRatingSuccess} from '../actions/RatingActions';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* submitRating() {
  while (true) {
    const {payload, responseCallback} = yield take(SUBMIT_RATING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SUBMIT_RATING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getRatingSuccess(response.data.review_ratings));

        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(getRatingSuccess(response.data.review_ratings));

        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getRatings() {
  while (true) {
    const {responseCallback} = yield take(GET_RATINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_RATINGS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(submitRating);
  yield fork(getRatings);
}
