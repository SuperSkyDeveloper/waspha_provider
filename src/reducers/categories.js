import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {GET_CATEGORIES, USER_SIGNOUT} from '../actions/ActionTypes';
import {Images} from '../theme';

const initialState = Immutable({
  categories: [
    {
      id: 0,
      parentCategoryId: null,
      cover: Images.Category,
      name: 'Electronics',
      description: 'zcsc jskc kis cjisj  ',
    },
    {
      id: 1,
      parentCategoryId: 0,
      cover: Images.Category,
      name: 'Mobile',
      description: 'zcsc jskc kis cjisj  ',
    },
    {
      id: 2,
      parentCategoryId: 1,
      cover: Images.Category,
      name: 'Samsung',
      description: 'zcsc jskc kis cjisj  ',
    },
    {
      id: 3,
      parentCategoryId: 0,
      cover: Images.Category,
      name: 'Note Series',
      description: 'zcsc jskc kis cjisj  ',
    },
    {
      id: 4,
      parentCategoryId: null,
      cover: Images.Category,
      name: 'Cars',
      description: 'zcsc jskc kis cjisj  ',
    },
    {
      id: 5,
      parentCategoryId: 0,
      cover: Images.Category,
      name: 'Toyota',
      description: 'zcsc jskc kis cjisj  ',
    },

    {
      id: 6,
      parentCategoryId: 5,
      cover: Images.Category,
      name: 'Corolla',
      description: 'zcsc jskc kis cjisj  ',
    },
    {
      id: 7,
      parentCategoryId: 6,
      cover: Images.Category,
      name: 'GLI',
      description: 'zcsc jskc kis cjisj  ',
    },
  ],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES.SUCCESS: {
      return Immutable.merge(state, {
        categories: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
