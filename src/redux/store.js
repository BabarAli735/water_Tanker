import {configureStore, createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import auth from './slice/auth';
import user_home from './slice/user_home';
import order from './slice/order';
import profile from './slice/profile';

const reducer = {
  authReducer: auth,
  user_homeReducer: user_home,
  orderReducer: order,
  profileReducer: profile,
};

export default configureStore({
  reducer: reducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});
