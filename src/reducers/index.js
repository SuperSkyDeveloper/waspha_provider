import {combineReducers} from 'redux';

import navigator from './navigator';
import user from './user';
import rfp from './rfp';
import earningDetail from './earningDetail';
import riders from './riders';
import proposalDetails from './proposalDetails';
import products from './products';
import categories from './categories';
import general from './general';
import vendorStore from './vendorStore';
import proposal from './proposal';
import driver from './driver';
import ratings from './ratings';
import promoCodes from './promoCodes';

export default combineReducers({
  route: navigator,
  user,
  earningDetail,
  rfp,
  riders,
  proposalDetails,
  products,
  categories,
  general,
  vendorStore,
  proposal,
  driver,
  ratings,
  promoCodes,
});
