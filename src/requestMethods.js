import axios from "axios";

const BASE_URL =  "https://mernshopapi.onrender.com/api/";

//const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.auth || "{}")?.currentUser?.accessToken;

export const getToken = () => JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.auth || "{}")?.currentUser?.accessToken;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: getAuthorizationHeader() },
});