import moment, {duration} from 'moment';
import _ from 'lodash';
import {
  TIME_FORMAT2,
  DATE_FORMAT2,
  DATE_TIME,
  TIME_FORMAT1,
} from '../constants';

/**
 *
 * @param {String} DateTime ISO String to be converted
 * @param {String} format Expected Format
 */
const ISOToFormat = (DateTime, format) => {
  if (!_.isNil(DateTime)) {
    if (moment(DateTime).format(format) === 'Invalid date') {
      return null;
    } else {
      return moment(DateTime).format(format);
    }
  }
};

/**
 *
 * @param {String} DateTime Formatted time
 * @param {String} format Format of given time
 */
const toISOString = (DateTime, format) => {
  return moment(DateTime, format).toISOString();
};

// setTime = (value) => {
//   let time = ISOToFormat(value, TIME_FORMAT1);
//   let date = ISOToFormat(this.state.dateTime, DATE_FORMAT2);

//   let dateTime = `${date} ${time}`;

//   toISOString(dateTime, 'YYYY:MM:DD HH:MM:AA');
// };

const setDateTime = (time, date) => {
  let finalTime = ISOToFormat(time, TIME_FORMAT1);
  let finalDate = ISOToFormat(date, DATE_FORMAT2);
  let finalDateTime = `${finalDate} ${finalTime}`;
  return toISOString(finalDateTime, DATE_TIME);
};

const TimeFromNow = (data) => {
  return moment(data).fromNow();
};

const GetCurrentTimeInISO = () => {
  return moment().toISOString();
};

const getTimeDifference = (from, to = moment()) => {
  from = moment(from);
  return from.diff(to, 'minutes');
};

const getRidersList = (list, type) => {
  let filteredList = [];
  list.map((item) => {
    if (item.type === type) {
      filteredList.push(item);
    }
  });
  return filteredList;
};
const getTrendingProducts = (items) => {
  const trendingProducts = items.filter((item) => {
    return item.isTrending;
  });
  return trendingProducts;
};

const getRootCategories = (items) => {
  let rootCategories = [];

  rootCategories = items.filter((item) => {
    return item.parent_id === null;
  });

  return rootCategories;
};

// todo dublicate getSubCategories
const getSubCategory = (allCategories, parentId) => {
  let subCategories = [];
  subCategories = allCategories.filter((category) => {
    return category.parent_id === parentId;
  });
  return subCategories;
};

const getSubCategories = (allCategories, parentId) => {
  let subCategories = [];

  subCategories = allCategories.filter((category) => {
    return category.parent_id === parentId;
  });

  return subCategories;
};

const getFilteredProducts = (products, parentCategoryId) => {
  let filteredProducts = [];

  products.map((product) => {
    if (product.category_id === parentCategoryId) {
      filteredProducts.push(product);
    }
  });

  return filteredProducts;
};

//

/**
 *
 * @param {Array} categoryList all category list
 *
 */
// handle all main category from array
const filterMainCategory = (categoryList) => {
  let categories = [];

  categories = categoryList.filter((item) => {
    return item.parent_id === null;
  });
  return categories;
};

// handle all sub category from array
const subCategoriesList = (arr) => {
  let subCategories = [];
  subCategories = arr.filter((item, index) => {
    return item.parent_id;
  });
  return subCategories;
};

/**
 *
 * @param {Array} categoryList all category list
 * @param {Number} parentId parentId
 *
 */

const filterSubCategory = (categoryList, parentId) => {
  let subCategories;

  subCategories = categoryList.filter((item) => {
    return item.parent_id === parentId;
  });

  return subCategories;
};

/**
 *
 * @param {Array} List list
 * @param {Number} id id
 *
 */

const filterList = (list, id) => {
  let temp;
  temp = list.find((item) => {
    return item.id === id;
  });
  return temp;
};

// const findVehicle = (list, name) => {
//   let temp;

//   temp = list.find((item) => {
//     return item.display_name === name;
//   });

//   console.log({namess: name});

//   return temp;
// };

// here set id in array
const filterSelectedCategory = (arr, key) => {
  let selectedId = [];

  arr &&
    arr.map((item, index) => {
      item[key].map((elm) => {
        if (elm.isSelected) {
          selectedId.push(elm.id);
        }
      });
    });
  return selectedId;
};

const checkOrderType = (orderType, type) => {
  if (orderType === type) {
    return true;
  }
  return false;
};

// combine proposal item and revise proposal items
const manageReviseItem = (data) => {
  let finalData = [];
  data.items.map((item, index) => {
    finalData.push({...item, ..._.find(data.revised_items, {id: item.id})});
  });

  return finalData;
};

// i have two arr item and revised_items, need revised_item's quantity and quantity
const manageReviseItemQuantity = (data) => {
  let temp = _.cloneDeep(data);
  console.log({
    datadata: data,
  });
  let finalData = [];
  temp.items.map((item, index) => {
    let revisedIndex = _.findIndex(temp.revised_items, {id: item.id});
    if (
      temp.revised_items[revisedIndex] &&
      temp.revised_items[revisedIndex].revised_quantity
    ) {
      item.quantity = temp.revised_items[revisedIndex].revised_quantity;
    }
    finalData.push(item);
  });

  return finalData;
};

const findAssignStatus = (key) => {
  switch (key) {
    case 'assigned_online':
      return 'Online Rider';
    case 'assigned_waspha':
      return 'Waspha Rider';
    case 'assigned_offline':
      return 'Offline Rider';
    default:
      return false;
      break;
  }
};

const filterUncategorizeProduct = (data) => {
  return data.filter((item) => {
    return item.category_id === null;
  });
};

const getTimeShortForm = (data) => {
  if (_.toLower(data) === 'minute') {
    return 'MM';
  }
  if (_.toLower(data) === 'hour') {
    return 'HH';
  }

  if (_.toLower(data) === 'day') {
    return 'DD';
  }
};

const setTimer = (date) => {
  // Coundown timer for a given expiry date-time
  // You can set your own date-time
  let expirydate = date;

  let diffr = moment.duration(moment(expirydate).diff(moment()));
  // Difference of the expiry date-time
  let hours = parseInt(diffr.asHours());
  let minutes = parseInt(diffr.minutes());
  let seconds = parseInt(diffr.seconds());

  // Converting in seconds
  let totalSecond = hours * 60 * 60 + minutes * 60 + seconds;

  // Settign up the duration of countdown

  return totalSecond;
};

export {
  setTimer,
  filterUncategorizeProduct,
  findAssignStatus,
  manageReviseItem,
  toISOString,
  ISOToFormat,
  getTimeDifference,
  GetCurrentTimeInISO,
  TimeFromNow,
  getTrendingProducts,
  getRootCategories,
  setDateTime,
  getSubCategories,
  getFilteredProducts,
  getRidersList,
  filterSubCategory,
  filterMainCategory,
  filterList,
  getSubCategory,
  filterSelectedCategory,
  checkOrderType,
  manageReviseItemQuantity,
  subCategoriesList,
  getTimeShortForm,
};
