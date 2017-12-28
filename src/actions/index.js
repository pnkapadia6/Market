import  _ from 'lodash';

export const BUY_KITTEN = 'BUY_KITTEN';
export const SELL_KITTEN = 'SELL_KITTEN';

export const buyKitten = kittenId => ({
  type: BUY_KITTEN,
  payload: {
    kittenId
  }
});

export const sellKitten = kitten => ({
  type: SELL_KITTEN,
  payload: kitten
});
