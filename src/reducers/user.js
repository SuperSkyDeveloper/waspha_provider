// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  USER_SIGNIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  GET_PROFILE_SECTIONS,
  USER_CONFIRM_OTP,
  RESEND_CODE,
  USER_FORGOT_PASSWORD,
  REMEMBER_ME,
  SAVE_STORE_DATA,
  GET_STORE_PROFILE,
  UPDATE_USER_DATA,
  REFRESH_TOKEN,
  CHANGE_EMAIL_OR_PHONE,
  CHANGE_EMAIL_OR_PHONE_OTP,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  profileSections: [],
  credentials: {},
  saveStoreData: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case USER_SIGNUP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      const temp = _.cloneDeep(state.data);
      return Immutable.merge(state, {
        data: {...temp, ...action.data},
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        data: {},
        profileSections: [],
      });
    }
    // case USER_SIGNOUT.SUCCESS: {
    //   return Immutable.merge(state, initialState);
    // }

    case GET_PROFILE_SECTIONS.SUCCESS: {
      return Immutable.merge(state, {
        profileSections: action.data,
      });
    }

    case CHANGE_EMAIL_OR_PHONE_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case USER_CONFIRM_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case RESEND_CODE.SUCCESS: {
      const temp = _.cloneDeep(action.data);
      let finalData = {...temp, ...action.data};
      return Immutable.merge(state, {
        data: finalData,
      });
    }
    case USER_FORGOT_PASSWORD.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case REMEMBER_ME: {
      return Immutable.merge(state, {
        credentials: action.data,
      });
    }
    case SAVE_STORE_DATA: {
      return Immutable.merge(state, {
        saveStoreData: action.data,
      });
    }
    case GET_STORE_PROFILE.SUCCESS: {
      let temp = _.cloneDeep(state.data);

      temp.is_approved = action.data.is_approved;

      return Immutable.merge(state, {
        data: {...state.data, ...temp},
      });
    }

    case UPDATE_USER_DATA: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case REFRESH_TOKEN: {
      let newData = _.cloneDeep(state.data);
      newData.access_token = action.data.access_token;
      newData.refresh_token = action.data.refresh_token;

      return Immutable.merge(state, {
        data: newData,
      });
    }

    default:
      return state;
  }
};
