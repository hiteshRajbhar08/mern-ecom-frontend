import axios from 'axios';

// create new order
const createOrder = async (order) => {
  const response = await axios.post(`/api/v1/order/new`, order);
  return response.data;
};

// get my orders
const getMyOrders = async () => {
  const response = await axios.get(`/api/v1/orders/me`);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
};

export default orderService;
