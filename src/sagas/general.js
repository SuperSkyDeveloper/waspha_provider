import {take, put, call, fork} from 'redux-saga/effects';
import {
  APP_SETTINGS,
  CHANGE_LANGUAGE,
  CONTACT_US,
  GET_FAQ,
  GET_PRIVACY_POLICY,
  GET_TERMS_AND_CONDITIONS,
  UPDATE_DEVICE_ID,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_TERMS_DELIVERY_PARTNER,
  GET_GDPR_COMPLIANCE_STATEMENT,
  TRANSLATIONS,
  CHECK_DEVICE_STATE,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  APP_SETTINGS as APP_SETTINGS_URL,
  CHANGE_LANGUAGE as CHANGE_LANGUAGE_URL,
  CONTACT_US as CONTACT_US_URL,
  GET_FAQ as GET_FAQ_URL,
  UPDATE_DEVICE_ID as UPDATE_DEVICE_ID_URL,
  GET_PRIVACY_POLICY as GET_PRIVACY_POLICY_URL,
  GET_TERMS_AND_CONDITIONS as GET_TERMS_AND_CONDITIONS_URL,
  GET_COOKIE_POLICY as GET_COOKIE_POLICY_URL,
  GET_COPY_RIGHT_POLICY as GET_COPY_RIGHT_POLICY_URL,
  GET_TERMS_DELIVERY_PARTNER as GET_TERMS_DELIVERY_PARTNER_URL,
  GET_GDPR_COMPLIANCE_STATEMENT as GET_GDPR_COMPLIANCE_STATEMENT_URL,
  TRANSLATIONS as TRANSLATIONS_URL,
  CHECK_DEVICE_STATE as CHECK_DEVICE_STATE_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {
  alertMessage,
  appSettingsSuccess,
  changeLanguageSuccess,
  contactUsSuccess,
  getCookiePolicySuccess,
  getCopyRightPolicySuccess,
  getFaqSuccess,
  getGDPRComplianceStatementSuccess,
  getPrivacyPolicySuccess,
  getTermsAndConditionsSuccess,
  getTermsDeliveryPartnerSuccess,
  translationsSuccess,
} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* translations() {
  while (true) {
    const {payload, responseCallback} = yield take(TRANSLATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        TRANSLATIONS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(translationsSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

function* changeLanguage() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_LANGUAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_LANGUAGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(changeLanguageSuccess(payload));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

function* appSetting() {
  while (true) {
    const {payload, responseCallback} = yield take(APP_SETTINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        APP_SETTINGS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(appSettingsSuccess(response.data));
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

function* contactUs() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTACT_US.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTACT_US_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(contactUsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

function* getFaq() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_FAQ.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_FAQ_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getFaqSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

function* updateDeviceToken() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_DEVICE_ID.REQUEST);

    try {
      const response = yield call(
        callRequest,
        UPDATE_DEVICE_ID_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        // yield put(updateDeviceTokenSuccess(response));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        //   yield put( alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);

      // alert(Util.getErrorText(err.message));
    }
  }
}

function* getPrivacyPolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_PRIVACY_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_PRIVACY_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getPrivacyPolicySuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getTermsAndConditions() {
  while (true) {
    const {responseCallback} = yield take(GET_TERMS_AND_CONDITIONS.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_TERMS_AND_CONDITIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getTermsAndConditionsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getCookiePolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_COOKIE_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_COOKIE_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getCookiePolicySuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getCopyRightPolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_COPY_RIGHT_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_COPY_RIGHT_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getCopyRightPolicySuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getTermsDeliveryPartner() {
  while (true) {
    const {responseCallback} = yield take(GET_TERMS_DELIVERY_PARTNER.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_TERMS_DELIVERY_PARTNER_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getTermsDeliveryPartnerSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}
function* getGDPRComplianceStatement() {
  while (true) {
    const {responseCallback} = yield take(
      GET_GDPR_COMPLIANCE_STATEMENT.REQUEST,
    );

    try {
      const response = yield call(
        callRequest,
        GET_GDPR_COMPLIANCE_STATEMENT_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getGDPRComplianceStatementSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* checkDeviceState() {
  while (true) {
    const {payload, responseCallback} = yield take(CHECK_DEVICE_STATE.REQUEST);

    try {
      const response = yield call(
        callRequest,
        CHECK_DEVICE_STATE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(appSetting);
  yield fork(changeLanguage);
  yield fork(getFaq);
  yield fork(contactUs);
  yield fork(updateDeviceToken);
  yield fork(getPrivacyPolicy);
  yield fork(getTermsAndConditions);
  yield fork(getCookiePolicy);
  yield fork(translations);
  yield fork(getCopyRightPolicy);
  yield fork(getTermsDeliveryPartner);
  yield fork(getGDPRComplianceStatement);
  yield fork(checkDeviceState);
}
