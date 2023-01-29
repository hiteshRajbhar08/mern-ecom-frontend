import axios from 'axios';

// login user
const loginUser = async (formValue) => {
  const response = await axios.post('api/v1/login', formValue);
  return response.data;
};

const userService = {
  loginUser,
};

export default userService;
