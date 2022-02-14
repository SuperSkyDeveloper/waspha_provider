// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {GET_PROMO_CODES} from '../actions/ActionTypes';
import {setTimer} from '../helpers/generalHelper';
import moment from 'moment';

const initialState = Immutable({
  promos: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROMO_CODES.SUCCESS: {
      let filteredData = [];
      if (_.isEmpty(state.promos)) {
        filteredData = getData(action.data);
      } else {
        let incomingData = [];

        incomingData = _.filter(action.data, (item) => {
          let index = _.findIndex(state.promos, {id: item.id});
          if (index < 0 && moment().isSameOrBefore(moment(item.end_time))) {
            return item;
          }
        });

        if (!_.isEmpty(incomingData)) {
          filteredData = getData(incomingData);
        }
      }

      return Immutable.merge(state, {
        promos: [...state.promos, ...filteredData],
      });
    }

    default:
      return state;
  }
};

function getData(data) {
  let temp = _.cloneDeep(data);

  let itemsAfterTimer = temp.map(({end_time, ...rest}) => ({
    end_time: setTimer(end_time),
    ...rest,
  }));
  return itemsAfterTimer;
}
