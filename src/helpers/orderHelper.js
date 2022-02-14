import moment, {duration} from 'moment';
import _ from 'lodash';
import util from '../util';

/**
 *
 * @param {String} DateTime ISO String to be converted
 * @param {String} format Expected Format
 */

const arrangeProductData = (data) => {
  if (!_.isUndefined(data)) {
    let temp = [];

    temp = data.map((item, index) => {
      console.log({item});
      let payloadItem = {
        price: util.isValueEmpty(item.price, 0),
        quantity: util.isValueEmpty(item.quantity, 0),
        tax_ratio: util.isValueEmpty(item.tax, 0),
        remarks: util.isValueEmpty(item.remarks || item.remark, ''),

        remarks_image: util.isValueEmpty(
          item.remarksImgData && item.remarksImgData.image,
          '',
        ),
      };

      if (_.isNil(item.product_id)) {
        payloadItem['title'] = util.isValueEmpty(item.name, '');
        payloadItem['description'] = util.isValueEmpty(item.description, '');
        payloadItem['image'] = util.isValueEmpty(
          item.productImage ? item.productImage.image : item.image,
        );
      }
      if (!_.isNil(item.product_id)) {
        payloadItem['product_id'] = item.product_id;
      }

      if (!_.isNil(item.menu_promotion)) {
        payloadItem['menu_promotion'] = item.menu_promotion;
      }

      return payloadItem;
    });

    return temp;
  }
};

export {arrangeProductData};
