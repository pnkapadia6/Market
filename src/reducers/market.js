import update from 'immutability-helper';
import _findIndex from 'lodash/findIndex';
import _uniqueId from 'lodash/uniqueId';

import { BUY_KITTEN, SELL_KITTEN } from '../actions';

const initialState = {
  kittens: [{
    id: _uniqueId(),
    age: '10',
    price: '2000',
    imageUrl: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
    isSold: false,
  }, {
    id: _uniqueId(),
    age: '13',
    price: '2500',
    imageUrl: 'http://i.telegraph.co.uk/multimedia/archive/02830/cat_2830677b.jpg',
    isSold: false,
  }, {
    id: _uniqueId(),
    age: '15',
    price: '3000',
    imageUrl: 'https://i2.wp.com/best1x.com/wp-content/uploads/2016/10/Pictures-of-newborn-kittens-8.jpg?resize=564%2C372',
    isSold: false,
  }]
};

const marketReducer = (state = initialState, action) => {
  switch(action.type) {
    case BUY_KITTEN:
      const kittenIndex = _findIndex(state.kittens, { id: action.payload.kittenId });
      return update(state, {
        kittens: {
          $merge: {
            [kittenIndex]: {
              $merge: {
                isSold: true
              }
            }
          }
        }
      });

    case SELL_KITTEN:
      return update(state, {
        kittens: {
          $push: [{
            ...action.payload,
            id: _uniqueId(),
            isSold: false,
          }]
        }
      });

    default:
      return state;
  }
};

export default marketReducer;
