// @flow

import {
  ALERT_MESSAGE,
  APP_SETTINGS,
  CHANGE_LANGUAGE,
  CHECK_DEVICE_STATE,
  CONTACT_US,
  FIRST_TIME_OPEN,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_FAQ,
  GET_GDPR_COMPLIANCE_STATEMENT,
  GET_PRIVACY_POLICY,
  GET_TERMS_AND_CONDITIONS,
  GET_TERMS_DELIVERY_PARTNER,
  TRANSLATIONS,
  UPDATE_DEVICE_ID,
  SET_COUNTRY_CODE,
} from './ActionTypes';

export function translationsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: TRANSLATIONS.REQUEST,
  };
}

export function translationsSuccess(data) {
  return {
    data,
    type: TRANSLATIONS.SUCCESS,
  };
}

export function appSettingsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: APP_SETTINGS.REQUEST,
  };
}

export function appSettingsSuccess(data) {
  return {
    data,
    type: APP_SETTINGS.SUCCESS,
  };
}

export function changeLanguageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_LANGUAGE.REQUEST,
  };
}

export function changeLanguageSuccess(data) {
  return {
    data,
    type: CHANGE_LANGUAGE.SUCCESS,
  };
}

export function contactUsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTACT_US.REQUEST,
  };
}

export function contactUsSuccess(data) {
  return {
    data,
    type: CONTACT_US.SUCCESS,
  };
}

export function getFaqRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_FAQ.REQUEST,
  };
}

export function getFaqSuccess(data) {
  return {
    data,
    type: GET_FAQ.SUCCESS,
  };
}

export function updateDeviceTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_DEVICE_ID.REQUEST,
  };
}
export function updateDeviceTokenSuccess(data) {
  return {
    data,
    type: UPDATE_DEVICE_ID.SUCCESS,
  };
}

export function setFirstTime() {
  return {
    type: FIRST_TIME_OPEN,
  };
}

export function getPrivacyPolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PRIVACY_POLICY.REQUEST,
  };
}
export function getPrivacyPolicySuccess(data) {
  return {
    data,
    type: GET_PRIVACY_POLICY.SUCCESS,
  };
}

export function getTermsAndConditionsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_TERMS_AND_CONDITIONS.REQUEST,
  };
}
export function getTermsAndConditionsSuccess(data) {
  return {
    data,
    type: GET_TERMS_AND_CONDITIONS.SUCCESS,
  };
}

export function getCookiePolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_COOKIE_POLICY.REQUEST,
  };
}
export function getCookiePolicySuccess(data) {
  return {
    data,
    type: GET_COOKIE_POLICY.SUCCESS,
  };
}

export function getCopyRightPolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_COPY_RIGHT_POLICY.REQUEST,
  };
}
export function getCopyRightPolicySuccess(data) {
  return {
    data,
    type: GET_COPY_RIGHT_POLICY.SUCCESS,
  };
}

export function getTermsDeliveryPartnerRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_TERMS_DELIVERY_PARTNER.REQUEST,
  };
}
export function getTermsDeliveryPartnerSuccess(data) {
  return {
    data,
    type: GET_TERMS_DELIVERY_PARTNER.SUCCESS,
  };
}

export function getGDPRComplianceStatementRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_GDPR_COMPLIANCE_STATEMENT.REQUEST,
  };
}
export function getGDPRComplianceStatementSuccess(data) {
  return {
    data,
    type: GET_GDPR_COMPLIANCE_STATEMENT.SUCCESS,
  };
}

export function alertMessage(data) {
  return {
    data,
    type: ALERT_MESSAGE,
  };
}

export function checkDeviceStateRequest(payload, responseCallback) {
  console.log({payloadcheck: payload});
  return {
    payload,
    responseCallback,
    type: CHECK_DEVICE_STATE.REQUEST,
  };
}

export function checkDeviceStateSuccess() {
  return {
    type: CHECK_DEVICE_STATE.SUCCESS,
  };
}

export function setCountryCode(data) {
  return {
    data,
    type: SET_COUNTRY_CODE,
  };
}
