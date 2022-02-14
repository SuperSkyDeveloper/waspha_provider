// @flow

import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  SOCIAL_LOGIN,
  USER_CONFIRM_OTP_FGPASS,
  USER_UPDATE_PASSWORD,
  CONTACT_ADMIN,
  GET_PROFILE_SECTIONS,
  POST_PROFILE_DATA,
  DELETE_PROFILE_SUBSECTION_DATA,
  USER_CONFIRM_OTP,
  RESEND_CODE,
  VERIFY_RESET_PASSWORD,
  RESET_PASSWORD,
  BUSINESS_REGISTRATION,
  REMEMBER_ME,
  CHANGE_PASSWORD,
  SAVE_STORE_DATA,
  EDIT_BUSINESS_PROFILE,
  GET_STORE_PROFILE,
  UPDATE_USER_DATA,
  REFRESH_TOKEN,
  CHANGE_EMAIL_OR_PHONE_OTP,
  CHANGE_EMAIL_OR_PHONE,
} from './ActionTypes';

export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    type: USER_SIGNUP.SUCCESS,
  };
}

export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data, access_token, save_token) {
  return {
    data,
    access_token,
    save_token,
    type: USER_SIGNIN.SUCCESS,
  };
}

export function userSignOutRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}

export function socialLoginRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SOCIAL_LOGIN.REQUEST,
  };
}

export function socialLoginSuccess(data, access_token, save_token) {
  return {
    data,
    access_token,
    save_token,
    type: SOCIAL_LOGIN.SUCCESS,
  };
}

export function updateUserProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_USER_PROFILE.REQUEST,
  };
}

export function updateUserProfileSuccess(data) {
  return {
    data,
    type: UPDATE_USER_PROFILE.SUCCESS,
  };
}

export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD.REQUEST,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    data,
    type: USER_FORGOT_PASSWORD.SUCCESS,
  };
}

export function confirmOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CONFIRM_OTP.REQUEST,
  };
}
export function confirmOTPSuccess(data) {
  return {
    data,
    type: USER_CONFIRM_OTP.SUCCESS,
  };
}

export function updatePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_UPDATE_PASSWORD.REQUEST,
  };
}

export function contactAdminRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTACT_ADMIN.REQUEST,
  };
}

export function getProfileSectionsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PROFILE_SECTIONS.REQUEST,
  };
}

export function getProfileSectionsSuccess(data) {
  return {
    data,
    type: GET_PROFILE_SECTIONS.SUCCESS,
  };
}

export function postProfileDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_PROFILE_DATA.REQUEST,
  };
}

export function deleteProfileSubSectionDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
  };
}

export function resendCodeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESEND_CODE.REQUEST,
  };
}

export function resendCodeSuccess(data) {
  return {
    data,
    type: RESEND_CODE.SUCCESS,
  };
}

export function verifyResetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VERIFY_RESET_PASSWORD.REQUEST,
  };
}

export function verifyResetPasswordSuccess(data) {
  return {
    data,
    type: VERIFY_RESET_PASSWORD.SUCCESS,
  };
}

export function resetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESET_PASSWORD.REQUEST,
  };
}

export function resetPasswordSuccess(data) {
  return {
    data,
    type: RESET_PASSWORD.SUCCESS,
  };
}

export function businessRegistrationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: BUSINESS_REGISTRATION.REQUEST,
  };
}

export function businessRegistrationSuccess(data) {
  return {
    data,
    type: BUSINESS_REGISTRATION.SUCCESS,
  };
}

export function rememberMe(data) {
  return {
    data,
    type: REMEMBER_ME,
  };
}

export function changePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PASSWORD.REQUEST,
  };
}
export function changePasswordSuccess(data) {
  return {
    data,
    type: CHANGE_PASSWORD.SUCCESS,
  };
}

export function saveStoreData(data) {
  return {
    data,
    type: SAVE_STORE_DATA,
  };
}

export function editBusinessProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_BUSINESS_PROFILE.REQUEST,
  };
}
export function editBusinessProfileSuccess(data) {
  return {
    data,
    type: EDIT_BUSINESS_PROFILE.SUCCESS,
  };
}

export function getStoreProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_STORE_PROFILE.REQUEST,
  };
}
export function getStoreProfileSuccess(data) {
  return {
    data,
    type: GET_STORE_PROFILE.SUCCESS,
  };
}

export function changeEmailOrPhoneRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_EMAIL_OR_PHONE.REQUEST,
  };
}

export function changeEmailOrPhoneSuccess(data) {
  return {
    data,
    type: CHANGE_EMAIL_OR_PHONE.SUCCESS,
  };
}

export function changeEmailOrPhoneOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_EMAIL_OR_PHONE_OTP.REQUEST,
  };
}

export function changeEmailOrPhoneOTPSuccess(data) {
  return {
    data,
    type: CHANGE_EMAIL_OR_PHONE_OTP.SUCCESS,
  };
}

export function updateUserData(data) {
  return {
    data,
    type: UPDATE_USER_DATA,
  };
}

export function refreshToken(data) {
  return {
    data,
    type: REFRESH_TOKEN,
  };
}
