import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';

export const userContext = React.createContext({});

const UserProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (token) {
      const {id} = jwt.decode(token);
      setUserId(id);
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <userContext.Provider
      value={{
        token,
        setToken,
        userId,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default UserProvider;
