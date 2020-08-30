import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Web3 from 'web3';
import {login} from '../../actions/auth';
const Login = () => {
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
      login(accounts[0], signature);
    } else {
      needMetamaskAlert();
    }
  };

  return (
    <Fragment>
      <input
        type="button"
        className="btn btn-primary"
        value="Log in"
        onClick={openSignIn}
      />
      <p className="my-1">
        Dont have an account? <Link to="/auth">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
