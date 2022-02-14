import {
  GET_ORDER_LIST,
  CREATE_PROSPAL,
  GET_ORDER_DETAIL,
  CONFIRM_PROPOSAL,
  CREATE_PROPOSAL_INTERNAL,
  CREATE_PROPOSAL_INTERNAL_ITEMS,
  REJECT_ORDER,
  CHANGE_PROPOSAL_STATUS,
  CREATE_PROPOSAL_INTERNAL_REMOVE_ITEM,
  CREATE_PROPOSAL_INTERNAL_ADD_NEW_ITEMS,
  CREATE_PROPOSAL_INTERNAL_ADD_NEW_PROPOSAL,
  UPDATE_PROSPAL,
  IS_ORDER_RATED,
} from './ActionTypes';

export function getOrderListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ORDER_LIST.REQUEST,
  };
}

export function getOrderListSuccess(data) {
  return {
    data,
    type: GET_ORDER_LIST.SUCCESS,
  };
}

export function getOrderDetailRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ORDER_DETAIL.REQUEST,
  };
}

export function getOrderDetailSuccess(data) {
  return {
    data,
    type: GET_ORDER_DETAIL.SUCCESS,
  };
}

export function rejectOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REJECT_ORDER.REQUEST,
  };
}

export function rejectOrderSuccess(data) {
  return {
    data,
    type: REJECT_ORDER.SUCCESS,
  };
}

export function createProposalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_PROSPAL.REQUEST,
  };
}

export function createProposalSuccess(data) {
  return {
    data,
    type: CREATE_PROSPAL.SUCCESS,
  };
}
export function confirmProposalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONFIRM_PROPOSAL.REQUEST,
  };
}

export function confirmProposalSuccess(data) {
  return {
    data,
    type: CONFIRM_PROPOSAL.SUCCESS,
  };
}

export function createProposalInternal(data) {
  return {
    data,
    type: CREATE_PROPOSAL_INTERNAL,
  };
}

export function createProposalInternalItems(data) {
  return {
    data,
    type: CREATE_PROPOSAL_INTERNAL_ITEMS,
  };
}

export function createProposalInternalAddNewItems(data) {
  return {
    data,
    type: CREATE_PROPOSAL_INTERNAL_ADD_NEW_ITEMS,
  };
}

export function createProposalInternalAddNewProposal(data) {
  return {
    data,
    type: CREATE_PROPOSAL_INTERNAL_ADD_NEW_PROPOSAL,
  };
}

export function createProposalInternalRemoveItem(data) {
  return {
    data,
    type: CREATE_PROPOSAL_INTERNAL_REMOVE_ITEM,
  };
}

export function changeProposalStatusRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PROPOSAL_STATUS.REQUEST,
  };
}
export function changeProposalStatusSuccess(data) {
  return {
    data,
    type: CHANGE_PROPOSAL_STATUS.SUCCESS,
  };
}

export function updateProposalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_PROSPAL.REQUEST,
  };
}

export function updateProposalSuccess(data) {
  return {
    data,
    type: UPDATE_PROSPAL.SUCCESS,
  };
}

export function isOrderRatedRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: IS_ORDER_RATED.REQUEST,
  };
}

export function isOrderRatedSuccess(data) {
  return {
    data,
    type: IS_ORDER_RATED.SUCCESS,
  };
}
