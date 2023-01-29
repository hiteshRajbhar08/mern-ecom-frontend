import axios from 'axios';

// login user
const loginUser = async (formValue) => {
  const response = await axios.post('api/v1/login', formValue);
  return response.data;
};

// register user
const registerUser = async (formValue) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const response = await axios.post('api/v1/register', formValue, config);
  return response.data;
};

const userService = {
  loginUser,
  registerUser,
};

export default userService;
