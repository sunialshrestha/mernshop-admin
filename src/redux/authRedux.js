import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./apiCalls";

const initialState = {};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMsg:"",
    registerSuccess: false,
    loginSuccess:false,
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    //login
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.loginSuccess = true;
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },

    //register
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.registerSuccess = true;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    resetUserError: (state) => {
      state.error= false;
      state.errorMsg="";
    },
  },
});

export const { loginStart, logout, loginSuccess, loginFailure,registerStart,registerSuccess,registerFailure, resetUserError} = authSlice.actions;
export default authSlice.reducer;