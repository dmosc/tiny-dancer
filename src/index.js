import React from 'react';
import ReactDOM from 'react-dom';
import {UserProvider} from 'providers/user';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
