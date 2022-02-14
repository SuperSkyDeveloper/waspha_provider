import {
  ADD_PRODUCT,
  ADD_PRODUCT_CATEGORY,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_CATEGORY,
  GET_TRENDING_PRODUCT,
  SEARCH_PRODUCT,
  EDIT_CATEGORY,
  STORE_CATALOG,
} from './ActionTypes';

export function getProductsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PRODUCTS.REQUEST,
  };
}

export function getProductsSuccess(data) {
  return {
    data,
    type: GET_PRODUCTS.SUCCESS,
  };
}

export function addProductCategoryRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_PRODUCT_CATEGORY.REQUEST,
  };
}

export function addProductCategorySuccess(data) {
  return {
    data,
    type: ADD_PRODUCT_CATEGORY.SUCCESS,
  };
}

export function addProductRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_PRODUCT.REQUEST,
  };
}

export function addProductSuccess(data) {
  return {
    data,
    type: ADD_PRODUCT.SUCCESS,
  };
}

export function searchProductRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SEARCH_PRODUCT.REQUEST,
  };
}

export function searchProductSuccess(data) {
  return {
    data,
    type: SEARCH_PRODUCT.SUCCESS,
  };
}

export function getProductCategoryRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PRODUCT_CATEGORY.REQUEST,
  };
}

export function getProductCategorySuccess(data) {
  return {
    data,
    type: GET_PRODUCT_CATEGORY.SUCCESS,
  };
}

export function getTrendingProductRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_TRENDING_PRODUCT.REQUEST,
  };
}

export function getTrendingProductSuccess(data) {
  return {
    data,
    type: GET_TRENDING_PRODUCT.SUCCESS,
  };
}

export function editProductRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_PRODUCT.REQUEST,
  };
}

export function editProductSuccess(data) {
  return {
    data,
    type: EDIT_PRODUCT.SUCCESS,
  };
}

export function editCategoryRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_CATEGORY.REQUEST,
  };
}

export function editCategorySuccess(data) {
  return {
    data,
    type: EDIT_CATEGORY.SUCCESS,
  };
}

export function deleteProductRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_PRODUCT.REQUEST,
  };
}

export function deleteProductSuccess(data) {
  return {
    data,
    type: DELETE_PRODUCT.SUCCESS,
  };
}

export function deleteCateogryRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_CATEGORY.REQUEST,
  };
}

export function deleteCateogrySuccess(data) {
  return {
    data,
    type: DELETE_CATEGORY.SUCCESS,
  };
}

export function storeCatalogRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: STORE_CATALOG.REQUEST,
  };
}

export function storeCatalogSuccess(data) {
  return {
    data,
    type: STORE_CATALOG.SUCCESS,
  };
}
