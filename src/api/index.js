import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export default api;
