import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from 'providers/user';
import Web3 from 'web3';
import api from 'api';
import {Button, message} from 'antd';

const Login = () => {
  const {setToken} = useUser();

  useEffect(() => {
    if (!window.web3) {
      needMetamaskAlert();
    }
  });

  /**
   * Alert of no metamask
   */
  const needMetamaskAlert = () => {
    alert('This app needs some web3 provider such as metamask');
  };

  /**
   * Opens Metamask sign in
   */
  const openSignIn = async () => {
    if (window.web3) {
      // Instantiate a new web3 with full capabilities
      const web3 = new Web3(Web3.givenProvider, null, {});

      // Request the user account and save it into input
      const accounts = await web3.eth.requestAccounts();
      const signature = await web3.eth.personal.sign(
        'Elton John',
        accounts[0],
        '',
      );

      try {
        const res = await api.post('/users/login', {
          ethAddress: accounts[0],
          signature,
        });
        setToken(res.data);
      } catch (err) {
        message.error(err.message);
      }
    } else {
      needMetamaskAlert();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '15%',
      }}
    >
      <Fragment>
        <Button type="primary" htmlType="submit" onClick={openSignIn}>
          Log in
        </Button>
        <p className="my-1">
          <div style={{marginTop: 10}}>
            Dont have an account? <Link to="/auth">Sign Up</Link>
          </div>
        </p>
      </Fragment>
    </div>
  );
};

export default Login;
