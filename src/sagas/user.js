import {take, put, call, fork} from 'redux-saga/effects';
import {
  USER_SIGNUP,
  USER_SIGNIN,
  SOCIAL_LOGIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  USER_CONFIRM_OTP,
  USER_UPDATE_PASSWORD,
  CONTACT_ADMIN,
  GET_PROFILE_SECTIONS,
  POST_PROFILE_DATA,
  DELETE_PROFILE_SUBSECTION_DATA,
  RESEND_CODE,
  VERIFY_RESET_PASSWORD,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  EDIT_BUSINESS_PROFILE,
  GET_STORE_PROFILE,
  CHANGE_EMAIL_OR_PHONE,
  CHANGE_EMAIL_OR_PHONE_OTP,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  userSignupSuccess,
  userSigninSuccess,
  userSignOutSuccess,
  updateUserProfileSuccess,
  getProfileSectionsSuccess,
  confirmOTPSuccess,
  resendCodeSuccess,
  forgotPasswordSuccess,
  resetPasswordSuccess,
  changePasswordSuccess,
  getStoreProfileSuccess,
  changeEmailOrPhoneOTPSuccess,
  changeEmailOrPhoneSuccess,
} from '../actions/UserActions';
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  SOCIAL_LOGIN as SOCIAL_LOGIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  UPDATE_USER_PROFILE as UPDATE_USER_PROFILE_URL,
  USER_FORGOT_PASSWORD as USER_FORGOT_PASSWORD_URL,
  USER_CONFIRM_OTP as USER_CONFIRM_OTP_URL,
  RESEND_CODE as RESEND_CODE_URL,
  USER_UPDATE_PASSWORD as USER_UPDATE_PASSWORD_URL,
  VERIFY_RESET_PASSWORD as VERIFY_RESET_PASSWORD_URL,
  CONTACT_ADMIN as CONTACT_ADMIN_URL,
  RESET_PASSWORD as RESET_PASSWORD_URL,
  CHANGE_PASSWORD as CHANGE_PASSWORD_URL,
  GET_PROFILE_SECTIONS as GET_PROFILE_SECTIONS_URL,
  POST_PROFILE_DATA as POST_PROFILE_DATA_URL,
  EDIT_BUSINESS_PROFILE as EDIT_BUSINESS_PROFILE_URL,
  GET_STORE_PROFILE as GET_STORE_PROFILE_URL,
  DELETE_PROFILE_SUBSECTION_DATA as DELETE_PROFILE_SUBSECTION_DATA_URL,
  CHANGE_EMAIL_OR_PHONE as CHANGE_EMAIL_OR_PHONE_URL,
  CHANGE_EMAIL_OR_PHONE_OTP as CHANGE_EMAIL_OR_PHONE_OTP_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {storeProfileSuccess} from '../actions/VendorStoreAction';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSignupSuccess(response.data));
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(false);
        // //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSigninSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        console.log('EDED');
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      console.log('EDED');

      if (responseCallback) responseCallback(false);
    }
  }
}

function* socialLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(SOCIAL_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SOCIAL_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSigninSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(alert(response.message));

        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* resendCode() {
  while (true) {
    const {payload, responseCallback} = yield take(RESEND_CODE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESEND_CODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(resendCodeSuccess(response.data));
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

function* resetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(RESET_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(resetPasswordSuccess(response.data));
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

// function* signout() {
//   while (true) {
//     const {responseCallback} = yield take(USER_SIGNOUT.REQUEST);
//     try {
//       const response = yield call(
//         callRequest,
//         USER_SIGNOUT_URL,
//         {},
//         '',
//         {},
//         ApiSauce,
//       );

//       if (response.data) {
//         if (responseCallback) responseCallback(true, null);
//         yield put(userSignOutSuccess());
//       } else {
//         yield put(alertMessage(strings.SOMETHING_WENT_WRONG))//         yield put(userSignOutSuccess());
//       }
//     } catch (err) {
//       if (responseCallback) responseCallback(null, err);
//       Util.topAlertError(err.message);
//       yield put(userSignOutSuccess());
//     }
//   }
// }

function* signout() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(userSignOutSuccess());
      if (response.status) {
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* updateUserProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_USER_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.data) {
        yield put(updateUserProfileSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
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

function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(forgotPasswordSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

//change phone and email start

function* changeEmailOrPhone() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_EMAIL_OR_PHONE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_EMAIL_OR_PHONE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(changeEmailOrPhoneSuccess(response.data));

        if (responseCallback) responseCallback(response);
      } else {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      //util.topAlert(strings.SOMETHING_WENT_WRONG)
      yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
    }
  }
}

function* changeEmailOrPhoneOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_EMAIL_OR_PHONE_OTP.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_EMAIL_OR_PHONE_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeEmailOrPhoneOTPSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      //util.topAlert(strings.SOMETHING_WENT_WRONG)
      yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
    }
  }
}

//change phone and email end

function* verifyResetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      VERIFY_RESET_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        VERIFY_RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        Util.topAlertError(response.message);
        // yield put(forgotPasswordSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
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

function* confirmOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_CONFIRM_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_CONFIRM_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(confirmOTPSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
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

function* updatePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_UPDATE_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_UPDATE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.data) {
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* contactAdmin() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTACT_ADMIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTACT_ADMIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(response.message, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

function* getProfileSections() {
  while (true) {
    const {responseCallback} = yield take(GET_PROFILE_SECTIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROFILE_SECTIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
        yield put(getProfileSectionsSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

function* postProfileData() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_PROFILE_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_PROFILE_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

function* deleteProfileSubSectionDataRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_PROFILE_SUBSECTION_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.topAlertError(err.message);
    }
  }
}

// function* changePassword() {
//   while (true) {
//     const {payload, responseCallback} = yield take(CHANGE_PASSWORD.REQUEST);
//     try {
//       const response = yield call(
//         callRequest,
//         CHANGE_PASSWORD_URL,
//         payload,
//         '',
//         {},
//         ApiSauce,
//       );
//       if (response.status) {
//         yield put(changePasswordSuccess(response.data));
//         if (responseCallback) responseCallback(true, null);
//         //util.topAlert(response.message);
//  alertMessage(response.message)
//       } else {
//         if (responseCallback) responseCallback(null, null);
//            //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
// alertMessage(response.message || strings.SOMETHING_WENT_WRONG)
//       }
//     } catch (err) {
//       if (responseCallback) responseCallback(null, err);
//       Util.topAlert(err.message || strings.SOMETHING_WENT_WRONG);
//     }
//   }
// }

function* changePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        // yield put(changePasswordSuccess(response.data));
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

function* editBusinessProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(
      EDIT_BUSINESS_PROFILE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        EDIT_BUSINESS_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(storeProfileSuccess(response.data));
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

function* getStoreProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_STORE_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_STORE_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getStoreProfileSuccess(response.data));
        yield put(storeProfileSuccess(response.data));
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
  yield fork(signup);
  yield fork(signin);
  yield fork(socialLogin);
  yield fork(confirmOTP);
  yield fork(resendCode);
  yield fork(verifyResetPassword);
  yield fork(resetPassword);
  yield fork(changePassword);
  yield fork(signout);
  yield fork(contactAdmin);
  yield fork(forgotPassword);
  yield fork(updatePassword);
  yield fork(postProfileData);
  yield fork(getStoreProfile);
  yield fork(updateUserProfile);
  yield fork(getProfileSections);
  yield fork(editBusinessProfile);
  yield fork(deleteProfileSubSectionDataRequest);
  yield fork(changeEmailOrPhone);
  yield fork(changeEmailOrPhoneOTP);
}
