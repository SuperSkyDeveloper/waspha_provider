import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_CATEGORY,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  EDIT_CATEGORY,
  EDIT_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_CATEGORY,
  GET_TRENDING_PRODUCT,
  SEARCH_PRODUCT,
  STORE_CATALOG,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_PRODUCTS as GET_PRODUCTS_URL,
  ADD_PRODUCT_CATEGORY as ADD_PRODUCT_CATEGORY_URL,
  ADD_PRODUCT as ADD_PRODUCT_URL,
  SEARCH_PRODUCT as SEARCH_PRODUCT_URL,
  GET_PRODUCT_CATEGORY as GET_PRODUCT_CATEGORY_URL,
  GET_TRENDING_PRODUCT as GET_TRENDING_PRODUCT_URL,
  EDIT_PRODUCT as EDIT_PRODUCT_URL,
  EDIT_CATEGORY as EDIT_CATEGORY_URL,
  DELETE_PRODUCT as DELETE_PRODUCT_URL,
  DELETE_CATEGORY as DELETE_CATEGORY_URL,
  STORE_CATALOG as STORE_CATALOG_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {
  addProductCategorySuccess,
  addProductSuccess,
  deleteCateogrySuccess,
  deleteProductSuccess,
  editCategorySuccess,
  editProductSuccess,
  getProductCategorySuccess,
  getProductsSuccess,
  getTrendingProductSuccess,
  searchProductSuccess,
  storeCatalogSuccess,
} from '../actions/ProductsActions';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getProducts() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PRODUCTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PRODUCTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getProductsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);

        //util.topAlert(strings.SOMETHING_WENT_WRONG)

        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* addProductCategory() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ADD_PRODUCT_CATEGORY.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        ADD_PRODUCT_CATEGORY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addProductCategorySuccess(response.data));
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

function* addProduct() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_PRODUCT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_PRODUCT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addProductSuccess(response.data));
        if (responseCallback) responseCallback(true);
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

function* searchProduct() {
  while (true) {
    const {payload, responseCallback} = yield take(SEARCH_PRODUCT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SEARCH_PRODUCT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(searchProductSuccess(response.data));
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

function* getProductCategory() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_PRODUCT_CATEGORY.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_PRODUCT_CATEGORY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getProductCategorySuccess(response.data));
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

function* getTrendingProduct() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_TRENDING_PRODUCT.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_TRENDING_PRODUCT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getTrendingProductSuccess(response.data));
        if (responseCallback) responseCallback(response.data);
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

function* editProduct() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_PRODUCT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_PRODUCT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(editProductSuccess(response.data));
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

function* editCategory() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_CATEGORY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_CATEGORY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(editCategorySuccess(response.data));
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

function* deleteProduct() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_PRODUCT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_PRODUCT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteProductSuccess(payload));
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

function* deleteCategory() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_CATEGORY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_CATEGORY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteCateogrySuccess(payload));
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

function* storeCatalog() {
  while (true) {
    const {payload, responseCallback} = yield take(STORE_CATALOG.REQUEST);
    try {
      const response = yield call(
        callRequest,
        STORE_CATALOG_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(storeCatalogSuccess(response.data));
        if (responseCallback) responseCallback(response.data);
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
  yield fork(getProducts);
  yield fork(addProductCategory);
  yield fork(addProduct);
  yield fork(searchProduct);
  yield fork(getProductCategory);
  yield fork(getTrendingProduct);
  yield fork(editProduct);
  yield fork(deleteProduct);
  yield fork(deleteCategory);
  yield fork(editCategory);
  yield fork(storeCatalog);
}
