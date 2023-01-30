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
const updateUserProfile = async (formValue) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  const response = await axios.put('api/v1/me/update', formValue, config);

  return response.data;
};

// update user password
const updateUserPassword = async (formValue) => {
  const response = await axios.put('api/v1/password/update', formValue);
  return response.data;
};

// forgot password
const forgotPassword = async (email) => {
  const response = await axios.post('api/v1/password/forgot', email);
  return response.data;
};

// reset password
const resetPassword = async (data) => {
  const response = await axios.post(
    `/api/v1/password/reset/${data.token}`,
    data.passwords
  );
  return response.data;
};

const userService = {
  loginUser,
  registerUser,
  loadUser,
  logoutUser,
  updateUserProfile,
  updateUserPassword,
  forgotPassword,
  resetPassword,
};

export default userService;
