import axios from 'axios';

// create new order
const createOrder = async (order) => {
  const response = await axios.post(`/api/v1/order/new`, order);
  return response.data;
};

const orderService = {
  createOrder,
};

export default orderService;
