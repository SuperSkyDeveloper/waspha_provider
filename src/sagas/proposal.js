import {take, put, call, fork} from 'redux-saga/effects';
import {
  CREATE_PROSPAL,
  GET_ORDER_DETAIL,
  GET_ORDER_LIST,
  REJECT_ORDER,
  CONFIRM_PROPOSAL,
  LASTEST_ORDER,
  CHANGE_PROPOSAL_STATUS,
  UPDATE_PROSPAL,
  IS_ORDER_RATED,
} from '../actions/ActionTypes';

import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  changeProposalStatusSuccess,
  confirmProposalSuccess,
  createProposalSuccess,
  getOrderDetailSuccess,
  getOrderListSuccess,
  isOrderRatedSuccess,
  rejectOrderSuccess,
  updateProposalSuccess,
} from '../actions/ProposalActions';
import {
  GET_ORDER_LIST as GET_ORDER_LIST_URL,
  GET_ORDER_DETAIL as GET_ORDER_DETAIL_URL,
  callRequest,
  REJECT_ORDER as REJECT_ORDER_URL,
  CREATE_PROSPAL as CREATE_PROSPAL_URL,
  CONFIRM_PROPOSAL as CONFIRM_PROPOSAL_URL,
  LASTEST_ORDER as LASTEST_ORDER_URL,
  UPDATE_PROSPAL as UPDATE_PROSPAL_URL,
  CHANGE_PROPOSAL_STATUS as CHANGE_PROPOSAL_STATUS_URL,
  IS_ORDER_RATED as IS_ORDER_RATED_URL,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* isOrderRated() {
  while (true) {
    const {payload, responseCallback} = yield take(IS_ORDER_RATED.REQUEST);
    try {
      const response = yield call(
        callRequest,
        IS_ORDER_RATED_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(isOrderRatedSuccess(response.data.is_rated));

        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* getOrderList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_ORDER_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ORDER_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getOrderListSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* getOrderDetail() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_ORDER_DETAIL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ORDER_DETAIL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getOrderDetailSuccess(response.data));
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

function* rejectOrder() {
  while (true) {
    const {payload, responseCallback} = yield take(REJECT_ORDER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REJECT_ORDER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(rejectOrderSuccess(payload));
        if (responseCallback) responseCallback(response.status);
      } else {
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* creteProposal() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_PROSPAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_PROSPAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(createProposalSuccess(response.data));
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

function* confirmProposal() {
  while (true) {
    const {payload, responseCallback} = yield take(CONFIRM_PROPOSAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONFIRM_PROPOSAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(confirmProposalSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* changeProposalStatus() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_PROPOSAL_STATUS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_PROPOSAL_STATUS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(changeProposalStatusSuccess(payload));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* updateProposal() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_PROSPAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_PROSPAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(updateProposalSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
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
  yield fork(rejectOrder);
  yield fork(getOrderList);
  yield fork(creteProposal);
  yield fork(updateProposal);
  yield fork(getOrderDetail);
  yield fork(confirmProposal);
  yield fork(changeProposalStatus);
  yield fork(isOrderRated);
}
