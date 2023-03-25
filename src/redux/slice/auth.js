import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API, requestGet, requestPost, requestPostUrlEncoded} from '../../api';
import { CONSTANTS } from '../../constants/theme';
const initialState = {
  userData: null,
};

export const RegisterSlice = createAsyncThunk(
  '/register',
  async (data, thunk) => {
    try {
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPostUrlEncoded(`/register`, data);
    //   thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('RegisterSlice error', error);
    //   thunk.dispatch(saveIsLoading(false));
      utillsJs.errorAlert('',error.response.data.message)
      throw error;
    }
  },
);

export const LoginSlice = createAsyncThunk(
  '/login',
  async (data, thunk) => {
    try {
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPostUrlEncoded(`/login`, data);
      thunk.dispatch(saveUser(response));
    //   thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('loginSlice error', error);
    //   thunk.dispatch(saveIsLoading(false));
      utillsJs.errorAlert('',error.response.data.message)
      throw error;
    }
  },
);

export const ChangePasswordSlice = createAsyncThunk(
  '/user_change_password',
  async (data, thunk) => {
    try {
     
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPostUrlEncoded(`/user_change_password`, data);
    //   thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('ChangePasswordSlice error', error);
    //   thunk.dispatch(saveIsLoading(false));
      utillsJs.errorAlert('',error.response.data.message)
      throw error;
    }
  },
);
export const ForgotPasswordSlice = createAsyncThunk(
  '/user_forgot_password',
  async (data, thunk) => {
    try {
     
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPostUrlEncoded(`/user_forgot_password`, data);
    //   thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('ChangePasswordSlice error', error);
    //   thunk.dispatch(saveIsLoading(false));
      utillsJs.errorAlert('',error.response.data.message)
      throw error;
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.userData = action.payload;
      saveAccessTokenToStorage(action.payload)
    },
    removeUser: (state, action) => {
      state.userData = null
      removeUserDataFromStorage()
    },
    
  },
});
export const {saveUser,removeUser} = authSlice.actions;
export default authSlice.reducer;

const saveAccessTokenToStorage = userData => {
  AsyncStorage.setItem(
    CONSTANTS.UserData,
    JSON.stringify(userData),
  );
};

const removeUserDataFromStorage = () => {
  // console.log('removeUserDataFromStorage ==== called');
  AsyncStorage.removeItem(CONSTANTS.UserData);
};