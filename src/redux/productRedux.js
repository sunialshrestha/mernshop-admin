import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./apiCalls";

const initialState = {};
export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    errorMsg: "",
    success: false,
    addSuccess: false,
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.addSuccess = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
      state.addSuccess = false;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.addSuccess = false;
    },
    //DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.addSuccess = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.addSuccess = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.products[
        state.products.findIndex((products) => products._id === action.payload._id)
      ] = action.payload;
    },
    updateProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    //Create
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.addSuccess = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      state.addSuccess = true;
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.addSuccess = false;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;