// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {CHAT_LISTING} from '../actions/ActionTypes';

const initialState = Immutable({
  chatListing,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CHAT_LISTING.SUCCESS: {
      return Immutable.merge(state, {
        chatListing: action.data,
      });
    }

    default:
      return state;
  }
};
