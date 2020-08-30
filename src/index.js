import React from 'react';
import ReactDOM from 'react-dom';
import {UserProvider} from 'providers/user';
import {ThemeProvider} from 'styled-components';
import theme from 'theme';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';

ReactDOM.render(
  <Router basename="/">
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root'),
);
