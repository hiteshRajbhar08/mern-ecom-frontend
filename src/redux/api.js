import axios from 'axios';

export const API = axios.create({
  withCredentials: true,
  credentials: 'include',
});

export const getProducts = () => API.get('/api/v1/products');
