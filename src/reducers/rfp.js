import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  CONFIRM_PROPOSAL,
  CREATE_PROPOSAL_INTERNAL,
  CREATE_PROPOSAL_INTERNAL_ADD_NEW_ITEMS,
  CREATE_PROPOSAL_INTERNAL_ADD_NEW_PROPOSAL,
  CREATE_PROPOSAL_INTERNAL_ITEMS,
  CREATE_PROPOSAL_INTERNAL_REMOVE_ITEM,
  GET_ORDER_DETAIL,
  GET_ORDER_LIST,
  REJECT_ORDER,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {Images, Colors} from '../theme';
import {strings} from '../constants';

const initialState = Immutable({
  rfpListing: [],
  rfpDetail: {},
  createProposal: {
    items: [],
  },

  orders_old: [
    {
      id: 1,
      orderCode: 34435,
      deliveryTime: '2013-03-10T02:00:00Z',
      cancelOrderDetails: {
        reasons: [
          {
            id: 0,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 1,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 2,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
        ],
        otherReason:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      },
      itemsList: [
        {
          id: 1,
          name: 'Happy Bone 1',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
        {
          id: 2,
          name: 'Happy Bone 2',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
        {
          id: 3,
          name: 'Happy Bone 3',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
      ],
      content:
        'sdfsdklfjsdkf sdfsdjk fsd fhjsd fjsdfsdh fjsdfuhsif89wsifu hfnjsdhfjsd hfjsd hfjs fdjshf udshfsdjknfns fd f f f',
      promoCode: true,
    },
    {
      id: 2,
      orderCode: 64555,
      deliveryTime: '2013-03-10T02:00:00Z',
      cancelOrderDetails: {
        reasons: [
          {
            id: 0,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 1,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 2,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
        ],
        otherReason:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      },

      itemsList: [
        {
          id: 1,
          name: 'Happy Bone 1',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
        {
          id: 2,
          name: 'Happy Bone 2',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
        {
          id: 3,
          name: 'Happy Bone 3',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
      ],
      content:
        'sdfsdklfjsdkf sdfsdjk fsd fhjsd fjsdfsdh fjsdfuhsif89wsifu hfnjsdhfjsd hfjsd hfjs fdjshf udshfsdjknfns fd f f f',
      promoCode: false,
    },
    {
      id: 3,
      orderCode: 23453,
      deliveryTime: '2013-03-10T02:00:00Z',
      cancelOrderDetails: {
        reasons: [
          {
            id: 0,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 1,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 2,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
        ],
        otherReason:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      },
      itemsList: [
        {
          id: 1,
          name: 'Happy Bone 1',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
        {
          id: 2,
          name: 'Happy Bone 2',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
        {
          id: 3,
          name: 'Happy Bone 3',
          description: 'lorem ipsum lorem ipsum',
          image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
        },
      ],
      content:
        'sdfsdklfjsdkf sdfsdjk fsd fhjsd fjsdfsdh fjsdfuhsif89wsifu hfnjsdhfjsd hfjsd hfjs fdjshf udshfsdjknfns fd f f f',
      promoCode: true,
    },
    {
      id: 4,
      orderCode: 45345,
      deliveryTime: '2013-03-10T02:00:00Z',

      cancelOrderDetails: {
        reasons: [
          {
            id: 0,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 1,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 2,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
        ],
        otherReason:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      },

      content:
        'sdfsdklfjsdkf sdfsdjk fsd fhjsd fjsdfsdh fjsdfuhsif89wsifu hfnjsdhfjsd hfjsd hfjs fdjshf udshfsdjknfns fd f f f',
      promoCode: false,
    },
    {
      id: 5,
      orderCode: 58345,
      deliveryTime: '2013-03-10T02:00:00Z',

      cancelOrderDetails: {
        reasons: [
          {
            id: 0,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 1,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
          {
            id: 2,
            reason:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          },
        ],
        otherReason:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      },

      content:
        'sdfsdklfjsdkf sdfsdjk fsd fhjsd fjsdfsdh fjsdfuhsif89wsifu hfnjsdhfjsd hfjsd hfjs fdjshf udshfsdjknfns fd f f f',
      promoCode: false,
    },
  ],

  acceptedOrders: [
    {
      id: 0,
      username: 'User XYZ 7',
      userImage: '',
      status: 'accepted',
      orderDesc:
        'ListeningStateChangedEvent,zmx czxc zc xzc xzucjdsjczxj cxzm cxz',
      orderCode: '12321',
      orderDate: '2010-04-02T14:12:07',
      isPicked: false,
      orderDetails: {
        deliveryLocation: 'Karachi,Pakistan',
        landMark: 'near India',
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
        ],
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
      },
      riderDetails: {
        name: 'Rider ABC',
        image: '',
      },
    },
    {
      id: 1,
      username: 'User XYZ 8',
      userImage: '',
      status: 'accepted',
      orderDesc:
        'ListeningStateChangedEvent,zmx czxc zc xzc xzucjdsjczxj cxzm cxz',
      orderCode: '12321',
      orderDate: '2010-04-02T14:12:07',
      isPicked: false,
      orderDetails: {
        deliveryLocation: 'Karachi,Pakistan',
        landMark: 'near India',
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
        ],
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
      },
      riderDetails: {
        name: 'Rider ABC',
        image: '',
      },
    },
    {
      id: 2,
      username: 'User XYZ 9',
      userImage: '',
      status: 'accepted',
      orderDesc:
        'ListeningStateChangedEvent,zmx czxc zc xzc xzucjdsjczxj cxzm cxz',
      orderCode: '12321',
      orderDate: '2010-04-02T14:12:07',
      isPicked: false,
      orderDetails: {
        deliveryLocation: 'Karachi,Pakistan',
        landMark: 'near India',
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
        ],
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
      },
      riderDetails: {
        name: 'Rider ABC',
        image: '',
      },
    },
    {
      id: 3,
      username: 'User XYZ 10',
      userImage: '',
      status: 'accepted',
      orderDesc:
        'ListeningStateChangedEvent,zmx czxc zc xzc xzucjdsjczxj cxzm cxz',
      orderCode: '12321',
      orderDate: '2010-04-02T14:12:07',
      isPicked: false,
      orderDetails: {
        deliveryLocation: 'Karachi,Pakistan',
        landMark: 'near India',
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
        ],
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
      },
      riderDetails: {
        name: 'Rider ABC',
        image: '',
      },
    },
    {
      id: 4,
      username: 'User XYZ 11',
      userImage: '',
      status: 'accepted',
      orderDesc:
        'ListeningStateChangedEvent,zmx czxc zc xzc xzucjdsjczxj cxzm cxz',
      orderCode: '12321',
      orderDate: '2010-04-02T14:12:07',
      isPicked: false,
      orderDetails: {
        deliveryLocation: 'Karachi,Pakistan',
        landMark: 'near India',
        itemsList: [
          {
            id: 1,
            name: 'Nail Polish',
            image: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
            price: 'ESP 100',
            quantity: 3,
            remarks: 'Lorem ipsum dolor sit',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
          },
        ],
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
      },
      riderDetails: {
        name: 'Rider ABC',
        image: '',
      },
    },
  ],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_LIST.SUCCESS: {
      return Immutable.merge(state, {
        rfpListing: action.data,
      });
    }
    case GET_ORDER_DETAIL.SUCCESS: {
      return Immutable.merge(state, {
        rfpDetail: action.data,
      });
    }

    case CREATE_PROPOSAL_INTERNAL_ITEMS: {
      const {index, key, value} = action.data;
      let temp = _.cloneDeep(state.createProposal);
      temp.items[index][key] = value;

      return Immutable.merge(state, {
        createProposal: temp,
      });
    }
    case CREATE_PROPOSAL_INTERNAL_ADD_NEW_ITEMS: {
      let temp = _.cloneDeep(state.createProposal);
      temp.items = [...temp.items, action.data];
      return Immutable.merge(state, {
        createProposal: temp,
      });
    }
    case CREATE_PROPOSAL_INTERNAL_ADD_NEW_PROPOSAL: {
      let temp = {
        items: action.data,
      };

      return Immutable.merge(state, {
        createProposal: temp,
      });
    }
    case CREATE_PROPOSAL_INTERNAL: {
      let temp = _.cloneDeep(state.createProposal);
      let latestData = {...temp, ...action.data};
      return Immutable.merge(state, {
        createProposal: latestData,
      });
    }
    case CREATE_PROPOSAL_INTERNAL_REMOVE_ITEM: {
      let temp = _.cloneDeep(state.createProposal);

      temp.items.splice(action.data, 1);
      return Immutable.merge(state, {
        createProposal: temp,
      });
    }

    case REJECT_ORDER.SUCCESS: {
      let temp = _.cloneDeep(state.rfpListing);
      const findIndex = _.findIndex(temp, {
        id: action.data.rfp_id,
      });

      temp.splice(findIndex, 1);

      return Immutable.merge(state, {
        rfpListing: temp,
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
