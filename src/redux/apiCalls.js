import { loginFailure, loginStart, loginSuccess,   registerStart,
  registerFailure,
  registerSuccess,
  resetUserError,
 } from "./authRedux";
import { publicRequest, userRequest, getToken } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";


import {
  getUserStart,
  getUserFailure,
  getUserSuccess,
} from "./userRedux";


import { createAction } from '@reduxjs/toolkit'


import { getCategoryFailure, 
  getCategoryStart, 
  getCategorySuccess, 
  addCategoryStart, 
  addCategorySuccess, 
  addCategoryFailure,
  getAllCategoryFailure, 
  getAllCategoryStart, 
  getAllCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
 } from "./categoriesRedux";

// for logout initialize all state
export const revertAll = createAction('REVERT_ALL');

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users", {
      headers: { token: `Bearer ${getToken()}` }
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure(err.response.data));
  }
};

export const deleteUser = async (id, dispatch) => {
  console.log("delete users");
}

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response ? err.response.data : "Server Response Error"));
  }
};

export const logout = async (dispatch) => {
  try{
    dispatch(logout());
  }
  catch(err){
    console.log("logout failure");
  }
};


export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`, {
      headers: { token: `Bearer ${getToken()}` }
    });


    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
      const res = await userRequest.put(`/products/${id}`, product, {
        headers: { token: `Bearer ${getToken()}` }
      });
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure(err.response.data));
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};


export const registerUser = async (dispatch, user) => {
  dispatch(registerStart()); 
  try {
    const res = await publicRequest.post(`/auth/register`, user);  
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err.response.data));
  }
};

export const resetUserErrorData = async (dispatch) => {
  dispatch(resetUserError());
}

//category api calls for getting all category in nested form
export const getCategoryList = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await userRequest.get("/category");
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};

//category api calls to get all category list
export const getAllCategory = async (dispatch) => {
  dispatch(getAllCategoryStart());
  try {
    const res = await userRequest.get("/category/list");
    dispatch(getAllCategorySuccess(res.data));
  } catch (err) {
    dispatch(getAllCategoryFailure());
  }
};

//add new category
export const addCategory = async (categoryList, dispatch) => {
  dispatch(addCategoryStart());
  try {
    const res = await userRequest.post(`/category`, categoryList);
    dispatch(addCategorySuccess(res.data));
  } catch (err) {
    dispatch(addCategoryFailure(err.response.data));
  }
};

export const deleteCategory = async (id, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    await userRequest.delete(`/Category/${id}`, {
      headers: { token: `Bearer ${getToken()}` }
    });


    dispatch(deleteCategorySuccess(id));
  } catch (err) {
    dispatch(deleteCategoryFailure());
  }
};