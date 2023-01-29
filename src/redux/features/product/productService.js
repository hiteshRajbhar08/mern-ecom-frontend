import axios from 'axios';

// get all products
const getProducts = async (keyword) => {
  const response = await axios.get(`/api/v1/products?keyword=${keyword}`);
  return response.data;
};

// get single product
const getProduct = async (id) => {
  const response = await axios.get(`/api/v1/product/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProduct,
};

export default productService;
