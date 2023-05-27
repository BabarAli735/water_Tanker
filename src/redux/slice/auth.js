import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API, requestGet, requestPost, requestPostUrlEncoded} from '../../api';
import {CONSTANTS} from '../../constants/theme';
import utills from '../../utills';
const initialState = {
  userData: null,
  location: null,
  isLoading: false,
  FcmData:null
};

export const RegisterSlice = createAsyncThunk(
  '/register',
  async (data, thunk) => {
    try {
      let extraHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPost(
        `user/signup`,
        data,
        true,
        extraHeaders,
      );
      
      thunk.dispatch(saveUser(response.data));
      thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('RegisterSlice error', error);
      thunk.dispatch(saveIsLoading(false));
      utills.errorAlert('', error.response.data.message);
      throw error;
    }
  },
);

export const SendOtp = createAsyncThunk('user/otp', async (data, thunk) => {
  try {
 
    thunk.dispatch(saveIsLoading(true));
    const response = await requestPost(
      `user/otp`,
      data,
      true,
    );
    thunk.dispatch(saveIsLoading(false));
    return response;
  } catch (error) {
    console.log('SendOtp error', error);
    thunk.dispatch(saveIsLoading(false));
    utills.errorAlert('', error.response.data.message);
    throw error;
  }
});
export const SaveFcm = createAsyncThunk('user/saveFcm', async (data, thunk) => {
  try {
 
    thunk.dispatch(saveIsLoading(true));
    const response = await requestPost(
      `user/saveFcm`,
      data,
      true,
    );
    thunk.dispatch(saveIsLoading(false));
    thunk.dispatch(saveFcmData(response));
    return response;
  } catch (error) {
    console.log('SaveFcm error', error);
    thunk.dispatch(saveIsLoading(false));
    // utills.errorAlert('', error.response.data.message);
    throw error;
  }
});
export const OtpVarification = createAsyncThunk('user/varify_otp', async (data, thunk) => {
  try {
 
    thunk.dispatch(saveIsLoading(true));
    const response = await requestPost(
      `user/varify_otp`,
      data,
      true,
    );
    thunk.dispatch(saveIsLoading(false));
    return response;
  } catch (error) {
    console.log('SendOtp error', error);
    thunk.dispatch(saveIsLoading(false));
    utills.errorAlert('', error.response.data.message);
    throw error;
  }
});
export const LoginSlice = createAsyncThunk('user/signIn', async (data, thunk) => {
  try {
    thunk.dispatch(saveIsLoading(true));
    const response = await requestPost(
      `user/signIn`,
      data,
      true,
    );
    thunk.dispatch(saveUser(response.data));
      thunk.dispatch(saveIsLoading(false));
    return response;
  } catch (error) {
    console.log('loginSlice error', error);
      thunk.dispatch(saveIsLoading(false));
    utills.errorAlert('', error.response.data.message);
    throw error;
  }
});

export const ChangePasswordSlice = createAsyncThunk(
  '/user_change_password',
  async (data, thunk) => {
    try {
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPostUrlEncoded(
        `/user_change_password`,
        data,
      );
      return response;

    } catch (error) {
      console.log('ChangePasswordSlice error', error);
      //   thunk.dispatch(saveIsLoading(false));
      utills.errorAlert('', error.response.data.message);
      throw error;
    }
  },
);
export const ForgotPasswordSlice = createAsyncThunk(
  '/user_forgot_password',
  async (data, thunk) => {
    try {
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPostUrlEncoded(
        `/user_forgot_password`,
        data,
      );
      //   thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('ChangePasswordSlice error', error);
      //   thunk.dispatch(saveIsLoading(false));
      utills.errorAlert('', error.response.data.message);
      throw error;
    }
  },
);
export const logOutSlice = createAsyncThunk(
  '/user/signOut',
  async (data, thunk) => {
    try {
      thunk.dispatch(saveIsLoading(true));
      const response = await requestPost(
        `user/signOut`,
        data,
        true,
      );
        thunk.dispatch(saveIsLoading(false));
      return response;
    } catch (error) {
      console.log('logOutSlice error', error);
        thunk.dispatch(saveIsLoading(false));
      utills.errorAlert('', error.response.data.message);
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
      saveAccessTokenToStorage(action.payload);
    },
    removeUser: (state, action) => {
      state.userData = null;
      removeUserDataFromStorage();
    },
    saveLocatin: (state, action) => {
      state.location = action.payload;
    },
    saveIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    saveFcmData: (state, action) => {
      state.FcmData = action.payload;
    },
   
  },
});
export const {saveUser, removeUser, saveLocatin, saveIsLoading,saveFcmData} =
  authSlice.actions;
export default authSlice.reducer;

const saveAccessTokenToStorage = userData => {
  AsyncStorage.setItem(CONSTANTS.UserData, JSON.stringify(userData));
};

const removeUserDataFromStorage = () => {
  // console.log('removeUserDataFromStorage ==== called');
  AsyncStorage.removeItem(CONSTANTS.UserData);
};
