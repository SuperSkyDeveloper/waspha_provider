// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  STORE_STATUS_CHANGE,
  STORE_PROFILE,
  VENDOR_STORE_REVIEW,
  VENDOR_NOTIFICATIONS,
  VENDOR_STORE_EARNING,
  STORE_DASHBOARD,
  USER_SIGNOUT,
  MARK_AS_READ,
  MARK_AS_VIEWED,
  GET_UNVIEWED_NOTIFICATIONS,
} from '../actions/ActionTypes';

const initialState = Immutable({
  storeProfile: {},
  vendorStoreReiview: [],
  vendorNotification: [],
  vendorStoreEarning: {},
  storeDashboard: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_PROFILE.SUCCESS: {
      let temp = _.cloneDeep(state.storeProfile);
      temp = {...temp, ...action.data};
      return Immutable.merge(state, {
        storeProfile: temp,
      });
    }
    case MARK_AS_READ.SUCCESS: {
      const temp = _.cloneDeep(state.storeProfile);
      temp.unread_counts = action.data;

      return Immutable.merge(state, {
        storeProfile: temp,
      });
    }

    case MARK_AS_VIEWED.SUCCESS: {
      const temp = _.cloneDeep(state.storeProfile);
      temp.unviewed_counts = action.data;

      return Immutable.merge(state, {
        storeProfile: temp,
      });
    }

    // getUnViewedNotificationsRequest

    case GET_UNVIEWED_NOTIFICATIONS.SUCCESS: {
      const temp = _.cloneDeep(state.storeProfile);
      temp.unviewed_counts = action.data;

      return Immutable.merge(state, {
        storeProfile: temp,
      });
    }

    case VENDOR_STORE_REVIEW.SUCCESS: {
      return Immutable.merge(state, {
        vendorStoreReiview: action.data,
      });
    }
    case VENDOR_NOTIFICATIONS.SUCCESS: {
      return Immutable.merge(state, {
        vendorNotification: action.data,
      });
    }
    case STORE_DASHBOARD.SUCCESS: {
      return Immutable.merge(state, {
        storeDashboard: action.data,
      });
    }
    case VENDOR_STORE_EARNING.SUCCESS: {
      return Immutable.merge(state, {
        vendorStoreEarning: action.data,
      });
    }
    case STORE_STATUS_CHANGE.SUCCESS: {
      let temp = _.cloneDeep(state.storeProfile);

      let merge = {...temp, ...action.data};

      return Immutable.merge(state, {
        storeProfile: merge,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
