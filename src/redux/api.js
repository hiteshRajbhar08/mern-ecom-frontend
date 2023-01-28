import axios from 'axios';

export const API = axios.create({
  withCredentials: true,
  credentials: 'include',
});

export const getProducts = (keyword) => {
  let link = `/api/v1/products?keyword=${keyword}`;
  // if (category) {
  //   link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
  // }
  return API.get(link);
};

export const getProductDetails = (id) => API.get(`/api/v1/product/${id}`);
