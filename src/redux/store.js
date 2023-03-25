import {configureStore, createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import auth from './slice/auth';

const reducer = {
  authReducer: auth,
};

export default configureStore({
  reducer: reducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
