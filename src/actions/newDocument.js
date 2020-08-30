import axios from 'axios';
// Login user
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const newDocument = async (name, signatures, file) => {
  const body = JSON.stringify({
    name,
    signatures,
    file,
  });
  try {
    console.log(body);
    const res = await axios.post('/documents/new-document', body);
    console.log(res);
  } catch (err) {}
};
