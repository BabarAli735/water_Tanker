import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API, requestGet, requestPost, requestPostUrlEncoded} from '../../api';
import {CONSTANTS} from '../../constants/theme';
import utills from '../../utills';
import { saveIsLoading } from './auth';
const initialState = {
  DriversData: null,
};

export const getAllDriversSlice = createAsyncThunk(
  '/register',
  async (data, thunk) => {
    try {
      thunk.dispatch(saveIsLoading(true));
      const response = await requestGet(`user/getAllDrivers`);
      thunk.dispatch(saveAllDrivers(response.data.users));
      thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('getAllDriversSlice error', error);
      thunk.dispatch(saveIsLoading(false));
      utills.errorAlert('', error.response.data.message);
      throw error;
    }
  },
);

const user_home = createSlice({
  name: 'user_home',
  initialState,
  reducers: {
    saveAllDrivers: (state, action) => {
      state.DriversData = action.payload;
    },
  },
});
export const {saveAllDrivers} = user_home.actions;
export default user_home.reducer;
