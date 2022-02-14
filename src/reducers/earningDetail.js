// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {USER_SIGNOUT} from '../actions/ActionTypes';
import {strings} from '../constants';

const initialState = Immutable({
  earningDetail: [
    {
      title: 'Debit',
      description: strings.TOTAL_AMOUNT,
      amoutDetail: [
        {
          orderId: '#1234567',
          date: '23-06-2019',
          totalEarning: 'ESP 100',
          amountDebit: 'ESP 20',
        },
        {
          orderId: '#1234567',
          date: '23-06-2019',
          totalEarning: 'ESP 100',
          amountDebit: 'ESP 20',
        },
        {
          orderId: '#1234567',
          date: '23-06-2019',
          totalEarning: 'ESP 100',
          amountDebit: 'ESP 20',
        },
      ],
    },
    {
      title: strings.CREDIT,
      description: strings.TOTAL_AMOUNT,
      amoutDetail: [
        {
          orderId: '#1234567',
          date: '23-06-2019',
          totalEarning: 'ESP 100',
          amountDebit: 'ESP 20',
        },
        {
          orderId: '#1234567',
          date: '23-06-2019',
          totalEarning: 'ESP 100',
          amountDebit: 'ESP 20',
        },
        {
          orderId: '#1234567',
          date: '23-06-2019',
          totalEarning: 'ESP 100',
          amountDebit: 'ESP 20',
        },
      ],
    },
  ],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
