import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API, requestGet, requestPatch, requestPost, requestPostUrlEncoded} from '../../api';
import {CONSTANTS} from '../../constants/theme';
import utills from '../../utills';
import { saveIsLoading } from './auth';
const initialState = {
  orderData: null,
  myOrder:[]
}

export const SaveOrder = createAsyncThunk('order', async (data, thunk) => {
    try {
   
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPost(
        `order`,
        data,
        true,
      );
      thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('SaveOrder error', error);
      thunk.dispatch(saveIsLoading(false));
      // utills.errorAlert('', error.response.data.message);
      throw error;
    }
  });
export const SavePureWaterOrder = createAsyncThunk('purewaterorder', async (data, thunk) => {
    try {
   
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPost(
        `order/PureWaterOrder`,
        data,
        true,
      );
      thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('SavePureWaterOrder error', error);
      thunk.dispatch(saveIsLoading(false));
      // utills.errorAlert('', error.response.data.message);
      throw error;
    }
  });
export const ChangeOrderStatus = createAsyncThunk('order', async (data, thunk) => {

  try {
   
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPatch(
        `order`,
        data,
        true,
      );
      thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('SaveOrder error', error);
      thunk.dispatch(saveIsLoading(false));
      // utills.errorAlert('', error.response.data.message);
      throw error;
    }
  });
  export const getOrder = createAsyncThunk(
    '/order',
    async (id, thunk) => {
      try {
        thunk.dispatch(saveIsLoading(true));
        const response = await requestGet(`order?id=${id}`);
        thunk.dispatch(saveOrderData(response.data));
        thunk.dispatch(saveIsLoading(false));
        return response;
      } catch (error) {
        console.log('getOrder error', error);
        thunk.dispatch(saveIsLoading(false));
        utills.errorAlert('', error.response.data.message);
        throw error;
      }
    },
  );
  export const getMyOrder = createAsyncThunk(
    '/order/MyOrder',
    async (data, thunk) => {
      try {
        console.log(data);
        thunk.dispatch(saveIsLoading(true));
        const response = await requestGet(`order/MyOrder?id=${data.id}&type=${data.type}`);
        thunk.dispatch(saveMyOrderData(response.data.OrderData));
        thunk.dispatch(saveIsLoading(false));
        return response;
      } catch (error) {
        console.log('getOrder error', error);
        thunk.dispatch(saveIsLoading(false));
        utills.errorAlert('', error.response.data.message);
        throw error;
      }
    },
  );
const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    saveMyOrderData: (state, action) => {
      state.myOrder = action.payload;
    },

  },
});
export const {saveOrderData,saveMyOrderData} = order.actions;
export default order.reducer;
