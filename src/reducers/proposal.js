import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  LASTEST_ORDER,
  ORDER_DETAIL,
  USER_SIGNOUT,
  CHANGE_PROPOSAL_STATUS,
  IS_ORDER_RATED,
  GET_ACTIVE_ORDERS,
  PLACE_TRAD_ORDER,
  SELECT_WASPHA_VEHICLE,
  GET_TRADITIONAL_ORDERS,
  GET_TRADITIONAL_ORDER_DETAILS,
  RIDER_FOUND,
  CANCEL_TRADITIONAL_ORDER,
  GET_WASPHA_VEHICLES,
  EXPRESS_RIDER_FOUND,
} from '../actions/ActionTypes';

const initialState = Immutable({
  allProposal: [],
  proposalDetail: {},
  orderRated: false,
  activeOrders: [],
  wasphaVehicles: [],
  wasphaRider: {},
  traditionalOrders: [],
  traditionalOrderDetails: {},
  isRiderFound: true,
  isExpressRiderFound: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LASTEST_ORDER.SUCCESS: {
      return Immutable.merge(state, {
        allProposal: action.data,
      });
    }
    case ORDER_DETAIL.SUCCESS: {
      return Immutable.merge(state, {
        proposalDetail: action.data,
      });
    }
    case CHANGE_PROPOSAL_STATUS.SUCCESS: {
      let temp = _.cloneDeep(state.proposalDetail);
      temp.status = action.data.status;
      return Immutable.merge(state, {
        proposalDetail: temp,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case IS_ORDER_RATED.SUCCESS: {
      return Immutable.merge(state, {
        orderRated: action.data,
      });
    }

    case GET_ACTIVE_ORDERS.SUCCESS: {
      return Immutable.merge(state, {
        activeOrders: action.data,
      });
    }

    case PLACE_TRAD_ORDER.SUCCESS: {
      return Immutable.merge(state, {
        traditionalOrderDetails: {id: action.data.order_id},
        wasphaVehicles: action.data.delivery_vehicles,
      });
    }

    case SELECT_WASPHA_VEHICLE.SUCCESS: {
      return Immutable.merge(state, {
        traditionalOrderDetails: action.data,
      });
    }

    case GET_TRADITIONAL_ORDERS.SUCCESS: {
      return Immutable.merge(state, {
        traditionalOrders: action.data,
      });
    }

    case GET_TRADITIONAL_ORDER_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        traditionalOrderDetails: action.data,
      });
    }

    case CANCEL_TRADITIONAL_ORDER.SUCCESS: {
      return Immutable.merge(state, {
        traditionalOrderDetails: {},
      });
    }

    case RIDER_FOUND: {
      return Immutable.merge(state, {
        isRiderFound: action.data,
      });
    }

    case EXPRESS_RIDER_FOUND: {
      return Immutable.merge(state, {
        isExpressRiderFound: action.data,
      });
    }

    case GET_WASPHA_VEHICLES.SUCCESS: {
      return Immutable.merge(state, {
        wasphaVehicles: action.data,
      });
    }

    default:
      return state;
  }
};
