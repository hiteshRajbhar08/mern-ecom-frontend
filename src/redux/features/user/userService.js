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

// load user
const loadUser = async () => {
  const response = await axios.get('api/v1/me');
  return response.data;
};

// logout user
const logoutUser = async () => {
  await axios.get('/api/v1/logout');
};

// update user profile
const updateUserProfile = async (userData) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  const response = await axios.put('api/v1/update/me', userData, config);
  return response.data;
};

const userService = {
  loginUser,
  registerUser,
  loadUser,
  logoutUser,
  updateUserProfile,
};

export default userService;
