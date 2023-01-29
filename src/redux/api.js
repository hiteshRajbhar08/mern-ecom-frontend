import axios from 'axios';

export const API = axios.create({
  withCredentials: true,
  credentials: 'include',
});

// products
export const getProducts = (keyword) =>
  API.get(`/api/v1/products?keyword=${keyword}`);

export const getProductDetails = (id) => API.get(`/api/v1/product/${id}`);

// users
export const signIn = (formValue) => API.post(`/api/v1/login`, formValue);
