import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API, requestGet, requestPost, requestPostUrlEncoded} from '../../api';
import {CONSTANTS} from '../../constants/theme';
import utills from '../../utills';
import { saveIsLoading } from './auth';
const initialState = {
  orderData: null,
};

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

const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveAllDrivers: (state, action) => {
      state.DriversData = action.payload;
    },
  },
});
export const {saveAllDrivers} = order.actions;
export default order.reducer;
