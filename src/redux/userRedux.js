import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./apiCalls";

const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState: {
    isFetching: false,
    error: false,
    errorMsg:"",
    users: null,
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    //get all users
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.errorMsg="";
      state.users = action.payload;
    },
    getUserFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
  },
});

export const {getUserFailure, getUserSuccess, getUserStart } = userSlice.actions;
export default userSlice.reducer;