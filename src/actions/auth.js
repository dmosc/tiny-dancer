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
  console.log(email, firstName, lastName, username, ethAddress, signature);
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
    console.log(res);
    localStorage.setItem('token', res.data);
  } catch (err) {
    console.log(err);
  }
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
    console.log(res.data);
    localStorage.setItem('token', res.data);
  } catch (err) {
    console.log(err);
  }
};
