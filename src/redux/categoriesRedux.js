import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./apiCalls";

const initialState = {};
const categoriesSlice = createSlice({
  name: "category",
  initialState: {
    savedCategory : [],
    nestedCategory: null,
    allCategory: null,
    isFetching: false,
    error: false,
    errorMsg:"",   
    addSuccess: false, 
    loading: false,
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    // Get Category List in nested array
    getCategoryStart: (state) => {
      state.isFetching = true;
      state.loading = true;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.nestedCategory = action.payload;
      state.loading = false;
    },
    getCategoryFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
      state.loading = false;
    },

     // Get Category List
     getAllCategoryStart: (state) => {
      state.isFetching = true;
      state.loading = true;
    },
    getAllCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.allCategory = action.payload;
      state.loading = false;
    },
    getAllCategoryFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;
      state.loading = false;
    },

      //DELETE
      deleteCategoryStart: (state) => {
        state.isFetching = true;
        state.error = false;
        state.addSuccess = false;
      },
      deleteCategorySuccess: (state, action) => {
        state.isFetching = false;
        state.addSuccess = false;
        state.allCategory.splice(
          state.allCategory.findIndex((item) => item._id === action.payload),
          1
        );
      },
      deleteCategoryFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },



     //Add new Category Item
     addCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.addSuccess = false;
      state.loading = true;
    },
    addCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.savedCategory = action.payload;
      state.addSuccess = true;
      state.loading = false;
    },
    addCategoryFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.addSuccess = false;
      state.errorMsg = action.payload;
      state.savedCategory = [];
      state.loading = false;
    },
  },
});

export const { getAllCategoryFailure, getAllCategorySuccess, getAllCategoryStart,getCategoryFailure, getCategorySuccess, getCategoryStart, addCategoryStart, addCategorySuccess, addCategoryFailure,  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess} = categoriesSlice.actions;
export default categoriesSlice.reducer;