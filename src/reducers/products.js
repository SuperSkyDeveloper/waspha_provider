import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_CATEGORY,
  GET_TRENDING_PRODUCT,
  SEARCH_PRODUCT,
  STORE_CATALOG,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {Images} from '../theme';
const initialState = Immutable({
  allProducts: {},
  products: [],
  allCategories: [],
  trendingProducts: [],
  searchProducts: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS.SUCCESS: {
      return Immutable.merge(state, {
        allProducts: action.data,
      });
    }

    case STORE_CATALOG.SUCCESS: {
      // for category
      let tempCategory = _.cloneDeep(state.allCategories);
      let categories = _.unionBy(action.data.categories, tempCategory, 'id');

      // for product
      let tempProduct = _.cloneDeep(state.products);
      let products = _.unionBy(action.data.products, tempProduct, 'id');

      return Immutable.merge(state, {
        products: products,
        allCategories: categories,
      });
    }
    case GET_TRENDING_PRODUCT.SUCCESS: {
      return Immutable.merge(state, {
        trendingProducts: action.data,
      });
    }
    case SEARCH_PRODUCT.SUCCESS: {
      return Immutable.merge(state, {
        searchProducts: action.data,
      });
    }
    case DELETE_CATEGORY.SUCCESS: {
      let temp = _.cloneDeep(state.allCategories);
      let findIndex = _.findIndex(temp, ['id', action.data.id]);
      temp.splice(findIndex, 1);
      return Immutable.merge(state, {
        allCategories: temp,
      });
    }
    case DELETE_PRODUCT.SUCCESS: {
      let temp = _.cloneDeep(state.products);

      let findIndex = _.findIndex(temp, ['id', action.data.id]);
      temp.splice(findIndex, 1);

      return Immutable.merge(state, {
        products: temp,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case GET_PRODUCT_CATEGORY.SUCCESS: {
      return Immutable.merge(state, {
        allCategories: action.data,
      });
    }
    default:
      return state;
  }
};
