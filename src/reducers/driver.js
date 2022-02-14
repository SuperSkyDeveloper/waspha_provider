// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_DRIVER_CORDS,
  GET_UPDATED_TIME_AND_KM,
  STORE_DRIVERS,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  storeDriver: [],
  driverCords: {},
  driverTimeAndKm: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_DRIVERS.SUCCESS: {
      return Immutable.merge(state, {
        storeDriver: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case GET_DRIVER_CORDS: {
      return Immutable.merge(state, {
        driverCords: action.data,
      });
    }

    case GET_UPDATED_TIME_AND_KM: {
      return Immutable.merge(state, {
        driverTimeAndKm: action.data,
      });
    }

    default:
      return state;
  }
};
