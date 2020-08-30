import axios from 'axios';

// Login user

export const login = async (
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
    const res = await axios.post('/user/register', body, config);
    console.log(res);
    localStorage.setItem('token', res.token);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => console.log(error));
    }
  }
};
