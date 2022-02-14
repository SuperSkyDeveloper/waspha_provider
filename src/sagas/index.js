import {fork} from 'redux-saga/effects';
import user from './user';
import init from './init';
import orders from './orders';
import products from './products';
import categories from './categories';
import business from './business';
import general from './general';
import vendorStore from './vendorStore';
import proposal from './proposal';
import driver from './driver';
import rating from './rating';
import chat from './chat';
import promoCodes from './promoCodes';

export default function* root() {
  yield fork(user);
  yield fork(init);
  yield fork(orders);
  yield fork(products);
  yield fork(categories);
  yield fork(general);
  yield fork(business);
  yield fork(vendorStore);
  yield fork(proposal);
  yield fork(driver);
  yield fork(rating);
  yield fork(chat);
  yield fork(promoCodes);
}
