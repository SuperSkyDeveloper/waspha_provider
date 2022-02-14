import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {Images, Colors} from '../theme';
import {strings} from '../constants';
import {
  CREATE_PROSPAL,
  UPDATE_PROSPAL,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  proposalDetail: [
    {
      id: 0,
      orderCode: '1234567',
      orderDate: '2013-03-10T02:00:00Z',
      orderDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      type: 'Delivery',
      typeId: 0,
      details: {
        expiryDate: '2013-03-10T02:00:00Z',
        expiryTime: '2013-03-10T02:00:00Z',
        deliveryLocation: 'xyz adress, flat no abc',
        orderCode: '1234567',
        deliveryModes: [
          {
            id: 0,
            title: strings.WASPHA,
            subTitle: strings.EXPRESS,
            bgColor: Colors.deliveryMode.waspha,
            icon: Images.deliveryBikeIcon,
            action: () => {},
          },
        ],
        deliveryVehicles: [
          {
            id: 1,
            title: strings.BIKE,
            bgColor: Colors.deliveryMode.online,
            icon: Images.BikeIcon2,
            action: () => {},
          },
        ],
        itemsList: [
          {
            id: 1,
            name: 'Nail Polish',
            image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
            price: 'ESP 100',
            quantity: 3,
            remarks: 'Lorem ipsum dolor sit ',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
          },
          {
            id: 2,
            name: 'Nail Polish 01',
            image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
            price: 'ESP 100',
            quantity: 3,
            remarks: 'Lorem ipsum dolor sit ',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
          },
        ],
        estimatedPrice: 100,
      },
    },
    {
      id: 1,
      orderCode: '1234567',
      orderDate: '2013-03-10T02:00:00Z',
      orderDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      type: 'Pick Up',
      typeId: 1,
      details: {
        expiryDate: '2013-03-10T02:00:00Z',
        expiryTime: '2013-03-10T02:00:00Z',
        deliveryLocation: 'xyz adress, flat no abc',
        orderCode: '1234567',
        itemsList: [
          {
            id: 1,
            name: 'Nail Polish',
            image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
            price: 'ESP 100',
            quantity: 3,
            remarks: 'Lorem ipsum dolor sit ',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
          },
          {
            id: 2,
            name: 'Nail Polish 01',
            image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
            price: 'ESP 100',
            quantity: 3,
            remarks: 'Lorem ipsum dolor sit ',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
          },
        ],
        estimatedPrice: 100,
      },
    },
    {
      id: 2,
      orderCode: '1234567',
      orderDate: '2013-03-10T02:00:00Z',
      orderDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      type: 'Pick Up',
      typeId: 1,
      details: {
        expiryDate: '2013-03-10T02:00:00Z',
        expiryTime: '2013-03-10T02:00:00Z',
        deliveryLocation: 'xyz adress, flat no abc',
        orderCode: '1234567',
        itemsList: [
          {
            id: 1,
            name: 'Free/Promotional Item',
            image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
            price: 'ESP 110',
            quantity: 3,
            remarks: 'Lorem ipsum dolor sit ',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
          },
        ],
        estimatedPrice: 120,
      },
    },
  ],
  proposalPrice: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROSPAL.SUCCESS: {
      return Immutable.merge(state, {proposalPrice: action.data});
    }
    case UPDATE_PROSPAL.SUCCESS: {
      return Immutable.merge(state, {proposalPrice: action.data});
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
