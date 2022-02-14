import _ from 'lodash';
import util from '../util';

const renderNameStringAndImageRender = (item) => {
  if (!_.isObject(item)) {
    return item;
  }

  return util.isRTL() && !_.isNil(item.ar) && !_.isEmpty(item.ar)
    ? item.ar
    : !_.isNil(item.en) && !_.isEmpty(item.en)
    ? item.en
    : item.ar;
};

const arabicEnglishCategoryText = (item, fromArabicForm) => {
  if (!_.isObject(item)) {
    return item;
  }

  return fromArabicForm && !_.isNil(item.ar) && !_.isEmpty(item.ar)
    ? item.ar
    : !_.isNil(item.en) && !_.isEmpty(item.en)
    ? item.en
    : item.ar;
};

export {renderNameStringAndImageRender, arabicEnglishCategoryText};
