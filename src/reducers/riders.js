import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {GET_RIDERS} from '../actions/ActionTypes';
import {Images} from '../theme';
import {USER_SIGNOUT} from '../actions/ActionTypes';

const initialState = Immutable({
  riders: [
    {
      id: 1,
      name: 'Rider ABC',
      contactNo: '+20 123566666',
      vehicleImage: Images.MapCarIcon,
      location: {lat: 24.938028, lng: 67.117},
      type: 'online',
    },
    {
      id: 2,
      name: 'Rider ABCD',
      contactNo: '+20 123566666',
      vehicleImage: Images.MapCarIcon,
      location: {lat: 24.938028, lng: 67.117},
      type: 'online',
    },
    {
      id: 3,
      name: 'Rider ABCDEF',
      contactNo: '+20 123566666',
      vehicleImage: Images.MapCarIcon,
      location: {lat: 24.938028, lng: 67.117},
      type: 'online',
    },
    {
      id: 4,
      name: 'Rider DEF',
      contactNo: '+20 123566666',
      vehicleImage: Images.MapCarIcon,
      location: {
        lat: 24.98028,
        lng: 67.136917,
      },
      type: 'offline',
    },
    {
      id: 5,
      name: 'Rider GHI',
      contactNo: '+20 123566666',
      vehicleImage: Images.MapCarIcon,
      location: {
        lat: 24.938028,
        lng: 67.16917,
      },
      type: 'offline',
    },
    {
      id: 6,
      name: 'Rider GHIJ',
      contactNo: '+20 123566666',
      vehicleImage: Images.MapCarIcon,
      location: {
        lat: 24.938028,
        lng: 67.16917,
      },
      type: 'offline',
    },
    {
      id: 7,
      name: 'Rider GHIJKL',
      contactNo: '+20 123566666',
      vehicleImage: Images.MapCarIcon,
      location: {
        lat: 24.938028,
        lng: 67.16917,
      },
      type: 'offline',
    },
  ],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RIDERS.SUCCESS: {
      return Immutable.merge(state, {
        riders: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
