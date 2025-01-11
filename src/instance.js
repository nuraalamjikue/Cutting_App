// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://192.168.1.232:202/api/',
// });
// instance.defaults.headers.common['Authorization'] = 'Auth From instance';
// export default instance;

import axio from 'axios';

axio.defaults.baseURL = 'https://api.example.com'; // Replace this with your API's base URL
axio.defaults.timeout = 10000; // Request timeout in milliseconds
axio.defaults.headers.common['Content-Type'] = 'application/json';

export default axio;
