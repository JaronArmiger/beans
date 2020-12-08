import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { codReducer } from './codReducer';
import { addressReducer } from './addressReducer';
import { cartIdReducer } from './cartIdReducer';
import { paymentStatusReducer } from './paymentStatusReducer';
import { paymentIdReducer } from './paymentIdReducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: codReducer,
  address: addressReducer,
  cartId: cartIdReducer,
  paymentStatus: paymentStatusReducer,
  paymentId: paymentIdReducer
});

export default rootReducer;