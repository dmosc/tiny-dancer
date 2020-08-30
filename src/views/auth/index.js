import React, {Fragment, useState, useEffect} from 'react';
import {login} from '../../actions/auth';
import Web3 from 'web3';
import {Link} from 'react-router-dom';
import {Card, Form, Input, Button, Typography} from 'antd';

const {Item} = Form;
const {Title} = Typography;

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  });
  const {email, firstName, lastName, username} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('hola');
    if (window.web3) {
      // Instantiate a new web3 with full capabilities
      const web3 = new Web3(Web3.givenProvider, null, {});

      // Request the user account and save it into input
      const accounts = await web3.eth.requestAccounts();
      console.log(accounts);
      const signature = await web3.eth.personal.sign(
        'Please sign here',
        accounts[0],
        '',
      );

      console.log(signature);
      login(email, firstName, lastName, username, '', accounts[0], signature);
    } else {
      needMetamaskAlert();
    }
  };

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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '15%',
      }}
    >
      <Card style={{maxWidth: 450, width: '100%'}}>
        <Fragment>
          {' '}
          <Title>Register</Title>
          <p className="lead">
            <Title level={3}>Register Your Account</Title>
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <Item style={{marginTop: 10}}>
                <Input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Item>
            </div>
            <div className="form-group">
              <Item style={{marginTop: 10}}>
                <Input
                  type="firstName"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Item>
            </div>
            <div className="form-group">
              <Item style={{marginTop: 10}}>
                <Input
                  type="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Item>
            </div>
            <div className="form-group">
              <Item style={{marginTop: 10}}>
                <Input
                  type="username"
                  placeholder="username"
                  name="username"
                  value={username}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Item>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </form>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <p className="my-1">
              Dont have an account? <Link to="/login">Sign Up</Link>
            </p>
          </div>
        </Fragment>
      </Card>
    </div>
  );
};

export default Auth;
