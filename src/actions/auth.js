import axios from 'axios';

// Login user

export const register = async (
  email,
  firstName,
  lastName,
  username,
  image,
  ethAddress,
  signature,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
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
    const res = await axios.post(
      'http://localhost:4000/user/register',
      body,
      config,
    );
    localStorage.setItem('token', res.data);
  } catch (err) {}
};

export const login = async (ethAddress, signature) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    ethAddress,
    signature,
  });
  try {
    const res = await axios.post(
      'http://localhost:4000/user/login',
      body,
      config,
    );
    localStorage.setItem('token', res.data);
  } catch (err) {}
};
