import _ from 'lodash';
import {LATEST_ORDER_STATUS} from '../constants';

export const filterOrder = (data, status) => {
  let filterData = [];

  if (_.isArray(status)) {
    filterData = data.filter((item) => {
      return status.includes(item.status);
    });
  } else {
    filterData = data.filter((item) => {
      return item.status === status;
    });
  }
  return filterData;
};

export const filterAssignProposal = (data, status) => {
  let filterData = [];
  let options = [
    LATEST_ORDER_STATUS.ASSIGNED,
    LATEST_ORDER_STATUS.ASSIGNED_ONLINE,
    LATEST_ORDER_STATUS.ASSIGNED_OFFLINE,
    LATEST_ORDER_STATUS.ASSIGNED_WASPHA,
  ];

  filterData = data.filter((item) => {
    return options.includes(item.status);
  });

  return filterData;
};
