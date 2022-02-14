// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {GET_RATINGS} from '../actions/ActionTypes';

const initialState = Immutable({
  ratings: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RATINGS.SUCCESS: {
      return Immutable.merge(state, {
        ratings: action.data,
      });
    }

    default:
      return state;
  }
};
