import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  API,
  requestGet,
  requestPatch,
  requestPost,
  requestPostUrlEncoded,
} from '../../api';
import {CONSTANTS} from '../../constants/theme';
import utills from '../../utills';
import {saveIsLoading} from './auth';
const initialState = {
  profileData: null,
};

export const EditeProfile = createAsyncThunk('profile', async (data, thunk) => {
  try {
    thunk.dispatch(saveIsLoading(true));
    let extraHeaders = {
      'Content-Type': 'multipart/form-data',
    };
    const response = await requestPatch(`profile`, data, false, extraHeaders);
    thunk.dispatch(saveIsLoading(false));
    return response;
  } catch (error) {
    console.log('EditeProfile error', error);
    thunk.dispatch(saveIsLoading(false));
    // utills.errorAlert('', error.response.data.message);
    throw error;
  }
});
export const getProfile = createAsyncThunk('/profile', async (id, thunk) => {
  try {
    thunk.dispatch(saveIsLoading(true));

    const response = await requestGet(`profile?id=${id}`);
    thunk.dispatch(saveProfileData(response.data.PrfileData));
    thunk.dispatch(saveIsLoading(false));
    return response;
  } catch (error) {
    console.log('getOrder error', error);
    thunk.dispatch(saveIsLoading(false));
    utills.errorAlert('', error.response.data.message);
    throw error;
  }
});
const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});
export const {saveProfileData} = profile.actions;
export default profile.reducer;
