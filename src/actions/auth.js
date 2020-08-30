import axios from 'axios';
// Login user
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const register = async (
  email,
  firstName,
  lastName,
  username,
  image,
  ethAddress,
  signature,
) => {
  const body = JSON.stringify({
    email,
    firstName,
    lastName,
    username,
    image,
    ethAddress,
    signature,
  });
  try {
    const res = await axios.post('/users/register', body);
    localStorage.setItem('token', res.data);
  } catch (err) {}
};

export const login = async (ethAddress, signature) => {
  const body = JSON.stringify({
    ethAddress,
    signature,
  });
  try {
    const res = await axios.post('/users/login', body);
    localStorage.setItem('token', res.data);
  } catch (err) {}
};
