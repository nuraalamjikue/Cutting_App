// import axios from 'axios';
// import {REACT_NATIVE_APP_BACKEND_LIVE_API,REACT_NATIVE_APP_BACKEND_LIVE_API_ERP } from './Constant';

// const instance = axios.create({
//   baseURL: REACT_NATIVE_APP_BACKEND_LIVE_API,
//   headers: {
//     // Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
//     'Content-Type': 'application/json',
//   },
// });
// instance.defaults.timeout = 500000;

// export default instance;



import axios from 'axios';
import { REACT_NATIVE_APP_BACKEND_LIVE_API, REACT_NATIVE_APP_BACKEND_LIVE_API_ERP } from './Constant';
const createAxiosInstance = (baseURL) => {
  console.log(`Creating instance for baseURL: ${baseURL}`);

  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
    },
  });

  instance.defaults.timeout = 500000; // Set timeout as needed
  return instance;
};
export const instance = createAxiosInstance(REACT_NATIVE_APP_BACKEND_LIVE_API);
export const instanceERP = createAxiosInstance(REACT_NATIVE_APP_BACKEND_LIVE_API_ERP);

export { REACT_NATIVE_APP_BACKEND_LIVE_API, REACT_NATIVE_APP_BACKEND_LIVE_API_ERP };






// import axios from 'axios';
// import { REACT_NATIVE_APP_BACKEND_LIVE_API, REACT_NATIVE_APP_BACKEND_LIVE_API_ERP } from './Constant';
// import { useSelector } from 'react-redux';

// // Create Axios instance function
// const createAxiosInstance = (baseURL, token) => {
//   const instance = axios.create({
//     baseURL: baseURL,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   instance.defaults.timeout = 500000; // Set timeout as needed
//   return instance;
// };

// // Custom hook for creating axios instances
// export const useAxiosInstance = () => {
//   const token = useSelector(state => state.auth.user?.token); // Access token using useSelector in the component

//   // Create Axios instances using the token from Redux state
//   const instance = createAxiosInstance(REACT_NATIVE_APP_BACKEND_LIVE_API, token);
//   const instanceERP = createAxiosInstance(REACT_NATIVE_APP_BACKEND_LIVE_API_ERP, token);

//   return { instance, instanceERP };
// };

// export { REACT_NATIVE_APP_BACKEND_LIVE_API, REACT_NATIVE_APP_BACKEND_LIVE_API_ERP };