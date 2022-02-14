import {SUBMIT_RATING, GET_RATINGS} from './ActionTypes';

export function submitRatingRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SUBMIT_RATING.REQUEST,
  };
}

export function submitRatingSuccess() {
  return {
    type: SUBMIT_RATING.SUCCESS,
  };
}

export function getRatingsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_RATINGS.REQUEST,
  };
}

export function getRatingSuccess() {
  return {
    type: GET_RATINGS.SUCCESS,
  };
}
